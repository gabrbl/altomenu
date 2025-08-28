import { NextRequest, NextResponse } from 'next/server';

/**
 * Subdomain routing configuration.
 *
 * You can override this map by defining SUBDOMAIN_MAP env var with JSON:
 * {
 *   "resto1": { "type": "page", "target": "/contacto" },
 *   "resto2": { "type": "page", "target": "/planes" },
 *   "demo":   { "type": "prefix", "target": "/como-funciona" }
 * }
 *
 * Modes:
 *  type: 'page'   -> Only rewrite root (/) of the subdomain to target page.
 *  type: 'prefix' -> Rewrite ANY path: /foo => target + /foo (root => target).
 */
const STATIC_MAP: Record<string, { type: 'page' | 'prefix'; target: string }> = {
  resto1: { type: 'page', target: '/contacto' },
  resto2: { type: 'page', target: '/planes' },
  demo: { type: 'page', target: '/como-funciona' },
};

function loadConfig() {
  const raw = process.env.SUBDOMAIN_MAP;
  if (!raw) return STATIC_MAP;
  try {
    const parsed = JSON.parse(raw);
    // Basic validation
    Object.entries(parsed).forEach(([k, v]: any) => {
      if (!v || (v.type !== 'page' && v.type !== 'prefix') || typeof v.target !== 'string') {
        throw new Error(`Invalid entry for subdomain '${k}'`);
      }
    });
    return parsed as typeof STATIC_MAP;
  } catch (e) {
    console.warn('[middleware] Failed to parse SUBDOMAIN_MAP env var. Using STATIC_MAP. Error:', e);
    return STATIC_MAP;
  }
}

const CONFIG = loadConfig();

// Optionally ignore these hostnames (e.g. the apex domain) so they use normal routing.
const IGNORE_SUBDOMAINS = new Set(['www', '']);

export function middleware(req: NextRequest) {
  const hostHeader = req.headers.get('host') || '';
  const domain = hostHeader.split(':')[0]; // strip port
  const parts = domain.split('.');
  // Patterns we may receive:
  //  dominio.com                -> apex
  //  www.dominio.com            -> www (ignored)
  //  resto2.dominio.com         -> sub = resto2
  //  www.resto2.dominio.com     -> nested www + sub (queremos sub = resto2)
  let sub = '';
  if (parts.length > 2) {
    if (parts[0] === 'www' && parts.length > 3) {
      // www.resto2.dominio.com => usar segundo label
      sub = parts[1];
    } else if (parts[0] !== 'www') {
      sub = parts[0];
    }
  }

  if (IGNORE_SUBDOMAINS.has(sub)) return NextResponse.next();

  const rule = CONFIG[sub];
  if (!rule) return NextResponse.next();

  // Skip rewrites for Next internal & static assets
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon')) {
    return NextResponse.next();
  }

  if (rule.type === 'page') {
    if (pathname === '/') {
      const url = req.nextUrl.clone();
      url.pathname = rule.target;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // prefix mode
  if (rule.type === 'prefix') {
    const url = req.nextUrl.clone();
    if (pathname === '/') {
      url.pathname = rule.target;
    } else {
      url.pathname = rule.target.replace(/\/$/, '') + pathname; // concatenate
    }
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Apply to all paths except static assets (still double-guarded inside middleware)
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

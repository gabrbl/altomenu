
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChePilot | Landing Pages que Venden Más para Restaurantes',
  description: 'Creamos landing pages gastronómicas con menús actualizables por WhatsApp. Tu restaurante online en días, no meses.',
  keywords: 'landing pages restaurantes, menús digitales WhatsApp, páginas web gastronómicas, marketing restaurantes Argentina',
  authors: [{ name: 'ChePilot' }],
  creator: 'ChePilot',
  publisher: 'ChePilot',
  metadataBase: new URL('https://chepilot.com'),
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://chepilot.com',
    title: 'ChePilot | Landing Pages que Venden Más para Restaurantes',
    description: 'Creamos landing pages gastronómicas con menús actualizables por WhatsApp. Tu restaurante online en días, no meses.',
    siteName: 'ChePilot',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'ChePilot - Landing Pages Gastronómicas'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChePilot | Landing Pages que Venden Más',
    description: 'Landing pages gastronómicas con menús actualizables por WhatsApp',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ChePilot',
  url: 'https://chepilot.com',
  logo: 'https://i.ytimg.com/vi/5OwUV1b9Xy8/sddefault.jpg',
  description: 'Agencia especializada en landing pages gastronómicas con menús actualizables por WhatsApp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Corrientes 1234',
    addressLocality: 'Buenos Aires',
    addressRegion: 'CABA',
    addressCountry: 'AR'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+54-11-2345-6789',
    contactType: 'customer service',
    areaServed: 'AR',
    availableLanguage: 'Spanish'
  },
  sameAs: [
    'https://instagram.com/chepilot',
    'https://linkedin.com/company/chepilot'
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="geo.region" content="AR-C" />
        <meta name="geo.placename" content="Buenos Aires" />
        <meta name="geo.position" content="-34.6037;-58.3816" />
        <meta name="ICBM" content="-34.6037, -58.3816" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        {process.env.ANALYTICS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.ANALYTICS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.ANALYTICS_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

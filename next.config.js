/** @type {import('next').NextConfig} */
const nextConfig = {
  // Simplified config for Vercel compatibility
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { 
    unoptimized: true 
  },
};

module.exports = nextConfig;

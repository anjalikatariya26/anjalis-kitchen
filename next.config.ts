import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Image optimisation
  images: {
    formats: ['image/webp'],
    deviceSizes: [320, 480, 640, 768, 960, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: '' },
        ],
      },
      {
        // Immutable caching for uploaded media
        source: '/media/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Server external packages that need native bindings
  serverExternalPackages: ['sharp', 'argon2'],

  // Redirect /about to /contact#about
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/contact#about',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

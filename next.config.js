/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: false,
  
  // Performance optimizations
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for performance
  experimental: {
    scrollRestoration: true,
  },

  // Bundle analyzer integration (commented out until webpack-bundle-analyzer is installed)
  // ...(process.env.ANALYZE === 'true' && {
  //   webpack: (config) => {
  //     const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
  //     config.plugins.push(new BundleAnalyzerPlugin({
  //       analyzerMode: 'static',
  //       openAnalyzer: false,
  //     }))
  //     return config
  //   }
  // }),

  async headers() {
    return [
      {
        source: '/book',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://calendly.com https://*.calendly.com; frame-ancestors 'self';"
          }
        ]
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          }
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=1, stale-while-revalidate=59',
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig
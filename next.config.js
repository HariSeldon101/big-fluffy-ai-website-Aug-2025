/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: false,
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
      }
    ]
  }
}

module.exports = nextConfig
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/dashboard/',
        '/admin/',
        '/test-env/',
      ],
    },
    sitemap: 'https://bigfluffy.ai/sitemap.xml',
  }
}
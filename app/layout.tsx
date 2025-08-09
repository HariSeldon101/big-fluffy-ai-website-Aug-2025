import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Big Fluffy AI - AI Consultancy & Automation Services | London, UK',
  description: 'Transform your business with cutting-edge AI solutions, consultancy, and automation services. Expert AI strategy, implementation, and training in London, UK.',
  keywords: ['AI consultancy', 'AI automation', 'artificial intelligence', 'business transformation', 'machine learning', 'AI strategy', 'London', 'UK'],
  authors: [{ name: 'Big Fluffy AI' }],
  creator: 'Big Fluffy AI',
  publisher: 'Big Fluffy AI',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://bigfluffy.ai',
    title: 'Big Fluffy AI - AI Consultancy & Automation Services',
    description: 'Transform your business with cutting-edge AI solutions, consultancy, and automation services. Expert AI strategy, implementation, and training in London, UK.',
    siteName: 'Big Fluffy AI',
    images: [
      {
        url: 'https://bigfluffy.ai/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Big Fluffy AI - AI Consultancy Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Big Fluffy AI - AI Consultancy & Automation Services',
    description: 'Transform your business with cutting-edge AI solutions, consultancy, and automation services.',
    images: ['https://bigfluffy.ai/twitter-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://bigfluffy.ai',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
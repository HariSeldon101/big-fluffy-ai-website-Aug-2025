import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Services - Consultancy, Automation & Implementation | Big Fluffy AI',
  description: 'Comprehensive AI services including consultancy, automation, project management, implementation, outsourcing, and training. Transform your business with expert AI solutions.',
  keywords: ['AI services', 'AI consultancy', 'AI automation', 'AI implementation', 'AI training', 'machine learning services', 'business automation'],
  openGraph: {
    title: 'AI Services - Consultancy, Automation & Implementation',
    description: 'Comprehensive AI services including consultancy, automation, project management, implementation, outsourcing, and training.',
    url: 'https://bigfluffy.ai/services',
  },
  alternates: {
    canonical: 'https://bigfluffy.ai/services',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Big Fluffy AI - Get Your AI Consultation | London, UK',
  description: 'Contact Big Fluffy AI for expert AI consultancy services. Schedule a free consultation to discuss your AI transformation needs. Based in London, UK.',
  keywords: ['contact AI consultant', 'AI consultation London', 'AI strategy meeting', 'AI consultancy contact', 'schedule AI consultation'],
  openGraph: {
    title: 'Contact Big Fluffy AI - Get Your AI Consultation',
    description: 'Contact Big Fluffy AI for expert AI consultancy services. Schedule a free consultation to discuss your AI transformation needs.',
    url: 'https://bigfluffy.ai/contact',
  },
  alternates: {
    canonical: 'https://bigfluffy.ai/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
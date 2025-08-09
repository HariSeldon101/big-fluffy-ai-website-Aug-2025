import dynamic from 'next/dynamic'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

// Dynamically import heavy components for better initial load performance
const HeroSection = dynamic(() => import('@/components/hero/HeroSection'), {
  loading: () => <div className="h-screen flex items-center justify-center">
    <div className="animate-pulse text-primary-500">Loading...</div>
  </div>,
})

const ServicesGrid = dynamic(() => import('@/components/services/ServicesGrid'), {
  loading: () => <div className="h-96 flex items-center justify-center">
    <div className="animate-pulse text-primary-500">Loading services...</div>
  </div>,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesGrid />
      <Footer />
    </main>
  )
}
import Navigation from '@/components/layout/Navigation'
import HeroSection from '@/components/hero/HeroSection'
import ServicesGrid from '@/components/services/ServicesGrid'
import Footer from '@/components/layout/Footer'

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
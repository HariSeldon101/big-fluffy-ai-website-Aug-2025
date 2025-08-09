'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/stusandboxacc/15min'

export default function BookPage() {
  const [embedUrl, setEmbedUrl] = useState<string>('')
  const [iframeError, setIframeError] = useState<boolean>(false)
  
  // Allow overriding the iframe min-height via env var
  const minHeightEnv = process.env.NEXT_PUBLIC_CALENDLY_MIN_HEIGHT
  const normalizeMinHeight = (val?: string): string => {
    if (!val) return '760px'
    const trimmed = val.trim()
    // If it already includes a CSS unit, use as-is
    if (/\d(px|vh|vw|rem|em|%)$/i.test(trimmed)) return trimmed
    // If it's a plain number, assume px
    const num = Number(trimmed)
    return Number.isFinite(num) && num > 0 ? `${num}px` : '760px'
  }
  const iframeMinHeight = normalizeMinHeight(minHeightEnv)

  useEffect(() => {
    // Build Calendly URL with dark mode parameters
    try {
      const url = new URL(calendlyUrl)
      url.searchParams.set('embed_type', 'Inline')
      url.searchParams.set('background_color', '0a0a0a')
      url.searchParams.set('text_color', 'ffffff')
      url.searchParams.set('primary_color', '7c3aed')
      url.searchParams.set('hide_landing_page_details', '1')
      url.searchParams.set('hide_gdpr_banner', '1')
      url.searchParams.set('hide_event_type_details', '1')
      url.searchParams.set('hide_branding', '1')
      const finalUrl = url.toString()
      console.log('Calendly embed URL:', finalUrl) // Debug log
      setEmbedUrl(finalUrl)
    } catch (error) {
      console.error('Error building Calendly URL:', error)
      setEmbedUrl(calendlyUrl)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile-first responsive layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Meeting Info Pane */}
            <div className="lg:w-96 lg:flex-shrink-0">
              <div className="bg-card border border-gray-700 rounded-xl p-6 lg:p-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Book a 15‑minute intro call
                </h1>
                
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Pick a time that works for you. We'll discuss your goals and outline next steps.
                </p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    What to expect:
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      Discussion of your AI goals and challenges
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      Overview of our services and approach
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      Next steps and timeline discussion
                    </li>
                  </ul>
                </div>
                
                <div className="bg-primary-900/20 border border-primary-500/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Duration:</strong> 15 minutes<br/>
                    <strong className="text-foreground">Format:</strong> Video call<br/>
                    <strong className="text-foreground">Cost:</strong> Free consultation
                  </p>
                </div>
              </div>
            </div>
            
            {/* Calendar Pane */}
            <div className="flex-1">
              <div className="bg-card border border-gray-700 rounded-xl overflow-hidden">
                {!embedUrl ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
                      Loading calendar...
                    </div>
                  </div>
                ) : iframeError ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center p-6">
                      <p className="mb-4">Unable to load calendar widget.</p>
                      <a 
                        href={calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 underline transition-colors"
                      >
                        Open calendar in new window
                      </a>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={embedUrl}
                    className="w-full border-none bg-background"
                    style={{ minHeight: iframeMinHeight }}
                    title="Calendly Booking"
                    onError={() => setIframeError(true)}
                    onLoad={() => console.log('Calendly iframe loaded successfully')}
                    scrolling="yes"
                    frameBorder="0"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
            
          </div>
          
          {/* Mobile fallback button */}
          <div className="mt-8 text-center lg:hidden">
            <a 
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Open Calendar
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

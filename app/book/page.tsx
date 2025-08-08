'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/YOUR_HANDLE/intro-15min'

export default function BookPage() {
  const [embedUrl, setEmbedUrl] = useState<string>('')

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
      setEmbedUrl(url.toString())
    } catch {
      setEmbedUrl(calendlyUrl)
    }
  }, [])

  return (
    <div style={{ 
      width: '100vw', 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0a',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navigation />
      
      <div style={{ 
        flex: 1,
        backgroundColor: '#0a0a0a',
        display: 'flex',
        paddingTop: '75px',
        gap: '20px',
        padding: '75px 20px 0 20px',
        marginBottom: '-30px'
      }}>
        {/* Meeting Info Pane */}
        <div style={{
          width: '400px',
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          padding: '20px'
        }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            marginTop: '90px',
            marginBottom: '16px',
            color: '#ffffff'
          }}>
            Book a 15‑minute intro call
          </h1>
          
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#d1d5db', 
            marginBottom: '24px',
            lineHeight: '1.6'
          }}>
            Pick a time that works for you. We'll discuss your goals and outline next steps.
          </p>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              marginBottom: '12px',
              color: '#ffffff'
            }}>
              What to expect:
            </h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: '#d1d5db'
            }}>
              <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: '0', color: '#7c3aed' }}>•</span>
                Discussion of your AI goals and challenges
              </li>
              <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: '0', color: '#7c3aed' }}>•</span>
                Overview of our services and approach
              </li>
              <li style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: '0', color: '#7c3aed' }}>•</span>
                Next steps and timeline discussion
              </li>
            </ul>
          </div>
          
          <div style={{
            backgroundColor: '#1f2937',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #374151'
          }}>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#9ca3af',
              margin: 0
            }}>
              <strong style={{ color: '#ffffff' }}>Duration:</strong> 15 minutes<br/>
              <strong style={{ color: '#ffffff' }}>Format:</strong> Video call<br/>
              <strong style={{ color: '#ffffff' }}>Cost:</strong> Free consultation
            </p>
          </div>
        </div>
        
        {/* Calendar Pane */}
        <div style={{ 
          flex: 1,
          backgroundColor: '#0a0a0a'
        }}>
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ 
              border: 'none',
              backgroundColor: '#0a0a0a',
              minHeight: 'calc(100vh - 240px)' // Account for header, footer, and increased top padding
            }}
            title="Calendly Booking"
          />
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Share2, Copy, Check, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SocialShareProps {
  url: string
  title: string
  description: string
}

interface SocialPlatform {
  name: string
  icon: React.ReactNode
  shareUrl: string
  color: string
  hoverColor: string
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const socialPlatforms: SocialPlatform[] = [
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'text-blue-400',
      hoverColor: 'hover:text-blue-300'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'text-blue-500',
      hoverColor: 'hover:text-blue-400'
    },
    {
      name: 'X (Twitter)',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z"/>
        </svg>
      ),
      shareUrl: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'text-gray-300',
      hoverColor: 'hover:text-white'
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      shareUrl: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing
      color: 'text-pink-400',
      hoverColor: 'hover:text-pink-300'
    }
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const handleSocialShare = (platform: SocialPlatform) => {
    if (platform.name === 'Instagram') {
      // Instagram doesn't support direct URL sharing, so copy URL for manual sharing
      copyToClipboard()
      return
    }
    
    window.open(platform.shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {/* Share Label */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Share2 className="h-4 w-4" />
        <span className="text-sm font-medium">Share:</span>
      </div>

      {/* Social Media Buttons */}
      <div className="flex flex-wrap gap-3">
        {socialPlatforms.map((platform) => (
          <motion.button
            key={platform.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSocialShare(platform)}
            className={`flex items-center gap-2 px-3 py-2 bg-card border border-gray-700 rounded-lg ${platform.color} ${platform.hoverColor} transition-all duration-200 hover:border-primary-500/50 group`}
            title={`Share on ${platform.name}`}
          >
            {platform.icon}
            <span className="text-sm font-medium group-hover:text-inherit">
              {platform.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Copy URL Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={copyToClipboard}
        className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition-all duration-200 group"
        title="Copy URL"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">Copied!</span>
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              <span className="text-sm font-medium">Copy URL</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Share Menu */}
      {typeof navigator !== 'undefined' && navigator.share && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: title,
                text: description,
                url: url,
              }).catch(console.error)
            }
          }}
          className="sm:hidden flex items-center gap-2 px-3 py-2 bg-card border border-gray-700 rounded-lg text-muted-foreground hover:text-primary-400 hover:border-primary-500/50 transition-all duration-200"
          title="Share via device"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm font-medium">More</span>
        </motion.button>
      )}
    </div>
  )
}
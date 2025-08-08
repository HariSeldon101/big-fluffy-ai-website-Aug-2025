'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Brain, Zap } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-primary-500 hover:text-primary-400 transition-colors">
            Big Fluffy AI
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-foreground hover:text-primary-500 transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-foreground hover:text-primary-500 transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary-500 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary-500 transition-colors">
              Contact
            </Link>
            <Link 
              href="/dashboard" 
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-500 transition-colors"
            >
              Client Portal
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground hover:text-primary-500 transition-colors">
                Home
              </Link>
              <Link href="/services" className="text-foreground hover:text-primary-500 transition-colors">
                Services
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary-500 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary-500 transition-colors">
                Contact
              </Link>
              <Link 
                href="/dashboard" 
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-500 transition-colors text-center"
              >
                Client Portal
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
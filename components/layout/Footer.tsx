import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react'
import TechStackIcons from '../footer/TechStackIcons'

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 pb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-primary-500">Big Fluffy AI</h3>
              <p className="text-gray-400 mt-2 max-w-md">
                Transform your business with cutting-edge AI solutions. From consultation to implementation, 
                we deliver intelligent automation that drives real results.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail size={16} className="mr-3 text-primary-500" />
                <a href="mailto:woof@bigfluffy.ai" className="hover:text-primary-500 transition-colors">
                  woof@bigfluffy.ai
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone size={16} className="mr-3 text-primary-500" />
                <span>+44 (0) 7727 847722</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin size={16} className="mr-3 text-primary-500" />
                <span>London, UK</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services/ai-consultancy" className="text-gray-400 hover:text-primary-500 transition-colors">AI Consultancy</Link></li>
              <li><Link href="/services/ai-automation" className="text-gray-400 hover:text-primary-500 transition-colors">AI Automation</Link></li>
              <li><Link href="/services/project-management" className="text-gray-400 hover:text-primary-500 transition-colors">Project Management</Link></li>
              <li><Link href="/services/implementation" className="text-gray-400 hover:text-primary-500 transition-colors">Implementation</Link></li>
              <li><Link href="/services/outsourcing" className="text-gray-400 hover:text-primary-500 transition-colors">AI Outsourcing</Link></li>
              <li><Link href="/services/training" className="text-gray-400 hover:text-primary-500 transition-colors">AI Training</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-primary-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary-500 transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-primary-500 transition-colors">Blog</Link></li>
              
              <li><Link href="/dashboard" className="text-gray-400 hover:text-primary-500 transition-colors">Client Portal</Link></li>
              
            </ul>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-5">
          <TechStackIcons />
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Big Fluffy AI. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
              <Linkedin size={20} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
              <Github size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
'use client'

// Note: Metadata cannot be exported from client components
// This should be moved to a layout.tsx file or parent server component

import { motion } from 'framer-motion'
import { Bot, Zap, Target, Wrench, Users, GraduationCap, ArrowRight } from 'lucide-react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Cube3D from '@/components/animations/Cube3D'

const services = [
  {
    icon: Bot,
    title: 'AI Consultancy',
    description: 'Strategic AI guidance to identify opportunities and develop implementation roadmaps for your business.',
    href: '/services/ai-consultancy',
    features: ['AI Strategy Development', 'Technology Assessment', 'ROI Analysis', 'Implementation Planning']
  },
  {
    icon: Zap,
    title: 'AI Automation',
    description: 'Streamline operations with intelligent automation solutions that reduce costs and improve efficiency.',
    href: '/services/ai-automation',
    features: ['Process Automation', 'Workflow Optimization', 'Data Processing', 'Task Management']
  },
  {
    icon: Target,
    title: 'Project & Risk Management',
    description: 'Comprehensive project oversight with AI-powered risk assessment and mitigation strategies.',
    href: '/services/project-management',
    features: ['Project Planning', 'Risk Assessment', 'Resource Management', 'Progress Tracking']
  },
  {
    icon: Wrench,
    title: 'Project Implementation',
    description: 'End-to-end implementation services to bring your AI initiatives from concept to production.',
    href: '/services/implementation',
    features: ['Custom Development', 'System Integration', 'Deployment', 'Quality Assurance']
  },
  {
    icon: Users,
    title: 'Outsource AI Expertise',
    description: 'Access specialized AI talent and expertise without the overhead of building an in-house team.',
    href: '/services/outsourcing',
    features: ['Expert Team Access', 'Flexible Engagement', 'Cost Optimization', 'Scalable Resources']
  },
  {
    icon: GraduationCap,
    title: 'AI Training',
    description: 'Comprehensive training programs to upskill your team on AI technologies and best practices.',
    href: '/services/training',
    features: ['Custom Curricula', 'Hands-on Workshops', 'Certification Programs', 'Ongoing Support']
  }
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content - Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
                Our Services
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Comprehensive AI solutions designed to transform your business operations, 
                drive efficiency, and unlock new opportunities for growth.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  href="/book"
                  className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="border border-primary-500 text-primary-500 hover:bg-primary-500/10 px-8 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Get In Touch
                </Link>
              </motion.div>
            </motion.div>

            {/* 3D Cube Animation - Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <Cube3D />
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card border border-gray-700 rounded-xl p-8 hover:border-primary-500/50 transition-all duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <service.icon className="h-8 w-8 text-primary-500 mr-3" />
                  <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={service.href}
                  className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors group-hover:translate-x-1 transform duration-200"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how our AI solutions can drive your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="border border-primary-500 text-primary-500 hover:bg-primary-500/10 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
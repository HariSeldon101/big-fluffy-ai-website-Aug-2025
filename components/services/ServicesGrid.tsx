'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Brain, 
  Cog, 
  Shield, 
  Rocket, 
  Users, 
  GraduationCap,
  ArrowRight 
} from 'lucide-react'

const services = [
  {
    icon: Brain,
    title: 'AI Consultancy',
    slug: 'ai-consultancy',
    description: 'Strategic AI planning and implementation roadmaps tailored to your business needs.',
    gradientClass: 'bg-gradient-to-br from-blue-400 to-cyan-400'
  },
  {
    icon: Cog,
    title: 'AI Automation',
    slug: 'ai-automation',
    description: 'Streamline operations with intelligent automation solutions that scale with your business.',
    gradientClass: 'bg-gradient-to-br from-purple-400 to-pink-400'
  },
  {
    icon: Shield,
    title: 'Project & Risk Management',
    slug: 'project-management',
    description: 'Comprehensive project oversight with AI-powered risk assessment and mitigation strategies.',
    gradientClass: 'bg-gradient-to-br from-purple-500 to-indigo-600'
  },
  {
    icon: Rocket,
    title: 'Project Implementation',
    slug: 'implementation',
    description: 'End-to-end AI solution deployment with seamless integration into existing systems.',
    gradientClass: 'bg-gradient-to-br from-sky-400 to-blue-500'
  },
  {
    icon: Users,
    title: 'Outsource AI Expertise',
    slug: 'outsourcing',
    description: 'Access our team of AI specialists for flexible, scalable expertise on demand.',
    gradientClass: 'bg-gradient-to-br from-indigo-400 to-purple-400'
  },
  {
    icon: GraduationCap,
    title: 'AI Training',
    slug: 'training',
    description: 'Comprehensive training programs to upskill your team in AI technologies and best practices.',
    gradientClass: 'bg-gradient-to-br from-gray-400 to-gray-600'
  }
]

export default function ServicesGrid() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary-500 bg-clip-text text-transparent">
          Our Core Services
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          From strategy to implementation, we provide comprehensive AI solutions 
          that transform how your business operates and competes.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <Link href={`/services/${service.slug}`} key={service.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative h-full"
              >
                <div className="relative p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl hover:border-primary-500/50 transition-all duration-300 h-full">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 ${service.gradientClass} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 ${service.gradientClass} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon size={28} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary-500 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Learn More Button */}
                  <div className="flex items-center text-primary-500 font-semibold group-hover:text-primary-400 transition-colors">
                    <span>Learn More</span>
                    <ArrowRight 
                      size={16} 
                      className="ml-2 group-hover:translate-x-1 transition-transform" 
                    />
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-500/20 transition-all duration-300" />
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <Link
          href="/contact"
          className="inline-block bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 group shadow-lg"
        >
          Discuss Your Project
          <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
        </Link>
      </motion.div>
    </section>
  )
}

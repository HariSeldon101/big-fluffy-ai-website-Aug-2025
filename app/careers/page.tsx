'use client'

import { motion } from 'framer-motion'
import { Briefcase, Users, Zap, Globe, ArrowRight, MapPin, Clock } from 'lucide-react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const positions = [
  {
    title: 'Senior AI Engineer',
    department: 'Engineering',
    location: 'London, UK / Remote',
    type: 'Full-time',
    description: 'Lead the development of cutting-edge AI solutions for enterprise clients. Design and implement machine learning models, work with large datasets, and collaborate with cross-functional teams.',
    requirements: ['5+ years in AI/ML development', 'Python, TensorFlow/PyTorch experience', 'Cloud platform expertise (AWS/GCP/Azure)', 'Strong communication skills']
  },
  {
    title: 'AI Consultant',
    department: 'Consulting',
    location: 'London, UK',
    type: 'Full-time',
    description: 'Work directly with clients to assess their AI needs, develop strategic roadmaps, and guide implementation processes. Bridge the gap between technical possibilities and business objectives.',
    requirements: ['Business strategy background', 'AI/ML technical knowledge', 'Client-facing experience', 'Excellent presentation skills']
  },
  {
    title: 'Data Scientist',
    department: 'Data & Analytics',
    location: 'Remote',
    type: 'Full-time',
    description: 'Analyze complex datasets to extract actionable insights, build predictive models, and support AI solution development. Work with diverse data sources and cutting-edge tools.',
    requirements: ['Statistics/Mathematics background', 'Python, R, SQL proficiency', 'Experience with big data tools', 'Research and analytical mindset']
  }
]

const benefits = [
  {
    icon: Globe,
    title: 'Remote-First Culture',
    description: 'Work from anywhere with flexible hours and a distributed team approach.'
  },
  {
    icon: Zap,
    title: 'Cutting-Edge Projects',
    description: 'Work on innovative AI solutions that push the boundaries of technology.'
  },
  {
    icon: Users,
    title: 'Learning & Development',
    description: 'Continuous learning opportunities, conference attendance, and skill development support.'
  },
  {
    icon: Briefcase,
    title: 'Competitive Package',
    description: 'Competitive salary, equity options, comprehensive health benefits, and generous PTO.'
  }
]

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Help shape the future of AI while working with cutting-edge technology 
              and brilliant minds. We're building something extraordinary together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Big Fluffy AI?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're more than a company—we're a community of innovators, thinkers, 
              and builders working together to democratize AI technology.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-card border border-gray-700 rounded-lg p-6 text-center hover:border-primary-500/50 transition-colors"
              >
                <benefit.icon className="h-8 w-8 text-primary-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-primary-900/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Open Positions</h2>
            <p className="text-muted-foreground">
              Explore exciting opportunities to make an impact in the AI industry.
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-card border border-gray-700 rounded-lg p-8 hover:border-primary-500/50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {position.department}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {position.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="mt-4 lg:mt-0 bg-primary-600 hover:bg-primary-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors inline-flex items-center"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {position.description}
                </p>
                
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Key Requirements:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {position.requirements.map((req) => (
                      <li key={req} className="flex items-start text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* No Perfect Match */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center bg-card border border-gray-700 rounded-lg p-8"
          >
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Don't See a Perfect Match?
            </h3>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals who share our passion for AI innovation. 
              Send us your resume and tell us how you'd like to contribute.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
            >
              Get In Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Hiring Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Apply</h3>
                <p className="text-muted-foreground">Submit your application through our contact form with your resume and cover letter.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Interview</h3>
                <p className="text-muted-foreground">Initial screening call followed by technical and cultural fit interviews with the team.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Join Us</h3>
                <p className="text-muted-foreground">Welcome to the team! We'll get you set up and ready to make an impact from day one.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
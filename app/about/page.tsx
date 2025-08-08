'use client'

import { motion } from 'framer-motion'
import { Users, Target, Award, Heart, ArrowRight, Zap, Megaphone } from 'lucide-react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative flex items-start justify-center overflow-hidden" style={{ paddingTop: '175px', minHeight: 'calc(100vh - 175px)' }}>
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary-900/20" />
          
          {/* Floating geometric shapes */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-primary-500/20 to-purple-500/20 blur-xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute top-1/3 right-20 w-24 h-24 rounded-lg bg-gradient-to-r from-blue-500/20 to-primary-500/20 blur-lg"
            animate={{
              rotate: [0, 180, 360],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-lg"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center mb-4"
          >
            <Megaphone className="text-primary-500 mr-2" size={24} />
            <span className="text-primary-500 font-semibold">About Big Fluffy AI</span>
          </motion.div>

          <div className="relative overflow-hidden">
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold mb-8 pb-2 bg-gradient-to-r from-foreground to-primary-500 bg-clip-text text-transparent relative z-10 leading-tight"
              style={{ lineHeight: '1.2' }}
            >
              {"Transforming Business Through AI Innovation".split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.4 + index * 0.1,
                    ease: "easeOut"
                  }}
                  className="inline-block mr-2 md:mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            We're passionate about making AI accessible and practical for businesses of all sizes. 
            Our mission is to bridge the gap between cutting-edge AI technology and real-world business solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              href="/contact" 
              className="group bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center"
            >
              Get In Touch
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section style={{ marginTop: '-50px', paddingBottom: '48px' }} className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Story</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-300 mb-6">
                Founded in London, Big Fluffy AI emerged from a simple observation: while AI technology was advancing 
                rapidly, many businesses struggled to implement these innovations effectively. We saw an opportunity 
                to create a bridge between cutting-edge AI research and practical business applications.
              </p>
              <p className="text-lg text-gray-300">
                Today, we're proud to work with innovative companies worldwide, helping them harness the power of AI 
                to solve real problems, automate complex processes, and unlock new opportunities for growth.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Values</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              These core principles guide everything we do and shape how we work with our clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Zap className="text-primary-500 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-foreground">Innovation First</h3>
              </div>
              <p className="text-gray-300">
                We stay at the forefront of AI technology, constantly exploring new possibilities 
                and pushing the boundaries of what's possible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Users className="text-primary-500 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-foreground">Client Partnership</h3>
              </div>
              <p className="text-gray-300">
                We believe in true partnerships, working closely with our clients to understand 
                their unique challenges and deliver tailored solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Target className="text-primary-500 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-foreground">Results Driven</h3>
              </div>
              <p className="text-gray-300">
                Every project we undertake is focused on delivering measurable business impact 
                and tangible returns on investment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Award className="text-primary-500 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-foreground">Excellence</h3>
              </div>
              <p className="text-gray-300">
                We maintain the highest standards in everything we do, from code quality 
                to project delivery and ongoing support.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Heart className="text-primary-500 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-foreground">Ethical AI</h3>
              </div>
              <p className="text-gray-300">
                We're committed to developing AI solutions that are transparent, fair, 
                and beneficial for businesses and society as a whole.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Ready to Transform Your Business?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how AI can drive innovation and growth in your organization. 
              We'd love to hear about your challenges and explore how we can help.
            </p>
            <Link 
              href="/contact" 
              className="group bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center"
            >
              Start the Conversation
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Node {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
}

interface Connection {
  from: Node
  to: Node
  opacity: number
}

export default function HeroSection() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])

  useEffect(() => {
    // Create neural network nodes
    const nodeCount = 40
    const newNodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      targetX: Math.random() * 100,
      targetY: Math.random() * 100,
    }))

    // Create connections between nearby nodes
    const newConnections: Connection[] = []
    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < newNodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(newNodes[i].x - newNodes[j].x, 2) + 
          Math.pow(newNodes[i].y - newNodes[j].y, 2)
        )
        if (distance < 25 && Math.random() > 0.6) {
          newConnections.push({
            from: newNodes[i],
            to: newNodes[j],
            opacity: Math.random() * 0.8 + 0.2
          })
        }
      }
    }

    setNodes(newNodes)
    setConnections(newConnections)

    // Animate nodes to new positions periodically
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        targetX: Math.random() * 100,
        targetY: Math.random() * 100,
      })))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Neural Network Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary-900/30" />
        
        {/* Neural Network SVG */}
        <svg className="absolute inset-0 w-full h-full" style={{ filter: 'blur(0.5px)' }}>
          {/* Connections */}
          {connections.map((connection, i) => (
            <motion.line
              key={`connection-${i}`}
              x1={`${connection.from.x}%`}
              y1={`${connection.from.y}%`}
              x2={`${connection.to.x}%`}
              y2={`${connection.to.y}%`}
              stroke="url(#neural-gradient)"
              strokeWidth="1"
              opacity={connection.opacity}
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                opacity: [connection.opacity * 0.3, connection.opacity, connection.opacity * 0.3]
              }}
              transition={{ 
                pathLength: { duration: 2, delay: Math.random() * 3 },
                opacity: { duration: 4, repeat: Infinity, delay: Math.random() * 2 }
              }}
            />
          ))}
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
            </linearGradient>
            <radialGradient id="node-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
            </radialGradient>
          </defs>
        </svg>

        {/* Neural Network Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute w-3 h-3 rounded-full shadow-lg"
            style={{
              background: 'radial-gradient(circle, #a855f7 0%, #8b5cf6 50%, #7c3aed 100%)',
              boxShadow: '0 0 20px #8b5cf6, 0 0 40px #7c3aed',
            }}
            initial={{ 
              left: `${node.x}%`, 
              top: `${node.y}%`,
              scale: 0
            }}
            animate={{ 
              left: `${node.targetX}%`, 
              top: `${node.targetY}%`,
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ 
              left: { duration: 8, ease: "easeInOut" },
              top: { duration: 8, ease: "easeInOut" },
              scale: { duration: 3, repeat: Infinity, delay: Math.random() * 2 }
            }}
          />
        ))}

        {/* Pulsing Energy Waves */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 70% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 40%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center mb-6"
        >
          <Sparkles className="text-primary-500 mr-2" size={24} />
          <span className="text-primary-500 font-semibold">AI-Powered Business Transformation</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: [1, 1.02, 1],
            filter: ['brightness(1)', 'brightness(1.1)', 'brightness(1)']
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.2 },
            y: { duration: 0.8, delay: 0.2 },
            scale: { 
              duration: 4, 
              repeat: Infinity, 
              delay: 2,
              ease: "easeInOut"
            },
            filter: { 
              duration: 4, 
              repeat: Infinity, 
              delay: 2,
              ease: "easeInOut"
            }
          }}
          className="text-5xl md:text-7xl font-bold mb-8 py-4 leading-tight bg-gradient-to-r from-foreground to-primary-500 bg-clip-text text-transparent"
          style={{ lineHeight: '1.1' }}
        >
          Big Fluffy AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Transform your business with cutting-edge AI solutions. From consultation to implementation, 
          we deliver intelligent automation that drives real results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="group bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center">
            Get Started Today
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </button>
          
          <button className="border border-primary-500 text-primary-500 hover:bg-primary-500/10 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
            View Our Services
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-sm text-gray-400"
        >
          <p>Trusted by innovative companies worldwide</p>
        </motion.div>
      </div>
    </section>
  )
}
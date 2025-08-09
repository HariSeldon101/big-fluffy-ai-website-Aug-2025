'use client'

import { useRef, useEffect, memo } from 'react'
import { motion } from 'framer-motion'

const ContactCube3D = memo(function ContactCube3D() {
  const cubeRef = useRef<HTMLDivElement>(null)

  // Communication methods for each face of the cube
  const communicationMethods = [
    'Email',
    'Phone',
    'Teams',
    'Zoom',
    'Google Spaces',
    'WhatsApp'
  ]

  useEffect(() => {
    const cube = cubeRef.current
    if (!cube) return

    let animationId: number
    let rotateX = 0
    let rotateY = 0

    const animate = () => {
      rotateX += 0.3
      rotateY += 0.5
      
      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div 
      className="flex items-center justify-center h-96"
      style={{ perspective: '1000px' }}
    >
      <div className="relative">
        {/* Cube container */}
        <div
          ref={cubeRef}
          className="w-48 h-48 relative transition-transform duration-100 ease-linear"
          style={{
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Front face */}
          <div
            className="absolute w-48 h-48 bg-gradient-to-br from-primary-600/80 to-primary-800/80 border border-primary-400/30 backdrop-blur-sm rounded-lg flex items-center justify-center"
            style={{ transform: 'rotateY(0deg) translateZ(96px)' }}
          >
            <span className="text-2xl font-bold text-primary-100">
              {communicationMethods[0]}
            </span>
          </div>

          {/* Back face */}
          <div
            className="absolute w-48 h-48 bg-gradient-to-br from-primary-700/80 to-primary-900/80 border border-primary-400/30 backdrop-blur-sm rounded-lg flex items-center justify-center"
            style={{ transform: 'rotateY(180deg) translateZ(96px)' }}
          >
            <span className="text-2xl font-bold text-primary-100">
              {communicationMethods[1]}
            </span>
          </div>

          {/* Right face */}
          <div
            className="absolute w-48 h-48 bg-gradient-to-br from-primary-500/80 to-primary-700/80 border border-primary-400/30 backdrop-blur-sm rounded-lg flex items-center justify-center"
            style={{ transform: 'rotateY(90deg) translateZ(96px)' }}
          >
            <span className="text-2xl font-bold text-primary-100">
              {communicationMethods[2]}
            </span>
          </div>

          {/* Left face */}
          <div
            className="absolute w-48 h-48 bg-gradient-to-br from-primary-800/80 to-primary-950/80 border border-primary-400/30 backdrop-blur-sm rounded-lg flex items-center justify-center"
            style={{ transform: 'rotateY(-90deg) translateZ(96px)' }}
          >
            <span className="text-2xl font-bold text-primary-100">
              {communicationMethods[3]}
            </span>
          </div>

          {/* Top face */}
          <div
            className="absolute w-48 h-48 bg-gradient-to-br from-primary-400/80 to-primary-600/80 border border-primary-400/30 backdrop-blur-sm rounded-lg flex items-center justify-center"
            style={{ transform: 'rotateX(90deg) translateZ(96px)' }}
          >
            <span className="text-lg font-bold text-primary-100 text-center px-2">
              {communicationMethods[4]}
            </span>
          </div>

          {/* Bottom face */}
          <div
            className="absolute w-48 h-48 bg-gradient-to-br from-primary-900/80 to-primary-950/80 border border-primary-400/30 backdrop-blur-sm rounded-lg flex items-center justify-center"
            style={{ transform: 'rotateX(-90deg) translateZ(96px)' }}
          >
            <span className="text-2xl font-bold text-primary-100">
              {communicationMethods[5]}
            </span>
          </div>
        </div>

        {/* Floating particles around the cube */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-400/40 rounded-full"
              animate={{
                x: [0, 50, 0, -50, 0],
                y: [0, -30, 0, 30, 0],
                opacity: [0.3, 0.8, 0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 200 - 50}px`,
                top: `${Math.random() * 200 - 50}px`,
              }}
            />
          ))}
        </div>

        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl scale-150 animate-pulse"
          style={{ zIndex: -1 }}
        />
      </div>
    </div>
  )
})

export default ContactCube3D
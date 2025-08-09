'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, MessageCircle, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onRedirectToDashboard: () => void
  userEmail: string
}

export default function SuccessModal({ 
  isOpen, 
  onClose, 
  onRedirectToDashboard, 
  userEmail 
}: SuccessModalProps) {
  const [showChatbotPrompt, setShowChatbotPrompt] = useState(false)

  const handleContinue = () => {
    if (!showChatbotPrompt) {
      setShowChatbotPrompt(true)
    } else {
      onRedirectToDashboard()
    }
  }

  const handleSkipChat = () => {
    onRedirectToDashboard()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {!showChatbotPrompt ? (
              // Welcome message
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <CheckCircle size={32} className="text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-4">
                  Welcome to Big Fluffy AI! 🎉
                </h2>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Your account has been created successfully for <span className="text-primary-400 font-semibold">{userEmail}</span>
                </p>

                <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-4 mb-6 text-left">
                  <h3 className="text-primary-400 font-semibold mb-2">Your Client Portal Includes:</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Real-time project progress tracking</li>
                    <li>• Secure document management & sharing</li>
                    <li>• Direct communication with your AI team</li>
                    <li>• Timeline visualization & milestone updates</li>
                    <li>• 24/7 access to project resources</li>
                  </ul>
                </div>

                <button
                  onClick={handleContinue}
                  className="w-full bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-lg"
                >
                  Continue to Portal
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            ) : (
              // AI Stu chatbot prompt
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <MessageCircle size={32} className="text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-4">
                  Meet AI Stu! 🤖
                </h2>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Before you dive into your portal, would you like to chat with our AI assistant? 
                  AI Stu can help you understand your portal features, answer questions about your projects, 
                  and guide you through getting the most out of Big Fluffy AI's services.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleContinue}
                    className="flex-1 bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-lg"
                  >
                    <MessageCircle size={18} className="mr-2" />
                    Chat with AI Stu
                  </button>
                  
                  <button
                    onClick={handleSkipChat}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200"
                  >
                    Skip for Now
                  </button>
                </div>

                <p className="text-gray-400 text-xs mt-3">
                  Don't worry - you can always find AI Stu in your portal later!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
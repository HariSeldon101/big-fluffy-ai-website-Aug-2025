'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface TechIcon {
  name: string
  icon: React.ReactNode
}

const techStack: TechIcon[] = [
  
  {
    name: 'n8n',
    icon: (
      <Image 
        src="/images/n8n-color.svg" 
        alt="n8n Logo" 
        width={64} 
        height={64}
        className="w-16 h-16 object-contain"
      />
    )
  },
  {
    name: 'Next.js',
    icon: (
      <Image 
        src="/images/next-js-seeklogo.svg" 
        alt="Next.js Logo" 
        width={64} 
        height={64}
        className="w-16 h-16 object-contain"
      />
    )
  },
  {
    name: 'React',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="#61DAFB">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.184-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.788-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.125-1.74 2.857-2.475.42-.18.88-.342 1.355-.493.278-.96.645-1.957 1.1-2.98zm-1.086 5.945c.23.632.495 1.28.792 1.946.298.665.626 1.32.983 1.95.358.63.745 1.24 1.152 1.815a23.89 23.89 0 0 0 4.412 0c.407-.575.794-1.185 1.152-1.815.357-.63.685-1.285.983-1.95.297-.666.562-1.314.792-1.946.225-.62.425-1.24.598-1.845-.695-.103-1.365-.23-2.006-.387a24.76 24.76 0 0 0-1.345 2.32c-.24.377-.48.763-.704 1.16-.225.39-.435.788-.635 1.174-.19-.386-.4-.783-.62-1.174a15.23 15.23 0 0 0-.7-1.16 24.76 24.76 0 0 0-1.345-2.32c-.64.157-1.31.284-2.006.387.173.605.373 1.225.598 1.845z"/>
      </svg>
    )
  },
  {
    name: 'Cursor',
    icon: (
      <Image 
        src="/images/cursor.svg" 
        alt="Cursor Logo" 
        width={64} 
        height={64}
        className="w-16 h-16 object-contain"
      />
    )
  },
  {
    name: 'Tailwind CSS',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="#06B6D4">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    )
  },
  {
    name: 'Motion.dev',
    icon: (
      <Image 
        src="/images/motion-one@logotyp.us.svg" 
        alt="Motion.dev Logo" 
        width={64} 
        height={64}
        className="w-16 h-16 object-contain"
      />
    )
  },
  {
    name: 'TypeScript',
    icon: (
      <Image 
        src="/images/typescript.svg" 
        alt="TypeScript Logo" 
        width={64} 
        height={64}
        className="w-16 h-16 object-contain"
      />
    )
  },
  {
    name: 'Supabase',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
        <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12V23.604a.396.396 0 0 0 .716.233L21.797 11.576l.401-.562a1.04 1.04 0 0 0-.836-1.659Z" fill="#3ECF8E"/>
      </svg>
    )
  },
  {
    name: 'Vercel',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="white">
        <path d="M24 22.525H0L12 1.475l12 21.05Z"/>
      </svg>
    )
  },
  {
    name: 'Node.js',
    icon: (
      <Image 
        src="/images/nodejsLight.svg" 
        alt="Node.js Logo" 
        width={63} 
        height={63}
        className="w-16 h-16 object-contain"
      />
    )
  },
  {
    name: 'AWS',
    icon: (
      <Image 
        src="/images/aws-color-for-dark-background.svg" 
        alt="AWS Logo" 
        width={64} 
        height={64}
        className="w-16 h-16 object-contain"
      />
    )
  },
  {
    name: 'Claude AI',
    icon: (
      <Image 
        src="/images/Claude_AI_logo.svg" 
        alt="Claude AI Logo" 
        width={135} 
        height={135}
        className="w-34 h-34 object-contain"
      />
    )
  },
  {
    name: 'Copilot',
    icon: (
      <Image 
        src="/images/copilot-color.svg" 
        alt="Copilot Logo" 
        width={64} 
        height={64}
        className="w-16 h-16 object-contain"
      />
    )
  },
  {
    name: 'Firebase',
    icon: (
      <Image 
        src="/images/firebase.svg" 
        alt="Firebase Logo" 
        width={76} 
        height={76}
        className="w-19 h-19 object-contain"
      />
    )
  },
  {
    name: 'Gemini',
    icon: (
      <Image 
        src="/images/gemini-color.svg" 
        alt="Gemini Logo" 
        width={64} 
        height={64}
        className="w-16 h-16 object-contain"
      />
    )
  },
  {
    name: 'Hugging Face',
    icon: (
      <Image 
        src="/images/hugging-face-icon.svg" 
        alt="Hugging Face Logo" 
        width={64} 
        height={64}
        className="w-16 h-16 object-contain"
      />
    )
  },
  {
    name: 'Microsoft Azure',
    icon: (
      <Image 
        src="/images/microsoft-azure-3.svg" 
        alt="Microsoft Azure Logo" 
        width={64} 
        height={64}
        className="w-16 h-16 object-contain"
      />
    )
  },
  {
    name: 'OpenAI',
    icon: (
      <Image 
        src="/images/openai (1).svg" 
        alt="OpenAI Logo" 
        width={64} 
        height={64}
        className="w-16 h-16 object-contain"
      />
    )
  }
]

const marqueeVariants = {
  animate: {
    x: [0, -100 * techStack.length],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 30,
        ease: "linear" as const,
      },
    },
  },
};

const TechStackIcons = memo(function TechStackIcons() {
  return (
    <div className="py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 pt-5">
          <h4 className="text-lg font-semibold text-foreground mb-2">Powered by Industry-Leading Technologies</h4>
          <p className="text-gray-400 text-sm mb-5">The robust tech stack behind our AI solutions</p>
        </div>
        
        {/* Scrolling Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900/50 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Animation */}
          <motion.div
            className="flex space-x-6"
            variants={marqueeVariants}
            animate="animate"
            style={{
              width: `${techStack.length * 200}px`
            }}
          >
            {/* First set of icons */}
            {techStack.map((tech, index) => (
              <motion.div
                key={`first-${index}`}
                className="flex-shrink-0 group"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center space-y-2 p-3">
                  <div className="w-auto h-16 flex items-center justify-center">
                    {tech.icon}
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors font-medium text-center whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {techStack.map((tech, index) => (
              <motion.div
                key={`second-${index}`}
                className="flex-shrink-0 group"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center space-y-2 p-3">
                  <div className="w-auto h-16 flex items-center justify-center">
                    {tech.icon}
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors font-medium text-center whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
})

export default TechStackIcons
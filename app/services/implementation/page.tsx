'use client'

import ServiceTemplate from '../ServiceTemplate'
import { Wrench, Code, TestTube, Rocket } from 'lucide-react'

const benefits = [
  'Custom AI solution development',
  'System integration and deployment',
  'Quality assurance and testing',
  'Performance optimization',
  'Documentation and training',
  'Ongoing support and maintenance'
]

const process = [
  {
    icon: Code,
    title: 'Development',
    description: 'Build custom AI solutions tailored to your specific requirements and use cases.'
  },
  {
    icon: TestTube,
    title: 'Testing & QA',
    description: 'Rigorous testing and quality assurance to ensure reliable, production-ready solutions.'
  },
  {
    icon: Rocket,
    title: 'Deployment',
    description: 'Smooth deployment and integration with your existing systems and workflows.'
  }
]

export default function ImplementationPage() {
  return (
    <ServiceTemplate
      icon={Wrench}
      title="Project Implementation"
      description="End-to-end implementation services to bring your AI initiatives from concept to production with custom development, integration, and deployment expertise."
      benefits={benefits}
      process={process}
      ctaTitle="Ready to Implement Your AI Solution?"
      ctaDescription="Let us turn your AI vision into reality with expert implementation services."
      showPrince2={true}
    />
  )
}
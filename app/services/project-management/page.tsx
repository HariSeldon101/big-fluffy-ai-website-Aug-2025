'use client'

import ServiceTemplate from '../ServiceTemplate'
import { Target, Shield, TrendingUp } from 'lucide-react'

const benefits = [
  'Comprehensive project planning and roadmapping',
  'AI-powered risk assessment and mitigation',
  'Resource allocation and timeline optimization',
  'Progress tracking and reporting dashboards',
  'Stakeholder communication management',
  'Quality assurance and delivery oversight'
]

const process = [
  {
    icon: Target,
    title: 'Project Scoping',
    description: 'Define project objectives, deliverables, and success criteria with stakeholders.'
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Identify potential risks and develop comprehensive mitigation strategies.'
  },
  {
    icon: TrendingUp,
    title: 'Execution & Monitoring',
    description: 'Oversee project execution with continuous monitoring and optimization.'
  }
]

export default function ProjectManagementPage() {
  return (
    <ServiceTemplate
      icon={Target}
      title="Project & Risk Management"
      description="Comprehensive project oversight with AI-powered risk assessment and mitigation strategies to ensure successful project delivery on time and within budget."
      benefits={benefits}
      process={process}
      ctaTitle="Ready to Optimize Your Project Management?"
      ctaDescription="Let us help you deliver projects more efficiently with reduced risks and better outcomes."
    />
  )
}
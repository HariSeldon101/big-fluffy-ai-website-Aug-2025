'use client'

import ServiceTemplate from '../ServiceTemplate'
import { Users, DollarSign, Clock, TrendingUp } from 'lucide-react'

const benefits = [
  'Access to specialized AI expertise',
  'Flexible engagement models',
  'Cost-effective team scaling',
  'Reduced hiring and training overhead',
  'Faster time to market',
  'Focus on core business activities'
]

const process = [
  {
    icon: Users,
    title: 'Team Assembly',
    description: 'Match you with AI experts perfectly suited to your project requirements and timeline.'
  },
  {
    icon: DollarSign,
    title: 'Flexible Engagement',
    description: 'Choose from various engagement models that fit your budget and project scope.'
  },
  {
    icon: TrendingUp,
    title: 'Delivery & Scale',
    description: 'Deliver results while maintaining flexibility to scale the team up or down as needed.'
  }
]

export default function OutsourcingPage() {
  return (
    <ServiceTemplate
      icon={Users}
      title="Outsource AI Expertise"
      description="Access specialized AI talent and expertise without the overhead of building an in-house team. Scale your capabilities with flexible, cost-effective outsourcing solutions."
      benefits={benefits}
      process={process}
      ctaTitle="Ready to Scale Your AI Capabilities?"
      ctaDescription="Access top-tier AI talent without the complexity of in-house hiring and management."
    />
  )
}
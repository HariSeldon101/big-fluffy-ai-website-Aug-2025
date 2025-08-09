'use client'

import ServiceTemplate from '../ServiceTemplate'
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react'

const benefits = [
  'Custom training curricula design',
  'Hands-on workshops and exercises',
  'AI certification programs',
  'Ongoing mentorship and support',
  'Team skill assessment and planning',
  'Knowledge transfer documentation'
]

const process = [
  {
    icon: BookOpen,
    title: 'Curriculum Design',
    description: 'Develop customized training programs based on your team\'s current skills and learning objectives.'
  },
  {
    icon: Users,
    title: 'Interactive Training',
    description: 'Deliver engaging workshops combining theory with practical, hands-on AI implementation experience.'
  },
  {
    icon: Award,
    title: 'Certification & Support',
    description: 'Provide certification pathways and ongoing support to ensure knowledge retention and application.'
  }
]

export default function TrainingPage() {
  return (
    <ServiceTemplate
      icon={GraduationCap}
      title="AI Training"
      description="Comprehensive training programs to upskill your team on AI technologies and best practices with customized curricula, hands-on workshops, and ongoing support."
      benefits={benefits}
      process={process}
      ctaTitle="Ready to Upskill Your Team?"
      ctaDescription="Empower your workforce with the AI knowledge and skills needed for the future."
    />
  )
}
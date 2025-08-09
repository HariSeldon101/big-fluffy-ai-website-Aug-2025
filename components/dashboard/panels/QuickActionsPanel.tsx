'use client'

import DashboardPanel from '../DashboardPanel'
import { Plus, Upload, FileText, Settings, Calendar, Users } from 'lucide-react'

interface QuickActionsPanelProps {
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  onSettings?: () => void
  isMaximized?: boolean
}

export default function QuickActionsPanel({
  onClose,
  onMinimize,
  onMaximize,
  onSettings,
  isMaximized = false
}: QuickActionsPanelProps) {
  const actions = [
    {
      icon: Plus,
      label: 'New Project',
      color: 'bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 shadow-lg',
      action: () => console.log('New Project')
    },
    {
      icon: Upload,
      label: 'Upload Document',
      color: 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 shadow-lg',
      action: () => console.log('Upload Document')
    },
    {
      icon: FileText,
      label: 'Create Report',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg',
      action: () => console.log('Create Report')
    },
    {
      icon: Calendar,
      label: 'Schedule Meeting',
      color: 'bg-gradient-to-br from-soft-pink-400 to-soft-pink-500 hover:from-soft-pink-300 hover:to-soft-pink-400 shadow-lg',
      action: () => console.log('Schedule Meeting')
    },
    {
      icon: Users,
      label: 'Invite Team Member',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 shadow-lg',
      action: () => console.log('Invite Team Member')
    },
    {
      icon: Settings,
      label: 'Project Settings',
      color: 'bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-400 hover:to-gray-500 shadow-lg',
      action: () => console.log('Project Settings')
    }
  ]

  return (
    <DashboardPanel
      id="quick-actions"
      title="Quick Actions"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onSettings={onSettings}
      isMaximized={isMaximized}
    >
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`${action.color} text-white p-3 rounded-lg transition-colors flex flex-col items-center space-y-2 group`}
          >
            <action.icon size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-center leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <button 
          onClick={() => window.location.href = '/project/demo-project'}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-500 transition-colors text-sm"
        >
          🚀 View Demo Project
        </button>
      </div>
    </DashboardPanel>
  )
}
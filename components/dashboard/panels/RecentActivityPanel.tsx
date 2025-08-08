'use client'

import DashboardPanel from '../DashboardPanel'
import { Activity, User, FileText, MessageCircle, GitCommit, Calendar } from 'lucide-react'

interface RecentActivityPanelProps {
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  onSettings?: () => void
  isMaximized?: boolean
}

export default function RecentActivityPanel({
  onClose,
  onMinimize,
  onMaximize,
  onSettings,
  isMaximized = false
}: RecentActivityPanelProps) {
  const activities = [
    {
      icon: GitCommit,
      color: 'bg-green-600',
      title: 'Task Completed',
      description: 'Sarah Wilson completed "Authentication System"',
      time: '2 hours ago',
      user: 'SW'
    },
    {
      icon: FileText,
      color: 'bg-blue-600',
      title: 'Document Uploaded',
      description: 'Mike Johnson uploaded "Database Schema v2.0"',
      time: '4 hours ago',
      user: 'MJ'
    },
    {
      icon: MessageCircle,
      color: 'bg-yellow-600',
      title: 'Comment Added',
      description: 'John Doe commented on "API Integration" task',
      time: '6 hours ago',
      user: 'JD'
    },
    {
      icon: Calendar,
      color: 'bg-purple-600',
      title: 'Meeting Scheduled',
      description: 'Sprint Planning meeting scheduled for tomorrow',
      time: '8 hours ago',
      user: 'AL'
    },
    {
      icon: User,
      color: 'bg-red-600',
      title: 'Team Member Joined',
      description: 'Lisa Chen joined the AI Dashboard project',
      time: '1 day ago',
      user: 'LC'
    },
    {
      icon: Activity,
      color: 'bg-indigo-600',
      title: 'Project Updated',
      description: 'Project timeline updated with new milestones',
      time: '2 days ago',
      user: 'JD'
    }
  ]

  return (
    <DashboardPanel
      id="recent-activity"
      title="Recent Activity"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onSettings={onSettings}
      isMaximized={isMaximized}
    >
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
            <div className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center flex-shrink-0`}>
              <activity.icon size={14} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-white text-sm font-medium truncate">{activity.title}</h4>
                <span className="text-gray-400 text-xs ml-2">{activity.time}</span>
              </div>
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                {activity.description}
              </p>
            </div>
            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-medium">{activity.user}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <button className="w-full text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
          View All Activity →
        </button>
      </div>
    </DashboardPanel>
  )
}
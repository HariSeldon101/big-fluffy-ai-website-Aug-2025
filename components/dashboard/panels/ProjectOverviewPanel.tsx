'use client'

import DashboardPanel from '../DashboardPanel'
import { Target, TrendingUp, Clock, Users } from 'lucide-react'

interface ProjectOverviewPanelProps {
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  onSettings?: () => void
  isMaximized?: boolean
}

export default function ProjectOverviewPanel({
  onClose,
  onMinimize,
  onMaximize,
  onSettings,
  isMaximized = false
}: ProjectOverviewPanelProps) {
  return (
    <DashboardPanel
      id="project-overview"
      title="Project Overview"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onSettings={onSettings}
      isMaximized={isMaximized}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Target size={20} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-semibold text-primary-400">3</div>
              <div className="text-gray-400 text-sm">Active Projects</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-semibold text-green-400">12</div>
              <div className="text-gray-400 text-sm">Completed</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-light-blue-500 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-semibold text-light-blue-400">5</div>
              <div className="text-gray-400 text-sm">In Progress</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-semibold text-blue-400">8</div>
              <div className="text-gray-400 text-sm">Team Members</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-white font-medium mb-2">Recent Progress</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">AI Dashboard</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-700 rounded-full h-1">
                  <div className="bg-primary-500 h-1 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-gray-400 text-xs">75%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Mobile App</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-700 rounded-full h-1">
                  <div className="bg-green-500 h-1 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="text-gray-400 text-xs">45%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">API Integration</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-700 rounded-full h-1">
                  <div className="bg-light-blue-500 h-1 rounded-full" style={{ width: '90%' }}></div>
                </div>
                <span className="text-gray-400 text-xs">90%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardPanel>
  )
}
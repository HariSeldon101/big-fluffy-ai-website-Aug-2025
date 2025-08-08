'use client'

import { ReactNode, useState } from 'react'
import { X, Minimize2, Maximize2, Settings, GripVertical } from 'lucide-react'

interface DashboardPanelProps {
  id: string
  title: string
  children: ReactNode
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  onSettings?: () => void
  isMinimized?: boolean
  isMaximized?: boolean
  className?: string
}

export default function DashboardPanel({
  id,
  title,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onSettings,
  isMinimized = false,
  isMaximized = false,
  className = ''
}: DashboardPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden ${className} ${isMaximized ? 'fixed inset-4 z-50' : ''}`}>
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/30">
        <div className="flex items-center space-x-2">
          <div className="drag-handle cursor-grab hover:cursor-grabbing">
            <GripVertical size={16} className="text-gray-500" />
          </div>
          <h3 className="font-semibold text-white text-sm">{title}</h3>
        </div>
        
        <div className="flex items-center space-x-1">
          {onSettings && (
            <button
              onClick={onSettings}
              className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
              title="Settings"
            >
              <Settings size={14} />
            </button>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Collapse"
          >
            <Minimize2 size={14} />
          </button>
          
          {onMaximize && (
            <button
              onClick={onMaximize}
              className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              <Maximize2 size={14} />
            </button>
          )}
          
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
              title="Close"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      
      {/* Panel Content */}
      {!isCollapsed && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  )
}
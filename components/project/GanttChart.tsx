'use client'

import { useState, useEffect } from 'react'
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, differenceInDays } from 'date-fns'
import { ChevronLeft, ChevronRight, Calendar, User, Clock } from 'lucide-react'

interface GanttTask {
  id: string
  name: string
  startDate: Date
  endDate: Date
  progress: number
  assignee?: string
  dependencies?: string[]
  color: string
  priority: 'low' | 'medium' | 'high'
}

interface GanttChartProps {
  projectId: string
}

export default function GanttChart({ projectId }: GanttChartProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedTask, setSelectedTask] = useState<GanttTask | null>(null)
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week')

  const [tasks] = useState<GanttTask[]>([
    {
      id: '1',
      name: 'Project Planning & Requirements',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-14'),
      progress: 100,
      assignee: 'John Doe',
      color: '#3b82f6',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Database Design & Setup',
      startDate: new Date('2024-01-08'),
      endDate: new Date('2024-01-22'),
      progress: 75,
      assignee: 'Jane Smith',
      dependencies: ['1'],
      color: '#10b981',
      priority: 'high'
    },
    {
      id: '3',
      name: 'Authentication System',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-02-05'),
      progress: 60,
      assignee: 'Mike Johnson',
      dependencies: ['2'],
      color: '#f59e0b',
      priority: 'high'
    },
    {
      id: '4',
      name: 'Frontend Components',
      startDate: new Date('2024-01-20'),
      endDate: new Date('2024-02-15'),
      progress: 30,
      assignee: 'Sarah Wilson',
      dependencies: ['2'],
      color: '#8b5cf6',
      priority: 'medium'
    },
    {
      id: '5',
      name: 'API Development',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-02-28'),
      progress: 15,
      assignee: 'Alex Brown',
      dependencies: ['3'],
      color: '#ef4444',
      priority: 'medium'
    },
    {
      id: '6',
      name: 'Testing & QA',
      startDate: new Date('2024-02-15'),
      endDate: new Date('2024-03-10'),
      progress: 0,
      assignee: 'Lisa Chen',
      dependencies: ['4', '5'],
      color: '#06b6d4',
      priority: 'low'
    }
  ])

  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 })
    const end = endOfWeek(date, { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }

  const getMonthDays = (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1)
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    return eachDayOfInterval({ start, end })
  }

  const getDaysInView = () => {
    switch (viewMode) {
      case 'day':
        return [currentDate]
      case 'week':
        return getWeekDays(currentDate)
      case 'month':
        return getMonthDays(currentDate)
      default:
        return getWeekDays(currentDate)
    }
  }

  const daysInView = getDaysInView()
  const dayWidth = viewMode === 'month' ? 25 : viewMode === 'week' ? 120 : 200

  const getTaskPosition = (task: GanttTask) => {
    const startIndex = daysInView.findIndex(day => isSameDay(day, task.startDate))
    const endIndex = daysInView.findIndex(day => isSameDay(day, task.endDate))
    
    if (startIndex === -1 && endIndex === -1) return null

    const adjustedStartIndex = Math.max(0, startIndex === -1 ? 0 : startIndex)
    const adjustedEndIndex = endIndex === -1 ? daysInView.length - 1 : endIndex
    
    const left = adjustedStartIndex * dayWidth
    const width = (adjustedEndIndex - adjustedStartIndex + 1) * dayWidth - 8
    
    return { left, width }
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    const days = viewMode === 'day' ? 1 : viewMode === 'week' ? 7 : 30
    setCurrentDate(prev => addDays(prev, direction === 'next' ? days : -days))
  }

  const formatHeader = () => {
    switch (viewMode) {
      case 'day':
        return format(currentDate, 'EEEE, MMMM d, yyyy')
      case 'week':
        const start = startOfWeek(currentDate, { weekStartsOn: 1 })
        const end = endOfWeek(currentDate, { weekStartsOn: 1 })
        return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`
      case 'month':
        return format(currentDate, 'MMMM yyyy')
    }
  }

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-light-blue-100 text-light-blue-800',
    low: 'bg-green-100 text-green-800'
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Gantt Chart</h2>
        
        <div className="flex items-center space-x-4">
          {/* View Mode Selector */}
          <div className="flex bg-gray-700 rounded-lg p-1">
            {(['day', 'week', 'month'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-sm rounded ${
                  viewMode === mode
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateDate('prev')}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-white font-medium min-w-[200px] text-center">
              {formatHeader()}
            </span>
            <button
              onClick={() => navigateDate('next')}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <button className="text-gray-400 hover:text-white">
            <Calendar size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Timeline Header */}
          <div className="flex border-b border-gray-700 pb-2 mb-4">
            <div className="w-80 flex-shrink-0 pr-4">
              <h3 className="text-gray-300 font-medium">Task Name</h3>
            </div>
            <div className="flex" style={{ width: daysInView.length * dayWidth }}>
              {daysInView.map((day) => (
                <div
                  key={day.toISOString()}
                  className="flex-shrink-0 text-center text-sm text-gray-300"
                  style={{ width: dayWidth }}
                >
                  {viewMode === 'month' 
                    ? format(day, 'd')
                    : format(day, viewMode === 'day' ? 'HH:mm' : 'EEE d')
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Task Rows */}
          <div className="space-y-3">
            {tasks.map((task, index) => {
              const position = getTaskPosition(task)
              return (
                <div key={task.id} className="flex items-center">
                  {/* Task Info */}
                  <div className="w-80 flex-shrink-0 pr-4">
                    <div className="bg-gray-700 rounded-lg p-3">
                      <h4 className="text-white font-medium text-sm mb-1">
                        {task.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        {task.assignee && (
                          <div className="flex items-center">
                            <User size={12} className="mr-1" />
                            {task.assignee}
                          </div>
                        )}
                        <span className={`px-2 py-1 rounded text-xs ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-400">
                        <Clock size={12} className="mr-1" />
                        {differenceInDays(task.endDate, task.startDate) + 1} days
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div 
                    className="relative h-12 bg-gray-700 rounded"
                    style={{ width: daysInView.length * dayWidth }}
                  >
                    {position && (
                      <div
                        className="absolute top-2 h-8 rounded cursor-pointer group"
                        style={{
                          left: position.left + 4,
                          width: Math.max(position.width, 20),
                          backgroundColor: task.color,
                        }}
                        onClick={() => setSelectedTask(task)}
                      >
                        {/* Progress Bar */}
                        <div
                          className="h-full bg-white bg-opacity-20 rounded-l"
                          style={{ width: `${task.progress}%` }}
                        />
                        
                        {/* Task Name on Bar */}
                        <div className="absolute inset-0 flex items-center px-2">
                          <span className="text-white text-xs font-medium truncate">
                            {task.name}
                          </span>
                        </div>
                        
                        {/* Progress Percentage */}
                        <div className="absolute -top-6 left-2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs px-2 py-1 rounded transition-opacity">
                          {task.progress}% complete
                        </div>
                      </div>
                    )}

                    {/* Today Indicator */}
                    {daysInView.some(day => isSameDay(day, new Date())) && (
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                        style={{
                          left: daysInView.findIndex(day => isSameDay(day, new Date())) * dayWidth + dayWidth / 2
                        }}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">{selectedTask.name}</h3>
            <div className="space-y-3">
              <div>
                <label className="text-gray-400 text-sm">Duration</label>
                <p className="text-white">
                  {format(selectedTask.startDate, 'MMM d')} - {format(selectedTask.endDate, 'MMM d, yyyy')}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Progress</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${selectedTask.progress}%`,
                        backgroundColor: selectedTask.color 
                      }}
                    />
                  </div>
                  <span className="text-white text-sm">{selectedTask.progress}%</span>
                </div>
              </div>
              {selectedTask.assignee && (
                <div>
                  <label className="text-gray-400 text-sm">Assignee</label>
                  <p className="text-white">{selectedTask.assignee}</p>
                </div>
              )}
              <div>
                <label className="text-gray-400 text-sm">Priority</label>
                <span className={`inline-block px-2 py-1 rounded text-xs ${priorityColors[selectedTask.priority]}`}>
                  {selectedTask.priority}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedTask(null)}
              className="mt-6 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
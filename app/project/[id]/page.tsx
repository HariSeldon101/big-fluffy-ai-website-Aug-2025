'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Navigation from '@/components/layout/Navigation'
import GanttChart from '@/components/project/GanttChart'
import KanbanBoard from '@/components/project/KanbanBoard'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase'
import { 
  Calendar, 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  Kanban,
  ArrowLeft,
  Clock,
  Target
} from 'lucide-react'

interface Project {
  id: string
  name: string
  description?: string
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold'
  progress: number
  start_date: string
  end_date?: string
  created_at: string
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string
  const { user, loading } = useAuth()
  const [activeView, setActiveView] = useState<'gantt' | 'kanban' | 'overview'>('overview')
  const [project, setProject] = useState<Project | null>(null)
  const [projectLoading, setProjectLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      if (!user || !projectId) return

      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .eq('client_id', user.id)
          .single()

        if (error) {
          console.error('Error fetching project:', error)
        } else {
          setProject(data)
        }
      } catch (err) {
        console.error('Project fetch error:', err)
      } finally {
        setProjectLoading(false)
      }
    }

    if (!loading) {
      fetchProject()
    }
  }, [user, loading, projectId])

  if (loading || projectLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white text-xl">Loading project...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">Please log in to access this project.</p>
        </div>
      </div>
    )
  }

  const statusColors = {
    planning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    in_progress: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    on_hold: 'bg-red-500/20 text-red-400 border-red-500/30'
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <button 
                onClick={() => window.history.back()}
                className="mr-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {project?.name || 'Demo Project: AI-Powered Dashboard'}
                </h1>
                <p className="text-gray-400 mt-1">
                  {project?.description || 'Building an intelligent dashboard with real-time analytics and AI insights'}
                </p>
              </div>
            </div>

            {/* Project Status and Progress */}
            <div className="flex items-center space-x-6">
              <div className={`px-3 py-1 rounded-lg border ${statusColors[project?.status || 'in_progress']}`}>
                {project?.status?.replace('_', ' ').toUpperCase() || 'IN PROGRESS'}
              </div>
              
              <div className="flex items-center space-x-2">
                <Target size={16} className="text-gray-400" />
                <span className="text-gray-400">Progress:</span>
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project?.progress || 65}%` }}
                  />
                </div>
                <span className="text-white font-medium">{project?.progress || 65}%</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-400">
                <Clock size={16} />
                <span>
                  {project?.start_date 
                    ? `Started ${new Date(project.start_date).toLocaleDateString()}`
                    : 'Started Jan 15, 2024'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-800/50 backdrop-blur-sm rounded-lg p-1">
            {[
              { key: 'overview', label: 'Overview', icon: BarChart3 },
              { key: 'gantt', label: 'Timeline', icon: Calendar },
              { key: 'kanban', label: 'Kanban', icon: Kanban },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveView(key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeView === key
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            {activeView === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Key Metrics */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Project Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-400">12</div>
                        <div className="text-gray-400 text-sm">Total Tasks</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">7</div>
                        <div className="text-gray-400 text-sm">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">3</div>
                        <div className="text-gray-400 text-sm">In Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">2</div>
                        <div className="text-gray-400 text-sm">Overdue</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                          <Users size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm">Sarah Wilson completed "Authentication System"</p>
                          <p className="text-gray-400 text-xs">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <FileText size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm">Mike Johnson uploaded "Database Schema v2.0"</p>
                          <p className="text-gray-400 text-xs">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                        <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                          <Settings size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm">Project settings updated by John Doe</p>
                          <p className="text-gray-400 text-xs">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div className="space-y-6">
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Team Members</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">JD</span>
                        </div>
                        <div>
                          <p className="text-white text-sm">John Doe</p>
                          <p className="text-gray-400 text-xs">Project Lead</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">SW</span>
                        </div>
                        <div>
                          <p className="text-white text-sm">Sarah Wilson</p>
                          <p className="text-gray-400 text-xs">Frontend Developer</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">MJ</span>
                        </div>
                        <div>
                          <p className="text-white text-sm">Mike Johnson</p>
                          <p className="text-gray-400 text-xs">Backend Developer</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Milestones */}
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Upcoming Milestones</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                        <div>
                          <p className="text-white text-sm">Beta Release</p>
                          <p className="text-gray-400 text-xs">Feb 15, 2024</p>
                        </div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                        <div>
                          <p className="text-white text-sm">Production Deploy</p>
                          <p className="text-gray-400 text-xs">Mar 1, 2024</p>
                        </div>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'gantt' && <GanttChart projectId={projectId} />}
            
            {activeView === 'kanban' && <KanbanBoard projectId={projectId} />}
          </div>
        </div>
      </div>
    </div>
  )
}
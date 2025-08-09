'use client'

import { useAuth } from '@/contexts/AuthContext'
import Navigation from '@/components/layout/Navigation'
import DraggableDashboard from '@/components/dashboard/DraggableDashboard'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface ClientProfile {
  id: string
  email: string
  full_name: string
  company_name?: string
  avatar_url?: string
  created_at: string
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const [profile, setProfile] = useState<ClientProfile | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('Error fetching profile:', error)
        } else {
          setProfile(data)
        }
      } catch (err) {
        console.error('Profile fetch error:', err)
      } finally {
        setProfileLoading(false)
      }
    }

    if (!loading) {
      fetchProfile()
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">Please log in to access the dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Welcome back, {profile?.full_name || 'User'}! 👋
            </h1>
            <p className="text-gray-400">
              Manage your AI projects and track progress with your customizable dashboard
            </p>
          </div>

          {/* User Profile Card */}
          {profile && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {profile.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{profile.full_name}</h3>
                    <p className="text-gray-400 text-sm">{profile.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Member since</p>
                  <p className="text-white text-sm font-medium">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Draggable Dashboard */}
          <DraggableDashboard />
        </div>
      </div>
    </div>
  )
}
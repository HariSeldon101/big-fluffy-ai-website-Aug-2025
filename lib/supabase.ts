import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }
  
  if (!supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Types for our database schema
export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url?: string
          company_name?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string
          company_name?: string
        }
        Update: {
          email?: string
          full_name?: string
          avatar_url?: string
          company_name?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          client_id: string
          name: string
          description?: string
          status: 'planning' | 'in_progress' | 'completed' | 'on_hold'
          progress: number
          start_date: string
          end_date?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          client_id: string
          name: string
          description?: string
          status?: 'planning' | 'in_progress' | 'completed' | 'on_hold'
          progress?: number
          start_date: string
          end_date?: string
        }
        Update: {
          name?: string
          description?: string
          status?: 'planning' | 'in_progress' | 'completed' | 'on_hold'
          progress?: number
          start_date?: string
          end_date?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          project_id: string
          name: string
          file_path: string
          file_size: number
          mime_type: string
          uploaded_by: string
          created_at: string
        }
        Insert: {
          project_id: string
          name: string
          file_path: string
          file_size: number
          mime_type: string
          uploaded_by: string
        }
        Update: {
          name?: string
          file_path?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          dashboard_layout: any
          panel_visibility: any
          theme_preferences: any
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          dashboard_layout?: any
          panel_visibility?: any
          theme_preferences?: any
        }
        Update: {
          dashboard_layout?: any
          panel_visibility?: any
          theme_preferences?: any
          updated_at?: string
        }
      }
    }
  }
}
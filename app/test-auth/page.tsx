'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function TestAuthPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const testSupabase = async () => {
    try {
      const supabase = createClient()
      setMessage('Supabase client created successfully!')
      setError('')
      
      // Try to sign up with a test email
      const { error } = await supabase.auth.signUp({
        email: email,
        password: 'testpassword123',
        options: {
          data: {
            full_name: 'Test User',
          }
        }
      })
      
      if (error) {
        setError(`Supabase error: ${error.message}`)
      } else {
        setMessage('Test signup successful! Check your email for confirmation.')
      }
    } catch (err: any) {
      setError(`Client error: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Test Supabase Authentication</h1>
        
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter test email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded"
          />
          
          <button
            onClick={testSupabase}
            className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-500"
          >
            Test Supabase Connection
          </button>
          
          {message && (
            <div className="p-4 bg-green-900/20 border border-green-500 rounded text-green-400">
              {message}
            </div>
          )}
          
          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500 rounded text-red-400">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
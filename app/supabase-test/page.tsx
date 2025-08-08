'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function SupabaseTestPage() {
  const [logs, setLogs] = useState<string[]>([])
  const [email, setEmail] = useState('test@example.com')
  const [loading, setLoading] = useState(false)

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testConnection = async () => {
    setLoading(true)
    setLogs([])
    
    try {
      addLog('Creating Supabase client...')
      const supabase = createClient()
      addLog('✅ Supabase client created successfully')

      addLog('Testing database connection...')
      const { data, error } = await supabase.from('clients').select('count').limit(1)
      
      if (error) {
        if (error.message.includes('does not exist')) {
          addLog('❌ Database tables do not exist. You need to run the migration.')
          addLog('Go to Supabase Dashboard > SQL Editor and run the migration from supabase/migrations/001_initial_schema.sql')
        } else {
          addLog(`❌ Database error: ${error.message}`)
        }
      } else {
        addLog('✅ Database connection successful')
      }
      
      addLog('Testing authentication...')
      const { data: authData, error: authError } = await supabase.auth.getUser()
      
      if (authError) {
        addLog(`❌ Auth error: ${authError.message}`)
      } else {
        addLog('✅ Authentication system working')
        addLog(`Current user: ${authData.user ? authData.user.email : 'Not logged in'}`)
      }
      
    } catch (err: any) {
      addLog(`❌ Connection error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testSignup = async () => {
    if (!email) {
      addLog('❌ Please enter an email address')
      return
    }

    setLoading(true)
    addLog(`Attempting to sign up with: ${email}`)

    try {
      const supabase = createClient()
      
      // First check if tables exist
      addLog('Checking if clients table exists...')
      const { data: tableCheck, error: tableError } = await supabase
        .from('clients')
        .select('id')
        .limit(1)
      
      if (tableError) {
        addLog(`❌ Table check error: ${tableError.message}`)
        return
      } else {
        addLog('✅ Clients table exists')
      }
      
      // Try signup
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: 'testpassword123',
        options: {
          data: {
            full_name: 'Test User'
          }
        }
      })

      if (error) {
        addLog(`❌ Signup error: ${error.message}`)
        addLog(`Error details: ${JSON.stringify(error)}`)
      } else {
        addLog('✅ Signup successful!')
        addLog(`User ID: ${data.user?.id}`)
        addLog('Check your email for confirmation link')
        
        // Check if client record was created
        if (data.user?.id) {
          addLog('Checking if client record was created...')
          const { data: clientData, error: clientError } = await supabase
            .from('clients')
            .select('*')
            .eq('id', data.user.id)
          
          if (clientError) {
            addLog(`❌ Client check error: ${clientError.message}`)
          } else if (clientData && clientData.length > 0) {
            addLog('✅ Client record created successfully')
          } else {
            addLog('❌ Client record not found - trigger may have failed')
          }
        }
      }
    } catch (err: any) {
      addLog(`❌ Signup error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testTrigger = async () => {
    setLoading(true)
    addLog('Testing trigger function manually...')
    
    try {
      const supabase = createClient()
      
      // Test if we can call the trigger function directly
      const { data, error } = await supabase.rpc('handle_new_user', {})
      
      if (error) {
        addLog(`❌ Trigger test error: ${error.message}`)
      } else {
        addLog('✅ Trigger function exists')
      }
    } catch (err: any) {
      addLog(`❌ Trigger test error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Supabase Connection Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <button
              onClick={testConnection}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Database Connection'}
            </button>
            
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Test email for signup"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600"
              />
              <button
                onClick={testSignup}
                disabled={loading || !email}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test User Signup'}
              </button>
              <button
                onClick={testTrigger}
                disabled={loading}
                className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-500 disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Trigger Function'}
              </button>
            </div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Test Results:</h3>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-400">Click "Test Database Connection" to start testing...</p>
              ) : (
                logs.map((log, index) => (
                  <div 
                    key={index} 
                    className={`text-sm font-mono ${
                      log.includes('✅') ? 'text-green-400' : 
                      log.includes('❌') ? 'text-red-400' : 
                      'text-gray-300'
                    }`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-500 rounded-lg">
          <h3 className="text-yellow-400 font-semibold mb-2">Important Notes:</h3>
          <ul className="text-yellow-300 text-sm space-y-1">
            <li>• If you see "table does not exist" errors, you need to run the database migration</li>
            <li>• Go to Supabase Dashboard → SQL Editor</li>
            <li>• Copy and run the SQL from: supabase/migrations/001_initial_schema.sql</li>
            <li>• This will create all necessary tables and triggers for user registration</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
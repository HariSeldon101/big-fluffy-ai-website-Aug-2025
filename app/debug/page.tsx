'use client'

export default function DebugPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <div className="p-8 min-h-screen bg-background text-white">
      <h1 className="text-2xl font-bold mb-6">Environment Variables Debug</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">NEXT_PUBLIC_SUPABASE_URL:</h2>
          <p className="font-mono bg-gray-800 p-2 rounded">
            {supabaseUrl ? supabaseUrl : 'NOT FOUND'}
          </p>
        </div>
        
        <div>
          <h2 className="font-semibold">NEXT_PUBLIC_SUPABASE_ANON_KEY:</h2>
          <p className="font-mono bg-gray-800 p-2 rounded">
            {supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'NOT FOUND'}
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-900/20 rounded">
          <h3 className="font-semibold text-blue-400">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>Make sure your .env.local file is in the root directory</li>
            <li>Verify there are no spaces around the = sign</li>
            <li>Make sure your Supabase URL starts with https://</li>
            <li>Restart your dev server after making changes</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
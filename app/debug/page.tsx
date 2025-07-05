'use client'

import { useAuth } from '../lib/auth-context'
import { useState, useEffect } from 'react'

export default function DebugPage() {
  const { user, token, isLoading, isAuthenticated } = useAuth()
  const [storageToken, setStorageToken] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    setStorageToken(token)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Authentication</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Auth Context State */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Auth Context State</h2>
            <div className="space-y-2">
              <p><strong>isLoading:</strong> {isLoading.toString()}</p>
              <p><strong>isAuthenticated:</strong> {isAuthenticated.toString()}</p>
              <p><strong>token:</strong> {token ? `${token.substring(0, 20)}...` : 'null'}</p>
              <p><strong>user:</strong></p>
              <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>

          {/* LocalStorage State */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">LocalStorage State</h2>
            <div className="space-y-2">
              <p><strong>auth_token:</strong> {storageToken ? `${storageToken.substring(0, 20)}...` : 'null'}</p>
              <button 
                onClick={() => {
                  const token = localStorage.getItem('auth_token')
                  setStorageToken(token)
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Refresh LocalStorage
              </button>
            </div>
          </div>

          {/* Manual Login Test */}
          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Manual Login Test</h2>
            <LoginTestForm />
          </div>
        </div>
      </div>
    </div>
  )
}

function LoginTestForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('phuhuynh1@example.com')
  const [password, setPassword] = useState('password123')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await login(email, password)
      setResult({ success: true, data: response })
    } catch (error: any) {
      setResult({ success: false, error: error.message, details: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Test Login'}
      </button>

      {result && (
        <div className="mt-4">
          <h3 className="font-bold">Result:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </form>
  )
} 
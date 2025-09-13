'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-persian-green-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-persian-green-500 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Admin Login</CardTitle>
              <CardDescription className="text-gray-400">
                Loading...
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Demo authentication - replace with real authentication
    if (email === 'admin@persiangreen.com' && password === 'admin123') {
      localStorage.setItem('admin_token', 'demo_token')
      router.push('/admin')
    } else {
      alert('Invalid credentials. Use admin@persiangreen.com / admin123')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-graphite via-charcoal to-graphite flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-persian-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            {mounted && <Shield className="w-5 h-5 text-white" />}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Craft&Art Marketplace Admin</h1>
          <p className="text-gray-400">Craft Art Marketplace</p>
        </div>

        <Card className="bg-charcoal border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-graphite border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-persian-green-500 focus:border-transparent"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-graphite border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-persian-green-500 focus:border-transparent pr-10"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {mounted && (showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)}
                  </button>
                </div>
              </div>



              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-persian-green-500 hover:bg-persian-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <div className="text-sm text-gray-400 bg-gray-800/50 rounded-md p-3">
                <p className="font-medium mb-1">Demo Credentials:</p>
                <p>Email: <span className="text-persian-green-400 font-mono">admin@persiangreen.com</span></p>
                <p>Password: <span className="text-persian-green-400 font-mono">admin123</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
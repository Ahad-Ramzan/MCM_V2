'use client'

import { useState } from 'react'
// import { loginUser } from "@/apis/auth";
import { loginUser } from '@/apis/userApi'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (email === '' || password === '') {
      setError('Please enter both email and password')
      setIsLoading(false)
      return
    }

    try {
      const response = await loginUser(email, password)
      toast.success('Login Successfully!')

      if (response.token) {
        localStorage.setItem('access_token', response.token)
        localStorage.setItem('user_role', response.role) // 👈 role save karo

        // Role-based redirection
        if (response.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/')
        }
      }
    } catch (error) {
      toast.error('Failed to Login.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000, // default for all toasts
        }}
      />
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center">
        <img src="/img/logo.png" alt="Logo" className="h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Welcome back</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Name@email.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="••••"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition disabled:bg-blue-400"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
          {/* <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => router.push('/register')}
                className="text-blue-600 hover:underline font-medium"
              >
                Register
              </button>
            </p>
          </div> */}
        </form>
      </div>
    </div>
  )
}

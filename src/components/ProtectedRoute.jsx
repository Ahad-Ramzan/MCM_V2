'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function ProtectedRoute({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const role = localStorage.getItem('user_role')

    if (pathname === '/') {
      setLoading(false)
      return
    }

    // if (!token) {
    //   router.replace('/login')
    //   return
    // }

    if (pathname.startsWith('/admin') && role === 'user') {
      router.replace('/')
      return
    }

    setLoading(false)
  }, [pathname])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg font-medium">
            Checking Authentication...
          </p>
        </div>
      </div>
    )

  return <>{children}</>
}

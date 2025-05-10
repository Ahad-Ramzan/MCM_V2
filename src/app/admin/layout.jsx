'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootLayout({ children }) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      router.replace('/login') // 👈 redirect if not logged in
    } else if (window.location.pathname === '/login') {
      router.replace('/admin') // 👈 redirect to admin if already logged in
    }
  }, [])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

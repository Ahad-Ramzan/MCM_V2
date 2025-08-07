// WidgetUserWelcome.js
import { getCurrentUser } from '@/apis/userApi'
import React, { useEffect, useState } from 'react'

const WidgetUserWelcome = () => {
  const [currentUser, setCurrentUser] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  const fetchData = async () => {
    try {
      const response = await getCurrentUser()
      setCurrentUser(response)
    } catch (error) {
      console.error('error occur')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-3">
        <img
          src="/img/user/admin.jpg"
          alt="User"
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
        <div>
          <p className="text-xs text-gray-500">Olá,</p>
          <a
            href="#"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Senhor Alberto
          </a>
        </div>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem('access_token')
          localStorage.removeItem('user_role')
          window.location.href = '/'
        }}
        className="text-gray-400 hover:text-red-500 transition-colors p-1"
        aria-label="Logout"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>
    </div>
  )
}

export default WidgetUserWelcome

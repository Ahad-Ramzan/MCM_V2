'use client'

import { getCurrentUser } from '@/apis/userApi'
import React, { useEffect, useState } from 'react'

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    full_name: '',
    display_name: '',
    email: '',
    role: '',
    address: '',
    bio: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCurrentUser()
        setUserData({
          full_name: response.full_name || '',
          display_name: response.display_name || '',
          email: response.email || '',
          role: response.role || '',
          address: response.address || '',
          bio: response.bio || '',
        })
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-8 mt-30">
      <h2 className="text-2xl font-semibold mb-2">User Profile</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={userData.full_name}
            disabled
            className="w-full p-2 border border-gray-300 bg-gray-100 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Display Name</label>
          <input
            type="text"
            value={userData.display_name}
            disabled
            className="w-full p-2 border border-gray-300 bg-gray-100 rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={userData.email}
            disabled
            className="w-full p-2 border border-gray-300 bg-gray-100 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <input
            type="text"
            value={userData.role}
            disabled
            className="w-full p-2 border border-gray-300 bg-gray-100 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            value={userData.address}
            disabled
            className="w-full p-2 border border-gray-300 bg-gray-100 rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            rows={5}
            value={userData.bio}
            disabled
            className="w-full p-2 border border-gray-300 bg-gray-100 rounded resize-none"
          ></textarea>
        </div>
      </form>

      <div className="mt-8 flex justify-center gap-4">
        <button
          type="button"
          className="px-6 py-2 bg-gray-200 text-black font-semibold rounded hover:bg-gray-300"
        >
          CANCEL
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-lime-600 text-white font-semibold rounded hover:bg-lime-700"
        >
          UPDATE PROFILE
        </button>
      </div>
    </div>
  )
}

export default SettingsPage

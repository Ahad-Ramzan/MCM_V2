'use client'

import React, { useEffect, useState } from 'react'
import { getCurrentUser, UpdateUser } from '@/apis/userApi'
import toast, { Toaster } from 'react-hot-toast'

const FormAccountSettings = () => {
  const [userData, setUserData] = useState({
    full_name: '',
    address: '',
    bio: '',
    display_name: '',
    contact_number: '',
    email: '',
    role: '',
  })

  const fetchUserData = async () => {
    try {
      const response = await getCurrentUser()
      setUserData({
        full_name: response.full_name || '',
        address: response.address || '',
        bio: response.bio || '',
        display_name: response.display_name || '',
        contact_number: response.contact_number || '',
        email: response.email || '',
        role: response.role || '',
      })
    } catch (error) {
      console.error('Failed to fetch user:', error)
      toast.error('Failed to fetch user data')
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ✅ Only send allowed fields in the PATCH payload
    const payload = {
      full_name: userData.full_name,
      address: userData.address,
      bio: userData.bio,
      display_name: userData.display_name,
      contact_number: userData.contact_number,
    }

    try {
      await UpdateUser(payload)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update profile.')
    }
  }

  return (
    <form className="ps-form--account-settings" onSubmit={handleSubmit}>
      <Toaster position="top-center" />
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="full_name"
              className="form-control"
              type="text"
              value={userData.full_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Display Name</label>
            <input
              name="display_name"
              className="form-control"
              type="text"
              value={userData.display_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Contact Number</label>
            <input
              name="contact_number"
              className="form-control"
              type="text"
              value={userData.contact_number}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Address</label>
            <input
              name="address"
              className="form-control"
              type="text"
              value={userData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-sm-12">
          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              className="form-control"
              rows="4"
              value={userData.bio}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              className="form-control"
              type="text"
              value={userData.email}
              readOnly
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Role</label>
            <input
              name="role"
              className="form-control"
              type="text"
              value={userData.role}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="ps-form__submit text-center">
        <button
          className="ps-btn ps-btn--gray mr-3"
          type="button"
          onClick={fetchUserData}
        >
          Cancel
        </button>
        <button className="ps-btn success" type="submit">
          Update Profile
        </button>
      </div>
    </form>
  )
}

export default FormAccountSettings

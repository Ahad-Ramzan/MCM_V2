// components/BannerUploadPage.js
'use client'
import { createOrderBanner } from '@/apis/products'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import React, { useState } from 'react'
// import { createOrderBanner } from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'

const BannerUploadPage = ({ onSuccess }) => {
  const [imageFile, setImageFile] = useState(null)
  const [position, setPosition] = useState('')
  const [link, setLink] = useState('') // New state for link

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handlePositionChange = (e) => {
    setPosition(e.target.value)
  }

  const handleLinkChange = (e) => {
    // New handler for link
    setLink(e.target.value)
  }

  const handleBannerUpload = async () => {
    try {
      if (!imageFile || !position) {
        toast.error('Please select an image and enter a position')
        return
      }

      const formData = new FormData()
      formData.append('image', imageFile)
      formData.append('position', position)
      formData.append('link', link) // Add link to form data

      await createOrderBanner(formData)
      toast.success('Banner uploaded successfully')
      if (onSuccess) {
        onSuccess()
      }

      // Reset form
      setImageFile(null)
      setPosition('')
      setLink('')
    } catch (error) {
      toast.error('Error uploading banner')
      console.error('Error uploading banner:', error)
    }
  }

  return (
    <div className="container my-5">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="image-input">Select Image</label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="image-input"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label className="custom-file-label" htmlFor="image-input">
                {imageFile ? imageFile.name : 'Choose file'}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="position-input">Position</label>
            <input
              type="text"
              className="form-control"
              id="position-input"
              value={position}
              onChange={handlePositionChange}
              placeholder="Enter position (e.g., slider_1, top_1, home_1)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="link-input">Link (Optional)</label>
            <input
              type="text"
              className="form-control"
              id="link-input"
              value={link}
              onChange={handleLinkChange}
              placeholder="Enter link URL (e.g., https://example.com)"
            />
          </div>

          <div className="ps-section__actions">
            <button
              className="ps-btn"
              onClick={handleBannerUpload}
              disabled={!imageFile || !position}
            >
              <i className="icon icon-plus mr-2" />
              Add Banners
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerUploadPage

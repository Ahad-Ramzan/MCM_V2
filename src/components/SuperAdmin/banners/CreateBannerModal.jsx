// components/BannerUploadPage.js
'use client'
import { createOrderBanner } from '@/apis/products'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import React, { useState } from 'react'
// import { createOrderBanner } from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'

const BannerUploadPage = () => {
  const [imageFile, setImageFile] = useState(null)
  const [position, setPosition] = useState('')

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handlePositionChange = (e) => {
    setPosition(e.target.value)
  }

  const handleBannerUpload = async () => {
    try {
      if (!imageFile || !position) {
        toast.error('Please select an image and a position')
        return
      }

      const formData = new FormData()
      formData.append('image', imageFile)
      formData.append('position', position)

      await createOrderBanner(formData)
      toast.success('Banner uploaded successfully')
      setImageFile(null)
      setPosition('')
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
      <h1 className="mb-4">Upload Banner</h1>
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
            <label htmlFor="position-select">Select Position</label>
            <select
              className="form-control"
              id="position-select"
              value={position}
              onChange={handlePositionChange}
            >
              <option value="">Select a position</option>
              <option value="slider_1">Slider 1</option>
              <option value="slider_2">Slider 2</option>
              <option value="slider_3">Slider 3</option>
              <option value="top_1">Banner Top 1</option>
              <option value="top_2">Banner Top 2</option>
              <option value="home_1">Banner Home 1</option>
              <option value="home_2">Banner Home 2</option>
              <option value="home_3">Banner Home 3</option>
              <option value="footer_1">Banner Footer 1</option>
              <option value="footer_2">Banner Footer 2</option>
            </select>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleBannerUpload}
            disabled={!imageFile || !position}
          >
            Upload Banner
          </button>
        </div>
      </div>
    </div>
  )
}

export default BannerUploadPage

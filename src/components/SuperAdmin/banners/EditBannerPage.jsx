// components/SuperAdmin/banners/EditBannerPage.js
'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'

const EditBannerPage = ({ bannerData, onSuccess }) => {
  const [imageFile, setImageFile] = useState(null)
  const [position, setPosition] = useState(bannerData.position)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handlePositionChange = (e) => {
    setPosition(e.target.value)
  }

  const handleBannerUpdate = async () => {
    try {
      setIsLoading(true)
      const formData = new FormData()

      // Only append image if a new one was selected
      if (imageFile) {
        formData.append('image', imageFile)
      }
      formData.append('position', position)

      await axios.put(
        `https://backendmcm.estelatechnologies.com/api/orders/banners/${bannerData.id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      toast.success('Banner updated successfully')
      onSuccess()
    } catch (error) {
      toast.error('Error updating banner')
      console.error('Error updating banner:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container my-5">
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <h1 className="mb-4">Edit Banner</h1>
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <label>Current Image</label>
            <div className="mb-3">
              <img
                src={bannerData.image}
                alt="Current banner"
                width="200"
                className="img-thumbnail"
              />
            </div>
            <label htmlFor="image-input">Change Image</label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="image-input"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label className="custom-file-label" htmlFor="image-input">
                {imageFile ? imageFile.name : 'Choose new file (optional)'}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="position-select">Position</label>
            <select
              className="form-control"
              id="position-select"
              value={position}
              onChange={handlePositionChange}
            >
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

          <div className="ps-section__actions">
            <button
              className="ps-btn"
              onClick={handleBannerUpdate}
              disabled={isLoading}
            >
              {/* <i className="icon icon-plus mr-2" /> */}
              Update Banners
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditBannerPage

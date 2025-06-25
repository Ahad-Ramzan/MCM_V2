// components/SuperAdmin/banners/EditBannerPage.js
'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'

const EditBannerPage = ({ bannerData, onSuccess, onUpdated, onClose }) => {
  const [imageFile, setImageFile] = useState(null)
  const [position, setPosition] = useState('')
  const [link, setLink] = useState('') // New state for link
  const [isLoading, setIsLoading] = useState(false)

  // Set initial values from bannerData when component mounts or bannerData changes
  useEffect(() => {
    if (bannerData) {
      if (bannerData.position) setPosition(bannerData.position)
      if (bannerData.link) setLink(bannerData.link) // Set link from bannerData
    }

    // Cleanup function to reset state when component unmounts
    return () => {
      setImageFile(null)
      setPosition('')
      setLink('')
    }
  }, [bannerData])

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

  const handleBannerUpdate = async () => {
    try {
      setIsLoading(true)
      const formData = new FormData()

      // If a new image is selected, append it to formData
      if (imageFile) {
        formData.append('image', imageFile)
      } else if (bannerData.image) {
        // Handle existing image if no new image is selected
        try {
          const response = await fetch(bannerData.image)
          const blob = await response.blob()
          const fileName = bannerData.image.split('/').pop()
          const existingImageFile = new File([blob], fileName, {
            type: blob.type,
          })
          formData.append('image', existingImageFile)
        } catch (error) {
          console.error('Error fetching existing image:', error)
          formData.append('image_url', bannerData.image)
        }
      }

      formData.append('position', position)
      formData.append('link', link) // Add link to form data

      await axios.put(
        `https://backendmcm.estelatechnologies.com/api/orders/banners/${bannerData.id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      toast.success('Banner updated successfully!')
      onSuccess()
      onUpdated()
      handleClose()
    } catch (error) {
      toast.error('Error updating banner')
      console.error('Error updating banner:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    // Reset state when closing
    setImageFile(null)
    setPosition('')
    setLink('')
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="container my-5">
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
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
            <label htmlFor="link-input">Link</label>
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
              onClick={handleBannerUpdate}
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Banner'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditBannerPage

'use client'
import React, { useEffect, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { Modal } from 'antd'
import toast from 'react-hot-toast'

const EditBrandModal = ({ visible, onCancel, brandData, onUpdate }) => {
  const [formData, setFormData] = useState({ brand_name: '' })
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (brandData) {
      setFormData({
        brand_name: brandData.brand_name || '',
      })
      if (brandData.image) {
        setThumbnailPreview(brandData.image)
      }
    }
  }, [brandData])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file')
        return
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB')
        return
      }

      setThumbnail(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Create payload with the updated data
      const payload = {
        id: brandData.id,
        brand_name: formData.brand_name,
        // Only include image if it's changed
        ...(thumbnail && { image: thumbnail }),
        // If no thumbnail is selected but there was a previous image, include it
        ...(!thumbnail && brandData.image && { image: brandData.image }),
      }

      await onUpdate(payload)
      onCancel()
    } catch (error) {
      console.error('Failed to update brand:', error)
      toast.error('Failed to update brand.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={<span className="text-lg font-semibold">Edit Brand</span>}
      open={visible}
      onCancel={() => {
        onCancel()
        setThumbnail(null)
        setThumbnailPreview('')
      }}
      footer={null}
      width={600}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand Name *
          </label>
          <input
            type="text"
            name="brand_name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.brand_name}
            onChange={handleInputChange}
            placeholder="Enter brand name"
            required
          />
        </div>

        <div className="form-group mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand Logo
          </label>
          <div className="file-upload-wrapper">
            <label className="file-upload-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="file-upload-input"
              />
              <div className="file-upload-content">
                <FiUpload className="upload-icon text-blue-500 text-2xl mb-2" />
                <span className="block text-gray-600">
                  Click to upload brand logo
                </span>
                <span className="block text-xs text-gray-400 mt-1">
                  Recommended size: 300x300px
                </span>
              </div>
            </label>
          </div>
          {thumbnailPreview && (
            <div className="preview-container mt-4">
              <div className="image-preview inline-block border border-gray-200 rounded p-1">
                <img
                  src={thumbnailPreview}
                  alt="Brand logo preview"
                  className="img-thumbnail"
                  style={{
                    maxWidth: '150px',
                    maxHeight: '150px',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            className="ps-btn mt-3 mr-10"
            onClick={() => {
              onCancel()
              setThumbnail(null)
              setThumbnailPreview('')
            }}
          >
            Cancel
          </button>
          <button type="submit" className="ps-btn mt-3" disabled={loading}>
            {loading ? 'Updating...' : 'Update Brand'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .file-upload-wrapper {
          position: relative;
          margin-bottom: 1rem;
        }

        .file-upload-label {
          display: block;
          cursor: pointer;
        }

        .file-upload-input {
          position: absolute;
          left: -9999px;
          opacity: 0;
        }

        .file-upload-content {
          border: 2px dashed #d1d5db;
          border-radius: 0.5rem;
          padding: 2rem;
          text-align: center;
          transition: all 0.2s ease;
          background-color: #f9fafb;
        }

        .file-upload-content:hover {
          border-color: #3b82f6;
          background-color: #f0f9ff;
        }
      `}</style>
    </Modal>
  )
}

export default EditBrandModal

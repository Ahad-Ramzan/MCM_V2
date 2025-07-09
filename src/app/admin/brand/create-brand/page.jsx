'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrands } from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'

const CreateBrand = () => {
  const [brandName, setBrandName] = useState('')
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Create form data to handle file upload
    const formData = new FormData()
    formData.append('brand_name', brandName)
    if (image) {
      formData.append('image', image)
    }

    try {
      await createBrands(formData)
      toast.success('Brand created successfully!')
      router.push('/admin/brand')
    } catch (error) {
      toast.error(error.message || 'Failed to create brand.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ps-page ps-page--inner">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      <div className="ps-section--custom">
        <div className="container">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="mb-4 text-2xl font-bold">Create New Brand</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Enter brand name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition duration-200"
                      >
                        Choose Image
                      </label>
                    </div>
                    {previewImage && (
                      <div className="w-16 h-16 border rounded-md overflow-hidden">
                        <img
                          src={previewImage}
                          alt="Brand preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Upload a square logo for best results
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => router.push('/admin/brand')}
                    className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="mr-2">Creating...</span>
                        <i className="fas fa-spinner fa-spin"></i>
                      </>
                    ) : (
                      'Create Brand'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBrand

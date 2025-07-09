'use client'
import React, { useEffect, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import {
  deleteBrand,
  getAllBrands,
  createBrands,
  updateBrand,
} from '@/apis/products'
import TableBrandName from '@/components/SuperAdmin/shared/tables/TableBrandName'
import toast, { Toaster } from 'react-hot-toast'
import debounce from 'lodash.debounce'
import FormSearchSimple from '@/components/SuperAdmin/shared/forms/FormSearchSimple'
import { Modal } from 'antd'

const BrandPage = () => {
  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [brandName, setBrandName] = useState('')
  const [loading, setLoading] = useState(false)
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState('')

  const fetchData = async (page = 1, search = '') => {
    try {
      const response = await getAllBrands(page, search)
      setProductsData(response)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch brands:', error)
    }
  }

  const handleDeleteBrand = async (id) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      try {
        await deleteBrand(id)
        toast.success('Brand deleted successfully!')
        await fetchData()
      } catch (error) {
        console.error('Delete failed:', error)
        toast.error('Failed to delete brand.')
      }
    }
  }

  const handlePageChange = (page) => {
    fetchData(page, searchTerm)
  }

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      fetchData(1, searchTerm)
    }, 500)

    debouncedSearch()
    return () => debouncedSearch.cancel()
  }, [searchTerm])

  useEffect(() => {
    fetchData()
  }, [])

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file')
        return
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB')
        return
      }

      setThumbnail(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateBrand = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('brand_name', brandName)
      if (thumbnail) {
        formData.append('image', thumbnail)
      }

      await createBrands(formData)
      toast.success('Brand created successfully!')
      setIsModalVisible(false)
      setBrandName('')
      setThumbnail(null)
      setThumbnailPreview('')
      fetchData()
    } catch (error) {
      toast.error('Failed to create brand.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateBrand = async (updatedBrand) => {
    try {
      const formData = new FormData()
      formData.append('brand_name', updatedBrand.brand_name)
      if (updatedBrand.image) {
        formData.append('image', updatedBrand.image)
      }

      await updateBrand(updatedBrand.id, formData)
      toast.success('Brand updated successfully!')
      fetchData()
    } catch (error) {
      console.error('Failed to update brand:', error)
      toast.error('Failed to update brand.')
    }
  }

  const totalPages = Math.ceil(productsData.count / 10)

  return (
    <ContainerDefault title="Brands">
      <HeaderDashboard title="Brands" description="Lists of Brands" />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <button className="ps-btn" onClick={() => setIsModalVisible(true)}>
            <i className="icon icon-plus mr-2" />
            Add Brand
          </button>
        </div>

        <div className="ps-section__header">
          <FormSearchSimple onSearchChange={(value) => setSearchTerm(value)} />
        </div>

        <div className="ps-section__content">
          <TableBrandName
            productsData={productsData.results}
            onDelete={handleDeleteBrand}
            onUpdateBrand={handleUpdateBrand}
          />
        </div>

        <div className="ps-section__footer">
          <p className="text-gray-600">
            Showing {productsData.results.length} of {productsData.count} brands
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      {/* Brand Creation Modal */}
      <Modal
        title={<span className="text-lg font-semibold">Create New Brand</span>}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          setBrandName('')
          setThumbnail(null)
          setThumbnailPreview('')
        }}
        footer={null}
        width={600}
      >
        <form onSubmit={handleCreateBrand}>
          <div className="form-group">
            <label>Brand Name *</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter brand name"
              required
            />
          </div>

          <div className="form-group mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Logo *
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
                setIsModalVisible(false)
                setBrandName('')
                setThumbnail(null)
                setThumbnailPreview('')
              }}
            >
              Cancel
            </button>
            <button type="submit" className="ps-btn mt-3" disabled={loading}>
              {loading ? 'Creating...' : 'Create Brand'}
            </button>
          </div>
        </form>
      </Modal>

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
    </ContainerDefault>
  )
}

export default BrandPage

'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import {
  createProducts,
  getAllCategories,
  getBrandAllData,
  getCategoriesAllData,
} from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'
import { FiUpload, FiX, FiImage, FiVideo } from 'react-icons/fi'

// Initial state for form
const initialFormState = {
  name: '',
  reference: '',
  summary: '',
  regularPrice: '',
  salePrice: '',
  saleQuantity: '',
  soldItems: '',
  stock: '',
  description: '',
  thumbnail: null,
  gallery: [],
  video: null,
  sku: '',
  brand: '',
  category: '',
}

const CreateProductPage = () => {
  const [formData, setFormData] = useState(initialFormState)
  const [categories, setCategories] = useState([])
  const [brand, setBrandsData] = useState([])
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [galleryPreview, setGalleryPreview] = useState([])
  const [videoPreview, setVideoPreview] = useState(null)
  const [activeTab, setActiveTab] = useState('general')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const fetchAllCategories = async () => {
    try {
      const response = await getCategoriesAllData()
      setCategories(response)
    } catch (error) {
      throw new Error('failed to fetch data')
    }
  }

  const fetchBrandsData = async () => {
    try {
      const response = await getBrandAllData()
      setBrandsData(response)
    } catch (error) {
      throw new Error('failed to fetch the data')
    }
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFormData((prev) => ({ ...prev, thumbnail: file }))

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setThumbnailPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleGalleryChange = (e) => {
    const files = e.target.files
    if (!files.length) return

    // Limit to 4 images
    const selectedFiles = Array.from(files).slice(0, 4 - galleryPreview.length)
    if (selectedFiles.length === 0) {
      toast.error('You can upload maximum 4 images')
      return
    }

    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...selectedFiles],
    }))

    // Create previews
    const newPreviews = []
    selectedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        newPreviews.push(reader.result)
        if (newPreviews.length === selectedFiles.length) {
          setGalleryPreview((prev) => [...prev, ...newPreviews])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeGalleryImage = (index) => {
    const newGallery = [...formData.gallery]
    const newPreviews = [...galleryPreview]

    newGallery.splice(index, 1)
    newPreviews.splice(index, 1)

    setFormData((prev) => ({ ...prev, gallery: newGallery }))
    setGalleryPreview(newPreviews)
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFormData((prev) => ({ ...prev, video: file }))

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setVideoPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.reference || !formData.regularPrice) {
      toast.error('Please fill all required fields.')
      return
    }

    const productData = new FormData()

    productData.append('product_name', formData.name)
    productData.append('reference', formData.reference)
    productData.append('regular_price', parseFloat(formData.regularPrice))
    productData.append('sale_price', parseFloat(formData.salePrice))
    productData.append('sale_quantity', parseInt(formData.saleQuantity))
    productData.append('sold_items', parseInt(formData.soldItems))
    productData.append('stock', parseInt(formData.stock))
    productData.append('product_summary', formData.summary)
    productData.append('product_description', formData.description)
    productData.append('SKU', formData.sku)
    productData.append('brand', parseInt(formData.brand))
    productData.append('category', parseInt(formData.category))

    // Append thumbnail
    if (formData.thumbnail) {
      productData.append('product_thumbnail', formData.thumbnail)
    }

    // Append gallery
    if (formData.gallery.length > 0) {
      Array.from(formData.gallery).forEach((file, index) => {
        productData.append(`product_gallery`, file)
      })
    }

    // Append video
    if (formData.video) {
      productData.append('product_video', formData.video)
    }

    try {
      const response = await createProducts(productData)
      toast.success('Product created successfully!')
      setFormData(initialFormState)
      setThumbnailPreview(null)
      setGalleryPreview([])
      setVideoPreview(null)
    } catch (error) {
      toast.error('Failed to create product.')
    }
  }

  useEffect(() => {
    fetchAllCategories()
    fetchBrandsData()
  }, [])

  return (
    <ContainerDefault title="Create new product">
      <HeaderDashboard
        title="Create Product"
        description="Martfury Create New Product"
      />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      <section className="ps-new-item">
        <form
          className="ps-form ps-form--new-product"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* Tab Navigation */}
          <div className="ps-form__tabs mb-4">
            <div className="nav nav-tabs" role="tablist">
              <button
                className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}
                type="button"
              >
                General
              </button>
              <button
                className={`nav-link ${activeTab === 'images' ? 'active' : ''}`}
                onClick={() => setActiveTab('images')}
                type="button"
              >
                Product Images
              </button>
              <button
                className={`nav-link ${activeTab === 'meta' ? 'active' : ''}`}
                onClick={() => setActiveTab('meta')}
                type="button"
              >
                Meta
              </button>
            </div>
          </div>

          <div className="ps-form__content">
            {/* General Tab Content */}
            <div
              className={`tab-pane fade ${
                activeTab === 'general' ? 'show active' : 'd-none'
              }`}
            >
              <figure className="ps-block--form-box">
                <div className="ps-block__content">
                  {[
                    { label: 'Product Name', name: 'name' },
                    { label: 'Reference', name: 'reference' },
                    { label: 'Regular Price', name: 'regularPrice' },
                    { label: 'Sale Price', name: 'salePrice' },
                    { label: 'Sale Quantity', name: 'saleQuantity' },
                    { label: 'Sold Items', name: 'soldItems' },
                    { label: 'stock', name: 'stock' },
                    { label: 'SKU', name: 'sku' },
                  ].map(({ label, name }) => (
                    <div className="form-group" key={name}>
                      <label>{label} *</label>
                      <input
                        className="form-control"
                        type="text"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                  <div className="form-group">
                    <label>Product Summary *</label>
                    <textarea
                      className="form-control"
                      name="summary"
                      rows="3"
                      value={formData.summary}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Product Description *</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="6"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </figure>
            </div>

            {/* Product Images Tab Content */}
            <div
              className={`tab-pane fade ${
                activeTab === 'images' ? 'show active' : 'd-none'
              }`}
            >
              <figure className="ps-block--form-box">
                <div className="ps-block__content">
                  {/* Thumbnail Upload */}
                  <div className="form-group">
                    <label className="d-block mb-2">Thumbnail *</label>
                    <div className="file-upload-wrapper">
                      <label className="file-upload-label">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailChange}
                          className="file-upload-input"
                        />
                        <div className="file-upload-content">
                          <FiUpload className="upload-icon" />
                          <span>Click to upload thumbnail</span>
                        </div>
                      </label>
                    </div>
                    {thumbnailPreview && (
                      <div className="preview-container mt-3">
                        <div className="image-preview">
                          <img
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            className="img-thumbnail"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gallery Upload */}
                  <div className="form-group">
                    <label className="d-block mb-2">
                      Gallery (Max 4 images)
                    </label>
                    <div className="file-upload-wrapper">
                      <label className="file-upload-label">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryChange}
                          className="file-upload-input"
                          disabled={galleryPreview.length >= 4}
                        />
                        <div className="file-upload-content">
                          <FiImage className="upload-icon" />
                          <span>
                            {galleryPreview.length >= 4
                              ? 'Maximum 4 images reached'
                              : `Click to upload images (${galleryPreview.length}/4)`}
                          </span>
                        </div>
                      </label>
                    </div>
                    {galleryPreview.length > 0 && (
                      <div className="gallery-preview mt-3">
                        <div className="row">
                          {galleryPreview.map((src, index) => (
                            <div
                              className="col-3 mb-2 position-relative"
                              key={index}
                            >
                              <img
                                src={src}
                                alt={`Gallery preview ${index}`}
                                className="img-thumbnail w-100"
                                style={{ height: '80px', objectFit: 'cover' }}
                              />
                              <button
                                type="button"
                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                style={{ transform: 'translate(30%, -30%)' }}
                                onClick={() => removeGalleryImage(index)}
                              >
                                <FiX />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Video Upload */}
                  <div className="form-group">
                    <label className="d-block mb-2">Product Video</label>
                    <div className="file-upload-wrapper">
                      <label className="file-upload-label">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoChange}
                          className="file-upload-input"
                        />
                        <div className="file-upload-content">
                          <FiVideo className="upload-icon" />
                          <span>Click to upload video</span>
                        </div>
                      </label>
                    </div>
                    {videoPreview && (
                      <div className="preview-container mt-3">
                        <video
                          controls
                          className="img-thumbnail w-100"
                          style={{ maxHeight: '200px' }}
                        >
                          <source src={videoPreview} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>
                </div>
              </figure>
            </div>

            {/* Meta Tab Content */}
            <div
              className={`tab-pane fade ${
                activeTab === 'meta' ? 'show active' : 'd-none'
              }`}
            >
              <figure className="ps-block--form-box">
                <div className="ps-block__content">
                  <div className="form-group">
                    <label>Brand</label>
                    <select
                      className="form-control"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                    >
                      <option value="">Select brand</option>
                      {brand &&
                        brand.map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand.brand_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      className="form-control"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </figure>
            </div>
          </div>

          {/* Bottom buttons - always visible */}
          <div className="ps-form__bottom mt-4">
            <a className="ps-btn ps-btn--black" href="/products">
              Back
            </a>
            <button type="button" className="ps-btn ps-btn--gray">
              Cancel
            </button>
            <button type="submit" className="ps-btn">
              Submit
            </button>
          </div>
        </form>
      </section>

      <style jsx>{`
        .ps-form__tabs {
          border-bottom: 1px solid #dee2e6;
        }
        .nav-tabs {
          display: flex;
          flex-wrap: wrap;
          padding-left: 0;
          margin-bottom: 0;
          list-style: none;
        }
        .nav-link {
          padding: 0.5rem 1rem;
          border: 1px solid transparent;
          border-top-left-radius: 0.25rem;
          border-top-right-radius: 0.25rem;
          color: #495057;
          cursor: pointer;
          margin-bottom: -1px;
          background: none;
          border: none;
          font-weight: 500;
        }
        .nav-link:hover {
          border-color: #e9ecef #e9ecef #dee2e6;
          color: #0056b3;
        }
        .nav-link.active {
          color: #0056b3;
          background-color: #fff;
          border-color: #dee2e6 #dee2e6 #fff;
          border-bottom: 2px solid #0056b3;
        }
        .file-upload-wrapper {
          position: relative;
          margin-bottom: 1rem;
        }
        .file-upload-input {
          opacity: 0;
          position: absolute;
          width: 1px;
          height: 1px;
        }
        .file-upload-label {
          display: block;
          padding: 1.5rem;
          border: 2px dashed #ddd;
          border-radius: 5px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        .file-upload-label:hover {
          border-color: #3498db;
          background-color: #f8f9fa;
        }
        .file-upload-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #6c757d;
        }
        .upload-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .preview-container {
          border: 1px solid #eee;
          padding: 10px;
          border-radius: 5px;
          background: #f9f9f9;
        }
        .image-preview img {
          max-width: 100%;
          max-height: 200px;
          display: block;
        }
        .gallery-preview {
          border: 1px solid #eee;
          padding: 10px;
          border-radius: 5px;
          background: #f9f9f9;
        }
      `}</style>
    </ContainerDefault>
  )
}

export default CreateProductPage

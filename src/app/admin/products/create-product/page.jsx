'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import {
  createProducts,
  getAllCategories,
  getBrandAllData,
  getCategoriesAllData,
  getSubCategoriesAllData,
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

const CreateProductPage = ({ onSuccess }) => {
  const [formData, setFormData] = useState(initialFormState)
  const [categories, setCategories] = useState([])
  const [brand, setBrandsData] = useState([])
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [galleryPreview, setGalleryPreview] = useState([])
  const [videoPreview, setVideoPreview] = useState(null)
  const [activeTab, setActiveTab] = useState('general')
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([])
  const [expandedNodes, setExpandedNodes] = useState({})
  const [subcategories, setAllSubCategories] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const fetchAllCategories = async () => {
    try {
      const response = await getCategoriesAllData()
      setCategories(response)
    } catch (error) {
      throw new Error('Failed to fetch categories')
    }
  }

  const fetchBrandsData = async () => {
    try {
      const response = await getBrandAllData()
      setBrandsData(response)
    } catch (error) {
      throw new Error('Failed to fetch brands')
    }
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFormData((prev) => ({ ...prev, thumbnail: file }))

    const reader = new FileReader()
    reader.onload = () => {
      setThumbnailPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleGalleryChange = (e) => {
    const files = e.target.files
    if (!files.length) return

    const selectedFiles = Array.from(files).slice(0, 4 - galleryPreview.length)
    if (selectedFiles.length === 0) {
      toast.error('You can upload a maximum of 4 images')
      return
    }

    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...selectedFiles],
    }))

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

    const reader = new FileReader()
    reader.onload = () => {
      setVideoPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleClose = () => {
    if (onSuccess) onSuccess()
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
    // productData.append('category', formData.category)

    // Append subcategories
    if (selectedSubCategoryIds.length > 0) {
      selectedSubCategoryIds.forEach((id) => {
        productData.append('sub_categories', id) // Append selected subcategory IDs
      })
    }

    // Append thumbnail
    if (formData.thumbnail) {
      productData.append('product_thumbnail', formData.thumbnail)
    }

    // Append gallery
    if (formData.gallery.length > 0) {
      Array.from(formData.gallery).forEach((file) => {
        productData.append('product_gallery', file)
      })
    }

    // Append video
    if (formData.video) {
      productData.append('product_video', formData.video)
    }

    try {
      const response = await createProducts(productData)
      toast.success('Product created successfully!')
      if (onSuccess) {
        onSuccess()
      }
      setFormData(initialFormState)
      setThumbnailPreview(null)
      setGalleryPreview([])
      setVideoPreview(null)
      setSelectedSubCategoryIds([]) // Reset selected subcategories
    } catch (error) {
      toast.error('Failed to create product.')
    }
  }

  const collectAllChildIds = (node) => {
    let ids = [node.id]
    if (node.children) {
      node.children.forEach((child) => {
        ids = ids.concat(collectAllChildIds(child))
      })
    }
    return ids
  }

  const findParentIds = (node, id) => {
    if (node.children) {
      for (const child of node.children) {
        if (child.id === id) {
          return [node.id] // Return parent ID
        }
        const parentIds = findParentIds(child, id)
        if (parentIds.length) return [node.id, ...parentIds]
      }
    }
    return []
  }

  const handleCheckboxChange = (category) => {
    // Check if this is a top-level category (parent category)
    const isParentCategory = categories.some((cat) => cat.id === category.id)

    if (isParentCategory) {
      // For parent categories, just update the main category field
      setFormData((prev) => ({
        ...prev,
        category: category.id.toString(),
      }))
      // Remove any subcategories that might belong to this parent
      const subCategoryIdsToRemove = collectAllChildIds(category)
      setSelectedSubCategoryIds((prev) =>
        prev.filter((id) => !subCategoryIdsToRemove.includes(id))
      )
    } else {
      // For subcategories, use the existing logic
      const allChildIds = collectAllChildIds(category)
      const parentPathIds = subcategories.flatMap(
        (cat) => findParentIds(cat, category.id) || []
      )

      const alreadySelected = allChildIds.every((id) =>
        selectedSubCategoryIds.includes(id)
      )

      if (alreadySelected) {
        setSelectedSubCategoryIds((prev) =>
          prev.filter(
            (id) => !allChildIds.includes(id) && !parentPathIds.includes(id)
          )
        )
      } else {
        setSelectedSubCategoryIds((prev) =>
          Array.from(new Set([...prev, ...allChildIds, ...parentPathIds]))
        )
      }
    }
  }

  const toggleExpand = (id) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const renderCategoryTree = (nodes) => {
    return nodes.map((cat) => {
      const isParentCategory = categories.some((c) => c.id === cat.id)
      const isChecked = isParentCategory
        ? formData.category === cat.id.toString()
        : selectedSubCategoryIds.includes(cat.id)

      const hasChildren = cat.sub_categories && cat.sub_categories.length > 0
      const isExpanded = expandedNodes[cat.id]

      return (
        <div key={cat.id} style={{ marginLeft: '20px', marginBottom: '5px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                flex: 1,
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheckboxChange(cat)}
              />
              {cat.name}
            </label>

            {hasChildren && (
              <span
                onClick={() => toggleExpand(cat.id)}
                style={{
                  cursor: 'pointer',
                  fontSize: '14px',
                  userSelect: 'none',
                }}
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            )}
          </div>

          {/* Render sub_categories if expanded */}
          {hasChildren && isExpanded && (
            <div style={{ marginLeft: '20px' }}>
              {cat.sub_categories.map((subCat) => {
                const hasSubChildren =
                  subCat.children && subCat.children.length > 0
                const isSubExpanded = expandedNodes[subCat.id]

                return (
                  <div
                    key={subCat.id}
                    style={{ marginLeft: '20px', marginBottom: '5px' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          flex: 1,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubCategoryIds.includes(subCat.id)}
                          onChange={() => handleCheckboxChange(subCat)}
                        />
                        {subCat.name}
                      </label>

                      {hasSubChildren && (
                        <span
                          onClick={() => toggleExpand(subCat.id)}
                          style={{
                            cursor: 'pointer',
                            fontSize: '14px',
                            userSelect: 'none',
                          }}
                          title={isSubExpanded ? 'Collapse' : 'Expand'}
                        >
                          {isSubExpanded ? (
                            <FaChevronDown />
                          ) : (
                            <FaChevronRight />
                          )}
                        </span>
                      )}
                    </div>

                    {/* Render children if sub category is expanded */}
                    {hasSubChildren && isSubExpanded && (
                      <div style={{ marginLeft: '20px' }}>
                        {renderCategoryTree(subCat.children)}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )
    })
  }

  const fetchAllData = async (page = 1, search = '') => {
    try {
      const response = await getSubCategoriesAllData(page, search)
      setAllSubCategories(response) // Store in state
    } catch (error) {
      console.error('Failed to fetch subcategories:', error)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  useEffect(() => {
    fetchAllCategories()
    fetchBrandsData()
  }, [])

  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
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
                  <div className="row">
                    {/* First Column */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Product Name *</label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Regular Price *</label>
                        <input
                          className="form-control"
                          type="text"
                          name="regularPrice"
                          value={formData.regularPrice}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Sale Quantity</label>
                        <input
                          className="form-control"
                          type="text"
                          name="saleQuantity"
                          value={formData.saleQuantity}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Stock</label>
                        <input
                          className="form-control"
                          type="text"
                          name="stock"
                          value={formData.stock}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Second Column */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Reference *</label>
                        <input
                          className="form-control"
                          type="text"
                          name="reference"
                          value={formData.reference}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Sale Price</label>
                        <input
                          className="form-control"
                          type="text"
                          name="salePrice"
                          value={formData.salePrice}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Sold Items</label>
                        <input
                          className="form-control"
                          type="text"
                          name="soldItems"
                          value={formData.soldItems}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>SKU</label>
                        <input
                          className="form-control"
                          type="text"
                          name="sku"
                          value={formData.sku}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Full-width textareas */}
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
                  {/* <div className="form-group">
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
                  </div> */}

                  <div className="form-group">
                    <label>Select Categories & Sub-Categories</label>
                    <div
                      style={{
                        border: '1px solid #e5e5e5',
                        padding: '10px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                      }}
                    >
                      {renderCategoryTree(categories)}
                    </div>
                  </div>
                </div>
              </figure>
            </div>
          </div>

          {/* Bottom buttons - always visible */}
          <div className="ps-form__bottom mt-4">
            <button
              type="button"
              className="ps-btn ps-btn--gray"
              onClick={handleClose}
            >
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
        .form-group {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  )
}

export default CreateProductPage

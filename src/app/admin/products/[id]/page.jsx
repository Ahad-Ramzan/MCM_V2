'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  getBrandAllData,
  getCategoriesAllData,
  getProductsById,
  updateProducts,
  getSubCategoriesAllData,
} from '@/apis/products'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import toast, { Toaster } from 'react-hot-toast'
import { FiUpload, FiX, FiImage, FiVideo } from 'react-icons/fi'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'

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

const EditProductPage = ({ productId, onUpdate }) => {
  const router = useRouter()
  const [formData, setFormData] = useState(initialFormState)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [galleryPreview, setGalleryPreview] = useState([])
  const [videoPreview, setVideoPreview] = useState(null)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [activeTab, setActiveTab] = useState('general')
  const [subcategories, setSubCategories] = useState([])
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([])
  const [expandedNodes, setExpandedNodes] = useState({})

  const fetchAllCategories = async () => {
    try {
      const response = await getCategoriesAllData()
      setCategories(response)
    } catch (error) {
      toast.error('Failed to fetch categories')
      console.error(error)
    }
  }

  const fetchSubCategories = async () => {
    try {
      const response = await getSubCategoriesAllData()
      setSubCategories(response)
    } catch (error) {
      toast.error('Failed to fetch subcategories')
      console.error(error)
    }
  }

  const fetchBrandsData = async () => {
    try {
      const response = await getBrandAllData()
      setBrands(response)
    } catch (error) {
      toast.error('Failed to fetch brands')
      console.error(error)
    }
  }

  const handleClose = () => {
    if (onUpdate) onUpdate()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFormData((prev) => ({ ...prev, thumbnail: file }))

    const reader = new FileReader()
    reader.onload = () => setThumbnailPreview(reader.result)
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

    setVideoPreview(null)
    setFormData((prev) => ({ ...prev, video: file }))

    const reader = new FileReader()
    reader.onload = () => setVideoPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const removeVideo = () => {
    setFormData((prev) => ({ ...prev, video: null }))
    setVideoPreview(null)
  }

  const handleCheckboxChange = (category) => {
    // Check if this is a top-level category
    const isParentCategory = categories.some((cat) => cat.id === category.id)

    if (isParentCategory) {
      // For parent categories, update the main category field
      setFormData((prev) => ({
        ...prev,
        category:
          prev.category === category.id.toString()
            ? ''
            : category.id.toString(),
      }))
      // Clear any subcategories that might belong to this parent
      const subCategoryIdsToRemove = collectAllChildIds(category)
      setSelectedSubCategoryIds((prev) =>
        prev.filter((id) => !subCategoryIdsToRemove.includes(id))
      )
    } else {
      // For subcategories, use the existing logic
      const allChildIds = collectAllChildIds(category)
      const alreadySelected = allChildIds.every((id) =>
        selectedSubCategoryIds.includes(id)
      )

      if (alreadySelected) {
        setSelectedSubCategoryIds((prev) =>
          prev.filter((id) => !allChildIds.includes(id))
        )
      } else {
        setSelectedSubCategoryIds((prev) => [
          ...new Set([...prev, ...allChildIds]),
        ])
      }
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

          {hasChildren && isExpanded && (
            <div style={{ marginLeft: '20px' }}>
              {cat.sub_categories.map((subCat) => {
                const hasSubChildren =
                  subCat.children && subCat.children.length > 0
                const isSubExpanded = expandedNodes[subCat.id]
                const isSubChecked = selectedSubCategoryIds.includes(subCat.id)

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
                          checked={isSubChecked}
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
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.reference || !formData.regularPrice) {
      toast.error('Please fill all required fields.')
      return
    }

    const productData = new FormData()
    productData.append('product_name', formData.name)
    productData.append('reference', formData.reference)
    productData.append('regular_price', parseFloat(formData.regularPrice))
    productData.append('sale_price', parseFloat(formData.salePrice || 0))
    productData.append('sale_quantity', parseInt(formData.saleQuantity || 0))
    productData.append('sold_items', parseInt(formData.soldItems || 0))
    productData.append('stock', parseInt(formData.stock || 0))
    productData.append('product_summary', formData.summary || '')
    productData.append('product_description', formData.description || '')
    productData.append('SKU', formData.sku || '')
    productData.append('brand', formData.brand || '')
    productData.append('category', formData.category || '')

    // Handle thumbnail
    if (formData.thumbnail) {
      productData.append('product_thumbnail', formData.thumbnail)
    }

    // Append selected subcategories
    selectedSubCategoryIds.forEach((id) => {
      productData.append('sub_categories[]', id)
    })

    // Handle gallery
    if (galleryPreview?.length > 0) {
      const existingGallery = galleryPreview.filter(
        (img) => typeof img === 'string'
      )
      if (existingGallery.length > 0) {
        productData.append('existing_gallery', JSON.stringify(existingGallery))
      }
    }
    if (formData.gallery?.length > 0) {
      formData.gallery.forEach((file) => {
        productData.append('product_gallery', file)
      })
    }

    // Handle video - only if exists
    if (formData.video) {
      productData.append('product_video', formData.video)
    }

    try {
      const loadingToast = toast.loading('Updating product...')
      const response = await updateProducts(productId, productData)

      if (!response || response.error) {
        throw new Error(response?.message || 'Failed to update product')
      }

      toast.dismiss(loadingToast)
      toast.success('Product updated successfully!')
      onUpdate?.()
      router.push('/admin/products')
    } catch (error) {
      console.error('Update error:', error)
      toast.error(error.message || 'Failed to update product.')
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setThumbnailPreview(null)
        setGalleryPreview([])
        setVideoPreview(null)

        const data = await getProductsById(productId)
        const galleryUrls = data.gallery?.map((item) => item.image) || []

        setFormData({
          name: data.product_name || '',
          reference: data.reference || '',
          summary: data.product_summary || '',
          regularPrice: data.regular_price || '',
          salePrice: data.sale_price || '',
          saleQuantity: data.sale_quantity || '',
          soldItems: data.sold_items || '',
          stock: data.stock || '',
          description: data.product_description || '',
          thumbnail: null,
          gallery: [],
          video: null,
          sku: data.SKU || '',
          brand: data.brand?.toString() || '',
          category: data.category?.toString() || '',
        })

        if (data.product_thumbnail) setThumbnailPreview(data.product_thumbnail)
        if (galleryUrls.length > 0) setGalleryPreview(galleryUrls)
        if (data.product_video) setVideoPreview(data.product_video)

        // Set selected subcategories
        if (data.sub_categories && data.sub_categories.length > 0) {
          setSelectedSubCategoryIds(
            data.sub_categories.map((id) => id.toString())
          )
        }

        // Expand parent category if it exists
        if (data.category) {
          setExpandedNodes((prev) => ({
            ...prev,
            [data.category]: true,
          }))
        }
      } catch (err) {
        toast.error('Failed to fetch product')
        console.error(err)
      }
    }

    fetchProduct()
    fetchAllCategories()
    fetchBrandsData()
    fetchSubCategories()
  }, [productId])

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
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
            className={`tab-pane fade ${activeTab === 'general' ? 'show active' : 'd-none'}`}
          >
            <figure className="ps-block--form-box">
              <div className="ps-block__content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Product Name *</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Regular Price *</label>
                      <input
                        className="form-control"
                        type="number"
                        name="regularPrice"
                        value={formData.regularPrice}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="form-group">
                      <label>Sale Quantity</label>
                      <input
                        className="form-control"
                        type="number"
                        name="saleQuantity"
                        value={formData.saleQuantity}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>
                    <div className="form-group">
                      <label>Stock</label>
                      <input
                        className="form-control"
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Reference *</label>
                      <input
                        className="form-control"
                        type="text"
                        name="reference"
                        value={formData.reference}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Sale Price</label>
                      <input
                        className="form-control"
                        type="number"
                        name="salePrice"
                        value={formData.salePrice}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="form-group">
                      <label>Sold Items</label>
                      <input
                        className="form-control"
                        type="number"
                        name="soldItems"
                        value={formData.soldItems}
                        onChange={handleChange}
                        min="0"
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
                <div className="form-group">
                  <label>Product Summary</label>
                  <textarea
                    className="form-control"
                    name="summary"
                    rows="3"
                    value={formData.summary}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Product Description</label>
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
            className={`tab-pane fade ${activeTab === 'images' ? 'show active' : 'd-none'}`}
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
                      <img
                        src={
                          typeof thumbnailPreview === 'string'
                            ? thumbnailPreview
                            : URL.createObjectURL(thumbnailPreview)
                        }
                        alt="Thumbnail preview"
                        className="img-thumbnail"
                      />
                    </div>
                  )}
                </div>

                {/* Gallery Upload */}
                <div className="form-group">
                  <label className="d-block mb-2">Gallery (Max 4 images)</label>
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
                              src={
                                typeof src === 'string'
                                  ? src
                                  : URL.createObjectURL(src)
                              }
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
                    <div className="preview-container mt-3 position-relative">
                      <video
                        controls
                        className="img-thumbnail w-100"
                        style={{ maxHeight: '200px' }}
                      >
                        <source
                          src={
                            typeof videoPreview === 'string'
                              ? videoPreview
                              : URL.createObjectURL(videoPreview)
                          }
                          type="video/mp4"
                        />
                      </video>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute top-0 end-0"
                        style={{ transform: 'translate(30%, -30%)' }}
                        onClick={removeVideo}
                      >
                        <FiX />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </figure>
          </div>

          {/* Meta Tab Content */}
          <div
            className={`tab-pane fade ${activeTab === 'meta' ? 'show active' : 'd-none'}`}
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
                    {brands.map((brand) => (
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

        {/* Bottom buttons */}
        <div className="ps-form__bottom mt-4">
          <button
            type="button"
            className="ps-btn ps-btn--gray"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button type="submit" className="ps-btn">
            Update Product
          </button>
        </div>
      </form>

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
        .gallery-preview {
          border: 1px solid #eee;
          padding: 10px;
          border-radius: 5px;
          background: #f9f9f9;
        }
      `}</style>
    </>
  )
}

export default EditProductPage

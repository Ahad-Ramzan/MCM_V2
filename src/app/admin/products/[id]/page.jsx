'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  getBrandAllData,
  getCategoriesAllData,
  getProductsById,
  updateProducts,
} from '@/apis/products'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import toast, { Toaster } from 'react-hot-toast'
import { FiUpload, FiX, FiImage, FiVideo } from 'react-icons/fi'

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
  // status: '',
  brand: '',
  // tags: '',
  category: '',
}

const EditProductPage = () => {
  const { id } = useParams()
  console.log(id, 'prodid')
  const router = useRouter()
  const [formData, setFormData] = useState(initialFormState)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [galleryPreview, setGalleryPreview] = useState([])
  const [videoPreview, setVideoPreview] = useState(null)
  const [categories, setCategories] = useState([])
  const [brand, setBrandsData] = useState([])

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductsById(id)
        console.log(data, 'prod data')

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
          // status: data.status?.toString() || '',
          brand: data.brand?.toString() || '',
          // tags: data.tags || '',
          category: data.category?.toString() || '',
        })
      } catch (err) {
        toast.error('Failed to fetch product')
        console.error(err)
      }
    }

    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e, fieldName, isMultiple = false) => {
    const files = e.target.files
    if (!files.length) return
    if (isMultiple) {
      setFormData((prev) => ({ ...prev, [fieldName]: files }))
    } else {
      setFormData((prev) => ({ ...prev, [fieldName]: files[0] }))
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
    // productData.append('status', formData.status)
    productData.append('brand', formData.brand)
    productData.append('category', formData.category)
    // productData.append('tags', formData.tags)

    if (formData.thumbnail) {
      productData.append('product_thumbnail', formData.thumbnail)
    }

    if (formData.gallery.length > 0) {
      Array.from(formData.gallery).forEach((file) => {
        productData.append('product_gallery', file)
      })
    }

    if (formData.video) {
      productData.append('product_video', formData.video)
    }

    try {
      const response = await updateProducts(id, productData)
      toast.success('Product updated successfully!')
      router.push('/admin/products')
    } catch (error) {
      toast.error('Failed to update product.')
      // console.error(error)
    }
  }

  useEffect(() => {
    fetchAllCategories()
    fetchBrandsData()
  }, [])

  return (
    <ContainerDefault title="Edit Product">
      <HeaderDashboard
        title="Edit Product"
        description="Update product details"
      />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000, // default for all toasts
        }}
      />
      <form
        className="ps-form ps-form--new-product"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="ps-form__content">
          <div className="row">
            {/* Left Side */}
            <div className="col-xl-6 col-lg-6 col-md-12">
              <figure className="ps-block--form-box">
                <figcaption>General</figcaption>
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
                    // { label: 'Tags', name: 'tags' },
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

            {/* Right Side */}
            <div className="col-xl-6 col-lg-6 col-md-12">
              <figure className="ps-block--form-box">
                <figcaption>Product Images</figcaption>
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

              <figure className="ps-block--form-box">
                <figcaption>Meta</figcaption>
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

          <div className="form-group submit">
            <button type="submit" className="ps-btn ps-btn--fullwidth">
              Update Product
            </button>
          </div>
        </div>
      </form>
      <style jsx>{`
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

export default EditProductPage

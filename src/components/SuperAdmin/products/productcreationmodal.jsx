import React, { useState } from 'react'
import { Modal } from 'antd'
import { FiUpload, FiX, FiImage, FiVideo } from 'react-icons/fi'
import toast from 'react-hot-toast'

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

const ProductCreationModal = ({
  visible,
  onCancel,
  onSubmit,
  brands,
  categories,
}) => {
  const [formData, setFormData] = useState(initialFormState)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [galleryPreview, setGalleryPreview] = useState([])
  const [videoPreview, setVideoPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Modal
      title="Create New Product"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width="80%"
      style={{ top: 20 }}
    >
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-row">
          <div className="form-group col-md-4">
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
          <div className="form-group col-md-4">
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
          <div className="form-group col-md-4">
            <label>SKU *</label>
            <input
              className="form-control"
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label>Regular Price *</label>
            <input
              className="form-control"
              type="number"
              name="regularPrice"
              value={formData.regularPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label>Sale Price</label>
            <input
              className="form-control"
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Sale Quantity</label>
            <input
              className="form-control"
              type="number"
              name="saleQuantity"
              value={formData.saleQuantity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label>Stock *</label>
            <input
              className="form-control"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label>Sold Items</label>
            <input
              className="form-control"
              type="number"
              name="soldItems"
              value={formData.soldItems}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Product Summary *</label>
            <textarea
              className="form-control"
              name="summary"
              rows="3"
              value={formData.summary}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-12">
            <label>Product Description *</label>
            <textarea
              className="form-control"
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label className="d-block mb-2">Thumbnail *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="form-control-file"
              required
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail"
                className="img-thumbnail mt-2"
              />
            )}
          </div>

          <div className="form-group col-md-4">
            <label className="d-block mb-2">Gallery (Max 4 images)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              className="form-control-file"
              disabled={galleryPreview.length >= 4}
            />
            {galleryPreview.length > 0 && (
              <div className="gallery-preview mt-2">
                {galleryPreview.map((src, index) => (
                  <div key={index} className="position-relative">
                    <img
                      src={src}
                      alt={`Gallery ${index}`}
                      className="img-thumbnail"
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      onClick={() => removeGalleryImage(index)}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group col-md-4">
            <label className="d-block mb-2">Product Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="form-control-file"
            />
            {videoPreview && (
              <video
                controls
                className="img-thumbnail mt-2"
                style={{ width: '100%' }}
              >
                <source src={videoPreview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Brand *</label>
            <select
              className="form-control"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            >
              <option value="">Select brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.brand_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-6">
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

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      <style jsx>{`
        .form-row {
          display: flex;
          margin-bottom: 1rem;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 1rem;
        }
        .gallery-preview {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .gallery-preview img {
          width: 80px;
          height: 80px;
          object-fit: cover;
        }
      `}</style>
    </Modal>
  )
}

export default ProductCreationModal

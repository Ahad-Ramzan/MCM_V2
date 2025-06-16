'use client'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { updateCategories } from '@/apis/products'

const EditCategoryModal = ({ isOpen, onClose, category, onUpdate }) => {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [subCategoryIds, setSubCategoryIds] = useState([])
  const [expanded, setExpanded] = useState({}) // { [id]: true/false }
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    if (category) {
      setName(category.name || '')
      setSlug(category.slug || '')
      setDescription(category.description || '')
      setSubCategoryIds(
        category.sub_categories
          ? category.sub_categories.map((sc) => sc.id)
          : []
      )
      setExpanded({})
      setImagePreview(category.image || '') // if API returns image URL
    }
  }, [category])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // Helper to find a category object by ID in the subcategory tree
  const findCategoryById = (subs, id) => {
    for (const sub of subs) {
      if (sub.id === id) return sub
      if (sub.children) {
        const found = findCategoryById(sub.children, id)
        if (found) return found
      }
    }
    return null
  }

  // Helper to get all descendant IDs of a category (including itself)
  const getAllDescendantIds = (categoryObj) => {
    let ids = [categoryObj.id]
    if (categoryObj.children && categoryObj.children.length > 0) {
      for (const child of categoryObj.children) {
        ids = ids.concat(getAllDescendantIds(child))
      }
    }
    return ids
  }

  // Enhanced checkbox handler: checks/unchecks all descendants
  const handleCheckbox = (id, checked) => {
    const categoryObj = findCategoryById(category.sub_categories, id)
    if (!categoryObj) return

    const idsToUpdate = getAllDescendantIds(categoryObj)

    if (checked) {
      setSubCategoryIds((prev) =>
        Array.from(new Set([...prev, ...idsToUpdate]))
      )
    } else {
      setSubCategoryIds((prev) =>
        prev.filter((sid) => !idsToUpdate.includes(sid))
      )
    }
  }

  const handleToggle = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Recursive render for categories/subcategories
  const renderSubCategories = (subs, level = 0) => (
    <ul
      style={{
        listStyle: 'none',
        paddingLeft: level === 0 ? 0 : 18,
        margin: 0,
      }}
    >
      {subs.map((sub) => (
        <li
          key={sub.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 4,
            paddingLeft: level * 16,
          }}
        >
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={subCategoryIds.includes(sub.id)}
            onChange={(e) => handleCheckbox(sub.id, e.target.checked)}
            style={{ marginRight: 8 }}
          />
          {/* Name */}
          <span style={{ flex: 1 }}>{sub.name}</span>
          {/* Arrow if has children */}
          {sub.children && sub.children.length > 0 && (
            <button
              type="button"
              onClick={() => handleToggle(sub.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                marginLeft: 4,
                fontSize: 16,
                lineHeight: 1,
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label={expanded[sub.id] ? 'Collapse' : 'Expand'}
            >
              <span
                style={{
                  display: 'inline-block',
                  transition: 'transform 0.2s',
                  transform: expanded[sub.id]
                    ? 'rotate(90deg)'
                    : 'rotate(0deg)',
                }}
              >
                ▶
              </span>
            </button>
          )}
          {/* Render children if expanded */}
          {sub.children && sub.children.length > 0 && expanded[sub.id] && (
            <div style={{ width: '100%' }}>
              {renderSubCategories(sub.children, level + 1)}
            </div>
          )}
        </li>
      ))}
    </ul>
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('slug', slug)
    formData.append('description', description)
    subCategoryIds.forEach((id) => formData.append('sub_category_ids', id))

    if (image) {
      formData.append('image', image)
    }

    try {
      await updateCategories(category.id, formData)
      toast.success('Category Updated successfully!')
      onUpdate()
      onClose()
    } catch (error) {
      toast.error('Failed to Update Category.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        <h2>Edit Category</h2>
        <form className="ps-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name*</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Slug*</label>
            <input
              className="form-control"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              value={description}
              rows="5"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category Image</label>
            <div className="custom-upload-wrapper">
              <label className="custom-upload-label">
                📁 Click to Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="custom-upload-input"
                />
              </label>

              {imagePreview && (
                <div className="image-preview-box">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          {/* Subcategories with checkboxes and arrows */}
          <div className="form-group">
            <label>Select Sub Category</label>
            <div className="subcategory-scroll">
              {category?.sub_categories &&
              category.sub_categories.length > 0 ? (
                renderSubCategories(category.sub_categories)
              ) : (
                <span>No sub-categories.</span>
              )}
            </div>
          </div>
          <div className="ps-form__bottom mt-4">
            <button type="submit" className="ps-btn ps-btn--submit">
              Update
            </button>
            <button
              type="button"
              className="ps-btn ps-btn--gray ml-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }
        .subcategory-scroll {
          border: 1px solid #ccc;
          border-radius: 6px;
          padding: 10px 8px;
          max-height: 320px;
          min-height: 80px;
          overflow-y: auto;
          background: #fafafa;
        }
        .form-group ul {
          margin: 0;
        }
        .custom-upload-wrapper {
          margin-top: 8px;
        }

        .custom-upload-label {
          display: inline-block;
          background-color: #f5f5f5;
          border: 2px dashed #ccc;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          color: #555;
          font-weight: 500;
          text-align: center;
          transition: all 0.3s ease;
          width: 100%;
        }

        .custom-upload-label:hover {
          background-color: #eaeaea;
          border-color: #888;
        }

        .custom-upload-input {
          display: none;
        }

        .image-preview-box {
          margin-top: 12px;
        }

        .image-preview-box img {
          width: 100px;
          height: 100px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid #ddd;
        }
      `}</style>
    </div>
  )
}

export default EditCategoryModal

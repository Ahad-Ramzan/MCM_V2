import React, { useState } from 'react'
import { createCategory } from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'

const FormCreateCategory = ({ categories, onSuccess }) => {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([])
  const [expandedNodes, setExpandedNodes] = useState({})
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const toggleExpand = (id) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
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

  const findParentIds = (node, targetId, path = []) => {
    if (node.id === targetId) return path
    if (node.children) {
      for (let child of node.children) {
        const result = findParentIds(child, targetId, [...path, node.id])
        if (result) return result
      }
    }
    return null
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleCheckboxChange = (category) => {
    const allChildIds = collectAllChildIds(category)
    const parentPathIds = categories.flatMap(
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

  const renderCategoryTree = (nodes) => {
    return nodes.map((cat) => {
      const isChecked = selectedSubCategoryIds.includes(cat.id)
      const hasChildren = cat.children && cat.children.length > 0
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
              >
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            )}
          </div>

          {hasChildren && isExpanded && (
            <div style={{ marginLeft: '20px' }}>
              {renderCategoryTree(cat.children)}
            </div>
          )}
        </div>
      )
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('slug', slug)
    formData.append('description', description)
    formData.append('image', image)
    selectedSubCategoryIds.forEach((id) =>
      formData.append('sub_category_ids', id)
    )

    try {
      await createCategory(formData)
      toast.success('Category created successfully!')
      setName('')
      setSlug('')
      setDescription('')
      setSelectedSubCategoryIds([])
      setExpandedNodes({})
      setImage(null)
      setImagePreview(null)

      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create category')
    }
  }

  return (
    <form className="ps-form ps-form--new" onSubmit={handleSubmit}>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <div className="ps-form__content">
        <div className="form-group">
          <label>
            Name<sup>*</sup>
          </label>
          <input
            className="form-control"
            type="text"
            required
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>
            Slug<sup>*</sup>
          </label>
          <input
            className="form-control"
            type="text"
            required
            placeholder="Enter category slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            rows="5"
            placeholder="Category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Category Image</label>
          <div className="image-upload-container">
            <label htmlFor="category-image" className="image-upload-box">
              📁 Click or Drag to Upload
              <input
                id="category-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden-file-input"
              />
            </label>

            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Select Sub-Categories</label>
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

      <div className="ps-form__bottom">
        <button
          type="reset"
          className="ps-btn ps-btn--gray"
          onClick={() => {
            setName('')
            setSlug('')
            setDescription('')
            setSelectedSubCategoryIds([])
            setExpandedNodes({})
          }}
        >
          Clean
        </button>
        <button type="submit" className="ps-btn ps-btn--submit">
          Add
        </button>
      </div>

      <style jsx>{`
        .image-upload-container {
          margin-top: 8px;
        }

        .image-upload-box {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fafafa;
          border: 2px dashed #ccc;
          padding: 20px;
          border-radius: 10px;
          color: #666;
          cursor: pointer;
          text-align: center;
          transition: border 0.3s ease;
          font-weight: 500;
        }

        .image-upload-box:hover {
          border-color: #999;
          background-color: #f0f0f0;
        }

        .hidden-file-input {
          display: none;
        }

        .image-preview {
          margin-top: 12px;
        }

        .image-preview img {
          width: 100px;
          height: 100px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid #ddd;
        }
      `}</style>
    </form>
  )
}

export default FormCreateCategory

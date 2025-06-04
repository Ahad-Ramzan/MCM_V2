import React, { useState } from 'react'
import { createSubCategory } from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'

const FormCreateSubCategory = ({ categories }) => {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [selectedParentId, setSelectedParentId] = useState(null)
  const [expandedNodes, setExpandedNodes] = useState([])

  const handleCheckboxChange = (id) => {
    setSelectedParentId((prev) => (prev === id ? null : id))
  }

  const toggleNode = (id) => {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((nodeId) => nodeId !== id) : [...prev, id]
    )
  }

  const renderCategoryTree = (nodes) => {
    return nodes.map((cat) => {
      const hasChildren = cat.children && cat.children.length > 0
      const isExpanded = expandedNodes.includes(cat.id)

      return (
        <div key={cat.id} style={{ marginLeft: '20px', marginBottom: '5px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <label style={{ flexGrow: 1 }}>
              <input
                type="checkbox"
                checked={selectedParentId === cat.id}
                onChange={() => handleCheckboxChange(cat.id)}
                style={{ marginRight: '5px' }}
              />
              {cat.name}
            </label>

            {hasChildren && (
              <span
                onClick={() => toggleNode(cat.id)}
                style={{ cursor: 'pointer' }}
              >
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            )}
          </div>

          {hasChildren && isExpanded && (
            <div>{renderCategoryTree(cat.children)}</div>
          )}
        </div>
      )
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedParentId) {
      toast.error('Please select a parent category.')
      return
    }

    const payload = {
      name,
      slug,
      description,
      parent: selectedParentId,
    }

    try {
      await createSubCategory(payload)
      toast.success('Sub-category created successfully!')

      setName('')
      setSlug('')
      setDescription('')
      setSelectedParentId(null)
    } catch (err) {
      toast.error('Failed to create sub-category.')
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
          <label>Select Sub Category</label>
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
            setSelectedParentId(null)
          }}
        >
          Clean
        </button>
        <button type="submit" className="ps-btn ps-btn--submit">
          Add
        </button>
      </div>
    </form>
  )
}

export default FormCreateSubCategory

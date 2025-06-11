'use client'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'

const EditSubCategoryModal = ({
  isOpen,
  onClose,
  subCategory,
  subcategories,
  onUpdate,
  onSubmit,
}) => {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [selectedChildrenIds, setSelectedChildrenIds] = useState([])
  const [expandedNodes, setExpandedNodes] = useState([])
  const [selectedParentId, setSelectedParentId] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (subCategory) {
      setName(subCategory.name || '')
      setSlug(subCategory.slug || '')
      setDescription(subCategory.description || '')
      setSelectedChildrenIds(subCategory.children?.map((c) => c.id) || [])
      setSelectedParentId(subCategory.parent || null)
      setExpandedNodes([])
    }
  }, [subCategory])

  const toggleNode = (id) => {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    )
  }

  const getAllDescendantIds = (category) => {
    let ids = [category.id]
    category.children?.forEach((child) => {
      ids = ids.concat(getAllDescendantIds(child))
    })
    return ids
  }

  const handleCheckboxChange = (category, checked) => {
    const ids = getAllDescendantIds(category)
    setSelectedChildrenIds((prev) =>
      checked
        ? [...new Set([...prev, ...ids])]
        : prev.filter((id) => !ids.includes(id))
    )
  }

  const handleParentSelection = (id) => {
    setSelectedParentId((prev) => (prev === id ? null : id))
  }

  const renderCategoryTree = (nodes, level = 0) =>
    nodes.map((cat) => {
      const isExpanded = expandedNodes.includes(cat.id)
      const isSelf = subCategory?.id === cat.id
      const hasChildren = cat.children?.length > 0

      return (
        <div key={cat.id} style={{ marginLeft: level * 20, marginBottom: 5 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              opacity: isSelf ? 0.4 : 1,
              pointerEvents: isSelf ? 'none' : 'auto',
            }}
          >
            <input
              type="checkbox"
              checked={selectedParentId === cat.id}
              onChange={() => handleParentSelection(cat.id)}
              disabled={isSelf}
              style={{ marginRight: 6 }}
            />
            <strong style={{ flexGrow: 1 }}>{cat.name}</strong>
            {hasChildren && (
              <span
                onClick={() => toggleNode(cat.id)}
                style={{ cursor: 'pointer' }}
              >
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            )}
          </div>
          {hasChildren &&
            isExpanded &&
            renderCategoryTree(cat.children, level + 1)}
        </div>
      )
    })

  const renderChildrenSelector = (children, level = 0) => {
    if (!children?.length) return null

    return (
      <ul style={{ listStyle: 'none', paddingLeft: level === 0 ? 0 : 18 }}>
        {children.map((child) => {
          const isExpanded = expandedNodes.includes(child.id)
          const hasChildren = child.children?.length > 0

          return (
            <li
              key={child.id}
              style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}
            >
              <input
                type="checkbox"
                checked={selectedChildrenIds.includes(child.id)}
                onChange={(e) => handleCheckboxChange(child, e.target.checked)}
                style={{
                  marginRight: 8,
                  accentColor: '#0070f3',
                  cursor: 'pointer',
                }}
              />
              <span style={{ flex: 1 }}>{child.name}</span>
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => toggleNode(child.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: 16,
                  }}
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                  <span
                    style={{
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}
                  >
                    <FaChevronRight />
                  </span>
                </button>
              ) : (
                <span style={{ width: 24 }} />
              )}
              {hasChildren && isExpanded && (
                <div style={{ marginTop: 6, marginLeft: 10 }}>
                  {renderChildrenSelector(child.children, level + 1)}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !slug.trim()) {
      toast.error('Name and Slug are required.')
      return
    }

    const updatedData = {
      name,
      slug,
      description,
      parent: selectedParentId || 0,
    }

    try {
      setSubmitting(true)
      await onSubmit(subCategory.id, updatedData)
      toast.success('Sub-category updated successfully!')
      onUpdate?.()
      onClose()
    } catch (err) {
      toast.error('Failed to update sub-category.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen || !subCategory) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <Toaster position="top-center" />
        <h2>Edit Sub Category</h2>
        <form className="ps-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name*</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={submitting}
            />
          </div>
          <div className="form-group">
            <label>Slug*</label>
            <input
              className="form-control"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              disabled={submitting}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label>Select Parent Category</label>
            <div
              style={{
                border: '1px solid #e5e5e5',
                padding: 10,
                maxHeight: 300,
                overflowY: 'auto',
              }}
            >
              {renderCategoryTree(subcategories)}
            </div>
          </div>

          {/* <div className="form-group">
            <label>Assign Child Sub-Categories</label>
            <div
              style={{
                border: '1px solid #e5e5e5',
                padding: 10,
                maxHeight: 300,
                overflowY: 'auto',
              }}
            >
              {renderChildrenSelector(subcategories)}
            </div>
          </div> */}

          <div className="ps-form__bottom mt-4">
            <button
              type="submit"
              className="ps-btn ps-btn--submit"
              disabled={submitting}
            >
              {submitting ? 'Updating...' : 'Update'}
            </button>
            <button
              type="button"
              className="ps-btn ps-btn--gray ml-2"
              onClick={onClose}
              disabled={submitting}
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
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }
      `}</style>
    </div>
  )
}

export default EditSubCategoryModal

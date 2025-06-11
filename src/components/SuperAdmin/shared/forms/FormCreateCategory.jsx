import React, { useState } from 'react'
import { createCategory } from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'

const FormCreateCategory = ({ categories }) => {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([])
  const [expandedNodes, setExpandedNodes] = useState({})

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

    const payload = {
      name,
      slug,
      description,
      sub_category_ids: selectedSubCategoryIds,
    }

    try {
      await createCategory(payload)
      toast.success('Category created successfully!')
      setName('')
      setSlug('')
      setDescription('')
      setSelectedSubCategoryIds([])
      setExpandedNodes({})
    } catch (err) {
      toast.error('Failed to create category')
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
    </form>
  )
}

export default FormCreateCategory

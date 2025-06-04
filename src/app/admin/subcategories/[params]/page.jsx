'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  getcategoriesById,
  getsubcategoriesById,
  updateSubCategories,
} from '@/apis/products'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import toast, { Toaster } from 'react-hot-toast'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'

const EditSubCategoryPage = () => {
  const router = useRouter()
  const params = useParams()
  const subCatId = params.params

  // Form state
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')

  // Categories tree for parent selection
  const [categories, setCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  // Selected parent category id
  const [selectedParentId, setSelectedParentId] = useState(null)

  // Expanded nodes for tree toggle
  const [expandedNodes, setExpandedNodes] = useState([])

  // Children categories of current fetched category
  const [children, setChildren] = useState([])

  // Loading state for current subcategory
  const [loadingCategory, setLoadingCategory] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Fetch subcategory data for editing
  const fetchCategory = async () => {
    try {
      setLoadingCategory(true)
      const data = await getsubcategoriesById(subCatId)
      setName(data.name || '')
      setSlug(data.slug || '')
      setDescription(data.description || '')
      setSelectedParentId(data.parent?.id || null)
      setChildren(data.children || [])
      console.log('Fetched subcategory:', data)
    } catch (error) {
      toast.error('Failed to fetch subcategory')
      console.error('Error fetching subcategory:', error)
    } finally {
      setLoadingCategory(false)
    }
  }

  // Fetch all categories with children to render tree for parent selection
  const fetchAllCategories = async () => {
    try {
      setLoadingCategories(true)
      const data = await getcategoriesById()
      console.log('Fetched categories:', data)
      setCategories(data)
    } catch (err) {
      toast.error('Failed to load categories')
      console.error('Error loading categories:', err)
    } finally {
      setLoadingCategories(false)
    }
  }

  // Toggle expand/collapse of nodes in tree
  const toggleNode = (id) => {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((nodeId) => nodeId !== id) : [...prev, id]
    )
  }

  // When user clicks checkbox to select a parent category
  const handleCheckboxChange = (id) => {
    setSelectedParentId((prev) => (prev === id ? null : id))
  }

  // Recursive function to render categories tree with checkboxes and toggles
  const renderCategoryTree = (nodes, level = 0) => {
    return nodes.map((cat) => {
      // Prevent selecting itself as parent
      if (cat.id === Number(subCatId)) return null

      const hasChildren = cat.children && cat.children.length > 0
      const isExpanded = expandedNodes.includes(cat.id)

      return (
        <div key={cat.id} style={{ marginLeft: level * 20, marginBottom: 5 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {/* Arrow on the left */}
            {hasChildren ? (
              <span
                onClick={() => toggleNode(cat.id)}
                style={{
                  cursor: 'pointer',
                  width: 18,
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            ) : (
              // Reserve space for arrow for alignment
              <span style={{ width: 18, display: 'inline-block' }} />
            )}

            {/* Checkbox & label */}
            <label
              style={{
                flexGrow: 1,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                opacity: cat.id === Number(subCatId) ? 0.5 : 1,
              }}
              title={
                cat.id === Number(subCatId)
                  ? 'Cannot select itself as parent'
                  : ''
              }
            >
              <input
                type="checkbox"
                checked={selectedParentId === cat.id}
                disabled={cat.id === Number(subCatId)}
                onChange={() => handleCheckboxChange(cat.id)}
                style={{ marginRight: 6 }}
              />
              {cat.name}
            </label>
          </div>

          {/* Children */}
          {hasChildren && isExpanded && (
            <div>{renderCategoryTree(cat.children, level + 1)}</div>
          )}
        </div>
      )
    })
  }

  // Submit updated data to backend
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim() || !slug.trim()) {
      toast.error('Name and slug are required.')
      return
    }

    if (!selectedParentId) {
      toast.error('Please select a parent category.')
      return
    }

    const updatedData = {
      name,
      slug,
      description,
      parent: selectedParentId,
    }

    try {
      setSubmitting(true)
      await updateSubCategories(subCatId, updatedData)
      toast.success('Sub-category updated successfully!')
      router.push('/admin/categories')
    } catch (err) {
      toast.error('Failed to update sub-category.')
      console.error('Error updating sub-category:', err)
    } finally {
      setSubmitting(false)
    }
  }

  // Load data on mount and when subCatId changes
  useEffect(() => {
    if (subCatId) {
      fetchCategory()
      fetchAllCategories()
    }
    // eslint-disable-next-line
  }, [subCatId])

  return (
    <ContainerDefault>
      <HeaderDashboard
        title="Edit Sub Category"
        description="Edit a sub-category"
      />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <div className="container" style={{ maxWidth: 650, margin: '0 auto' }}>
        <h2>Edit Sub Category</h2>
        <form className="ps-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label>Name*</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loadingCategory || submitting}
              placeholder="Enter sub-category name"
            />
          </div>

          <div className="form-group">
            <label>Slug*</label>
            <input
              className="form-control"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              disabled={loadingCategory || submitting}
              placeholder="Enter sub-category slug"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              value={description}
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loadingCategory || submitting}
              placeholder="Enter description (optional)"
            />
          </div>

          {/* Parent category selection tree */}
          <div className="form-group">
            <label>Select Parent Category*</label>
            <div
              style={{
                border: '1px solid #e5e5e5',
                borderRadius: 6,
                padding: '10px',
                maxHeight: '300px',
                overflowY: 'auto',
                background: '#fafbfc',
              }}
            >
              {loadingCategories ? (
                <p style={{ color: '#0066cc', fontWeight: 500 }}>
                  Loading categories...
                </p>
              ) : categories.length > 0 ? (
                renderCategoryTree(categories)
              ) : (
                <p style={{ color: '#888' }}>No categories found.</p>
              )}
            </div>
          </div>

          {/* Display children categories of this category */}
          <div className="form-group mt-4">
            <label>Children Categories:</label>
            {loadingCategory ? (
              <p>Loading children...</p>
            ) : children.length > 0 ? (
              children.map((child) => (
                <div
                  key={child.id}
                  style={{
                    marginLeft: '20px',
                    marginBottom: '10px',
                    padding: '8px 12px',
                    background: '#f7f7f7',
                    borderRadius: 4,
                  }}
                >
                  <p>
                    <strong>Name:</strong> {child.name}
                  </p>
                  <p>
                    <strong>Slug:</strong> {child.slug || 'No slug'}
                  </p>
                  <p>
                    <strong>Description:</strong>{' '}
                    {child.description || 'No description'}
                  </p>
                </div>
              ))
            ) : (
              <p>No children categories found.</p>
            )}
          </div>

          <div className="ps-form__bottom mt-4">
            <button
              type="submit"
              className="ps-btn ps-btn--submit"
              disabled={submitting || loadingCategory}
            >
              {submitting ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </ContainerDefault>
  )
}

export default EditSubCategoryPage

'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
// import EditSubCategoryModal from './EditSubCategoryModal' // Adjust path if needed
import { getcategoriesById, updateSubCategories } from '@/apis/products'
import toast from 'react-hot-toast'
import EditSubCategoryModal from '@/app/admin/subcategories/[params]/page'

const TableSubCategoriesItems = ({
  categories,
  onDelete,
  onUpdate,
  subcategories,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const [categoriesTree, setCategoriesTree] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(false)

  // Fetch categories tree for modal
  const fetchCategoriesTree = async () => {
    setLoadingCategories(true)
    try {
      const data = await getcategoriesById()
      setCategoriesTree(data)
    } catch (err) {
      // toast.error('Failed to load categories')
      setCategoriesTree([])
    } finally {
      setLoadingCategories(false)
    }
  }

  const handleEditClick = (subCategory) => {
    setSelectedSubCategory(subCategory)
    setIsModalOpen(true)
    fetchCategoriesTree()
  }

  const handleSuccessfulUpdate = () => {
    if (onUpdate) onUpdate() // Call the parent's update handler
    handleCloseModal() // Close the modal
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedSubCategory(null)
  }

  // Update handler for modal
  const handleUpdateSubCategory = async (id, updatedData) => {
    await updateSubCategories(id, updatedData)
    onUpdate && onUpdate()
  }

  // Render children names as nested list (for table display)
  const RenderChildrenNames = ({ children }) => {
    if (!children || children.length === 0) return null
    return (
      <ul className="list-disc ml-4">
        {children.map((child) => (
          <li key={child.id}>
            {child.name}
            {child.children && child.children.length > 0 && (
              <RenderChildrenNames children={child.children} />
            )}
          </li>
        ))}
      </ul>
    )
  }

  

  return (
    <div className="table-responsive">
      <table className="table ps-table">
        <thead>
          <tr>
            <th>Name da Categoria</th>
            <th>Slug</th>
            <th>Children</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.id}>
                <td>
                  <strong>{category.name}</strong>
                </td>
                <td>{category.slug || '—'}</td>
                <td>
                  {category.children && category.children.length > 0 ? (
                    <RenderChildrenNames children={category.children} />
                  ) : (
                    '—'
                  )}
                </td>
                <td>
                  <button
                    className="ps-btn ps-btn--sm"
                    onClick={() => handleEditClick(category)}
                    style={{ backgroundColor: '#fcb800', color: '#000' }}
                  >
                    Edit
                  </button>
                  <button
                    className="ps-btn ps-btn--sm ps-btn--danger ml-2"
                    onClick={() => onDelete(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No categories found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <EditSubCategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        subCategory={selectedSubCategory}
        categoriesTree={categoriesTree}
        loadingCategories={loadingCategories}
        onUpdate={handleSuccessfulUpdate}
        onSubmit={handleUpdateSubCategory}
        subcategories={subcategories}
      />
    </div>
  )
}

export default TableSubCategoriesItems

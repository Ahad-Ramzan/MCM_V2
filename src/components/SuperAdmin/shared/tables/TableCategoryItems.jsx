'use client'
import EditCategoryModal from '@/app/admin/categories/[params]/page'
import React, { useState } from 'react'
// import EditCategoryModal from './EditCategoryModal'

const TableCategoryItems = ({ categories, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleEditClick = (category) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCategory(null)
  }

  return (
    <div className="table-responsive">
      <table className="table ps-table">
        <thead>
          <tr>
            <th>Name da Categoria</th>
            <th>Slug</th>
            <th>Data de Criação</th>
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
                <td>{category.slug}</td>
                <td>
                  {category.created_at
                    ? new Date(category.created_at).toLocaleDateString()
                    : '—'}
                </td>
                <td>
                  <button
                    className="ps-btn ps-btn--sm"
                    onClick={() => handleEditClick(category)}
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
      <EditCategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        category={selectedCategory}
        onUpdate={onUpdate}
      />
    </div>
  )
}

export default TableCategoryItems

'use client'
import React from 'react'
import Link from 'next/link'

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

const TableSubCategoriesItems = ({ categories, onDelete }) => {
  console.log(categories, 'new categories')

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
                  <Link
                    href={`/admin/subcategories/${category.id}`}
                    className="ps-btn ps-btn--sm"
                  >
                    Edit
                  </Link>
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
    </div>
  )
}

export default TableSubCategoriesItems

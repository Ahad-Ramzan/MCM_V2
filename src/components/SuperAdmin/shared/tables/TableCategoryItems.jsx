'use client'
import React from 'react'
// import Link from '../../../../../node_modules/next/link';
import Link from 'next/link'

const TableCategoryItems = ({ categories, onDelete }) => {
  console.log(categories, 'new categories')

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
                  {/* <Link href={`/admin/brand/edit/${brand.id}`} className="ps-btn ps-btn--sm">
                                                Edit
                                              </Link> */}
                  {/* <Link className="ps-btn ps-btn--sm"  >
                                              Edit
                                              </Link> */}

                  <Link
                    href={`/admin/categories/${category.id}`}
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

export default TableCategoryItems

// components/SuperAdmin/shared/tables/TableBrandName.jsx

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const TableBrandName = ({ productsData, onDelete }) => {
  const router = useRouter()
  const handleEdit = (id) => {
    router.push(`/admin/brand/edit/${id}`)
  }
  return (
    <table className="table ps-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Brand Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {productsData.map((brand) => (
          <tr key={brand.id}>
            <td>{brand.id}</td>
            <td>{brand.brand_name}</td>
            <td>
              <button
                className="ps-btn ps-btn--sm"
                onClick={() => handleEdit(brand.id)}
              >
                Edit
              </button>
              <button
                className="ps-btn ps-btn--sm ps-btn--danger ml-2"
                onClick={() => onDelete(brand.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableBrandName

// TableProjectItems.js
import React, { useState } from 'react'
import Link from 'next/link'
import { Modal } from 'antd'
import EditProductPage from '@/app/admin/products/[id]/page'

const TableProjectItems = ({ productsData, onDelete, onUpdate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingProductId, setEditingProductId] = useState(null)

  const tableItems = Array.isArray(productsData)
    ? productsData.map((item, index) => {
        const badgeView =
          item.stock > 0 ? (
            <span className="ps-badge success">In Stock</span>
          ) : (
            <span className="ps-badge gray">Out of stock</span>
          )

        const statusButton =
          item.status === 'active' ? (
            <button
              className="ps-badge success"
              style={{
                padding: '3px 10px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'default',
              }}
            >
              Active
            </button>
          ) : (
            <button
              className="ps-badge danger"
              style={{
                padding: '3px 10px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'default',
                backgroundColor: '#dc3545',
                color: 'white',
              }}
            >
              Inactive
            </button>
          )

        return (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>
              <a href="#">
                <strong>{item.product_name}</strong>
              </a>
            </td>
            <td>{item.SKU}</td>
            <td>{badgeView}</td>
            <td>
              <strong>{item.regular_price}€</strong>
            </td>
            <td>
              <p className="ps-item-categories">
                <a href="#">Categoria ID: {item.category}</a>
              </p>
            </td>
            <td>{statusButton}</td>
            <td>{new Date(item.date).toLocaleDateString()}</td>
            <td>
              <button
                className="ps-btn ps-btn--sm"
                onClick={() => {
                  setEditingProductId(item.id)
                  setIsModalVisible(true)
                }}
                style={{ backgroundColor: '#fcb800', color: '#000' }}
              >
                Edit
              </button>
              <button
                className="ps-btn ps-btn--sm ps-btn--danger ml-2"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        )
      })
    : []

  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  const handleSuccessfulUpdate = () => {
    if (onUpdate) onUpdate()
    handleCloseModal()
  }

  return (
    <div className="table-responsive">
      <table className="table ps-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Categories</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>

      <Modal
        title="Edit Product"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        {editingProductId && (
          <EditProductPage
            productId={editingProductId}
            onUpdate={handleSuccessfulUpdate}
          />
        )}
      </Modal>
    </div>
  )
}

export default TableProjectItems

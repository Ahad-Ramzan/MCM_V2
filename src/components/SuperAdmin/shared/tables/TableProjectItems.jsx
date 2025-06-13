// TableProjectItems.js
import React, { useState } from 'react'
import Link from 'next/link'
import { Modal } from 'antd'
import EditProductPage from '@/app/admin/products/[id]/page'
// import EditProductPage from './EditProductPage' // Adjust the path as necessary

const TableProjectItems = ({ productsData, onDelete, onUpdate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingProductId, setEditingProductId] = useState(null)

  const tableItems = Array.isArray(productsData)
    ? productsData.map((item, index) => {
        const badgeView =
          item.stock > 0 ? (
            <span className="ps-badge success">Stock</span>
          ) : (
            <span className="ps-badge gray">Out of stock</span>
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
            <td>{item.stock}</td>
            <td>
              <strong>{item.regular_price}€</strong>
            </td>
            <td>
              <p className="ps-item-categories">
                <a href="#">Categoria ID: {item.category}</a>
              </p>
            </td>
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
    // setSelectedCategory(null)
  }

  const handleSuccessfulUpdate = () => {
    if (onUpdate) onUpdate() // Call the parent's update handler
    handleCloseModal() // Close the modal
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
            <th>Preço</th>
            <th>Categorias</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>

      {/* Edit Product Modal */}
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

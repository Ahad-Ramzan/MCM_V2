import EditBrandModal from '@/app/admin/brand/edit/[params]/page'
import React, { useState } from 'react'
// import EditBrandModal from '../modals/EditBrandModal' // Import the modal component

const TableBrandName = ({ productsData, onDelete, onUpdateBrand }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentBrand, setCurrentBrand] = useState(null)

  const handleEdit = (brand) => {
    setCurrentBrand(brand)
    setIsModalVisible(true)
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    setCurrentBrand(null)
  }

  const handleUpdate = async (updatedBrand) => {
    await onUpdateBrand(updatedBrand)
    handleModalCancel() // Close the modal after updating
  }

  return (
    <>
      <table className="table ps-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Brand Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((brand) => (
            <tr key={brand.id}>
              <td>{brand.id}</td>
              <td>
                <img src={brand.image} alt={`Brand ${brand.id}`} width="100" />
              </td>
              <td>{brand.brand_name}</td>
              <td>
                <button
                  className="ps-btn ps-btn--sm"
                  onClick={() => handleEdit(brand)} // Open the modal for editing
                  style={{ backgroundColor: '#fcb800', color: '#000' }}
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

      {/* Edit Brand Modal */}
      {currentBrand && (
        <EditBrandModal
          visible={isModalVisible}
          onCancel={handleModalCancel}
          brandData={currentBrand}
          onUpdate={handleUpdate} // Pass the update function
        />
      )}
    </>
  )
}

export default TableBrandName

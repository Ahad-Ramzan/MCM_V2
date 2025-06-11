import React, { useState } from 'react'
import { Modal } from 'antd'
import EditBannerPage from '../../banners/EditBannerPage'
// import BannerUploadPage from '../../banners/CreateBannerModal'
// import EditBannerPage from '../../banners/EditBannerPage' // Import the new component

const TableBannerPage = ({ banners, onDelete, onUpdate }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [currentBanner, setCurrentBanner] = useState(null)

  const handleEdit = (banner) => {
    setCurrentBanner(banner)
    setIsEditModalVisible(true)
  }

  const handleModalCancel = () => {
    setIsEditModalVisible(false)
    setCurrentBanner(null)
  }

  const handleUpdateSuccess = () => {
    onUpdate() // This will trigger the parent to refresh the banners list
    handleModalCancel()
  }

  return (
    <>
      <table className="table ps-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner.id}>
              <td>{banner.id}</td>
              <td>
                <img
                  src={banner.image}
                  alt={`Banner ${banner.id}`}
                  width="100"
                />
              </td>
              <td>{banner.position}</td>
              <td>
                <button
                  className="ps-btn ps-btn--sm"
                  onClick={() => handleEdit(banner)}
                >
                  Edit
                </button>
                <button
                  className="ps-btn ps-btn--sm ps-btn--danger ml-2"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this banner?'
                      )
                    ) {
                      onDelete(banner.id)
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title="Edit Banner"
        open={isEditModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={800}
      >
        {currentBanner && (
          <EditBannerPage
            bannerData={currentBanner}
            onSuccess={handleUpdateSuccess}
          />
        )}
      </Modal>
    </>
  )
}

export default TableBannerPage

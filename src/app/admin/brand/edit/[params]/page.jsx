'use client'
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import toast from 'react-hot-toast'

const EditBrandModal = ({ visible, onCancel, brandData, onUpdate }) => {
  const [formData, setFormData] = useState({ brand_name: '' })

  useEffect(() => {
    if (brandData) {
      setFormData(brandData)
    }
  }, [brandData])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await onUpdate(formData)
      // toast.success('Brand updated successfully!')
      onCancel()
    } catch (error) {
      console.error('Failed to update brand:', error)
      toast.error('Failed to update brand.')
    }
  }

  return (
    <Modal
      title="Edit Brand"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width="400px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="block mb-2">Brand Name</label>
          <input
            type="text"
            name="brand_name"
            value={formData.brand_name}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="ps-btn">
          Update Brand
        </button>
      </form>
    </Modal>
  )
}

export default EditBrandModal

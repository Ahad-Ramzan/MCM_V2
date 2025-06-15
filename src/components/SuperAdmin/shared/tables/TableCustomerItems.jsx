import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Modal, Upload, message } from 'antd'
import { InboxOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { updateUserdata } from '@/apis/userApi'
import toast from 'react-hot-toast'
import Image from 'next/image'
import ClientDetailPage from '@/app/admin/customers/[params]/page'

const { Dragger } = Upload

const TableCustomerItems = ({ userData, onDelete }) => {
  const router = useRouter()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [formData, setFormData] = useState({
    full_name: '',
    contact_number: '',
    is_active: true,
    email: '',
    bio: '',
    company: '',
    nif: '',
    photo: '',
  })

  const [editingClientId, setEditingClientId] = useState(null)

  const handleEditClick = (user) => {
    setSelectedUser(user)
    setImageUrl(user.photo || '')
    setFormData({
      full_name: user.full_name || '',
      contact_number: user.contact_number || '',
      is_active: user.is_active || true,
      email: user.email || '',
      bio: user.bio || '',
      company: user.company || '',
      nif: user.nif || '',
      photo: user.photo || '',
    })
    setIsModalVisible(true)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('You can only upload image files!')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!')
      return false
    }
    return true
  }

  const uploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    beforeUpload: beforeUpload,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        setLoading(true)
        const base64Url = await getBase64(file)
        setImageUrl(base64Url)
        setFormData((prev) => ({
          ...prev,
          photo: base64Url,
        }))
        onSuccess()
        message.success('Image uploaded successfully')
      } catch (error) {
        onError()
        message.error('Upload failed')
      } finally {
        setLoading(false)
      }
    },
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      // Create a new object with all form data including the photo
      const payload = {
        ...formData,
        photo: imageUrl, // Ensure photo URL is included
      }

      console.log('Submitting payload:', payload) // Debug log

      await updateUserdata(selectedUser.id, payload)
      toast.success('User updated successfully!')
      setIsModalVisible(false)
      window.location.reload()
    } catch (error) {
      console.error('Update error:', error) // Debug log
      toast.error(error.message || 'Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  const tableItemsView = userData.results.map((item, index) => {
    let badgeView

    if (item.status) {
      badgeView = <span className="ps-badge success">Ativo</span>
    } else {
      badgeView = <span className="ps-badge gray">desativado</span>
    }

    const handleDetailsClick = () => {
      router.push(`/admin/customers/${item.id}`)
    }

    return (
      <tr key={index}>
        <td>{index}</td>
        <td>
          <strong>{item.full_name}</strong>
        </td>
        <td>{item.contact_number ? item.contact_number : 'null'}</td>
        <td>{item.total_order_amount}</td>
        <td>{item.total_orders}</td>
        <td>{item.is_active ? 'Active' : 'Inactive'}</td>
        <td>
          <button
            className="ps-btn ps-btn--sm"
            onClick={() => {
              setEditingClientId(item.id)
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

  return (
    <>
      <div className="table-responsive">
        <table className="table ps-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contacto</th>
              <th>Montante</th>
              <th>Encomendas</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{tableItemsView}</tbody>
        </table>
      </div>

      <Modal
        title="Edit Client"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={1000}
      >
        {editingClientId && (
          <ClientDetailPage editingClientId={editingClientId} />
        )}
      </Modal>

      {/* Edit User Modal */}
      <style jsx>{``}</style>
    </>
  )
}

export default TableCustomerItems

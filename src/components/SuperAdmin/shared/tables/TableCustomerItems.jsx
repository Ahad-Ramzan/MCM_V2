import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Modal, Upload, message } from 'antd'
import { InboxOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { updateUserdata } from '@/apis/userApi'
import toast from 'react-hot-toast'
import Image from 'next/image'

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
          {/* <button 
            className="ps-btn ps-btn--sm mr-10" 
            onClick={() => handleEditClick(item)}
          >
            Edit
          </button> */}
          <button
            className="ps-btn ps-btn--sm"
            onClick={handleDetailsClick}
            style={{ backgroundColor: '#fcb800', color: '#000' }}
          >
            Details
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

      {/* Edit User Modal */}
      <Modal
        title={
          <div className="text-center">
            <h3 className="mb-0">Edit User Profile</h3>
            <p className="text-muted">
              Update user information and profile picture
            </p>
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
        className="custom-modal"
      >
        <form className="ps-form" onSubmit={handleSubmit}>
          <div className="ps-form__content">
            <div className="row">
              <div className="col-xl-4">
                <figure className="ps-block--form-box">
                  <figcaption>Profile Picture</figcaption>
                  <div className="ps-block__content">
                    <div className="upload-container">
                      {imageUrl ? (
                        <div className="image-preview">
                          <img
                            src={imageUrl}
                            alt="Profile"
                            style={{
                              width: '200px',
                              height: '200px',
                              objectFit: 'cover',
                              borderRadius: '50%',
                            }}
                          />
                          <button
                            type="button"
                            className="ps-btn ps-btn--sm ps-btn--danger mt-2"
                            onClick={() => {
                              setImageUrl('')
                              setFormData((prev) => ({ ...prev, photo: '' }))
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <Dragger {...uploadProps} className="upload-area">
                          <p className="ant-upload-drag-icon">
                            {loading ? <LoadingOutlined /> : <InboxOutlined />}
                          </p>
                          <p className="ant-upload-text">
                            Click or drag file to upload
                          </p>
                          <p className="ant-upload-hint">
                            Support for a single upload. Strictly prohibited
                            from uploading company data or other banned files.
                          </p>
                        </Dragger>
                      )}
                    </div>
                  </div>
                </figure>
              </div>
              <div className="col-xl-8">
                <figure className="ps-block--form-box">
                  <figcaption>User Information</figcaption>
                  <div className="ps-block__content">
                    <div className="row">
                      {[
                        {
                          label: 'Full Name',
                          name: 'full_name',
                          type: 'text',
                          col: 6,
                        },
                        {
                          label: 'Email',
                          name: 'email',
                          type: 'email',
                          col: 6,
                        },
                        {
                          label: 'Contact Number',
                          name: 'contact_number',
                          type: 'text',
                          col: 6,
                        },
                        {
                          label: 'Company',
                          name: 'company',
                          type: 'text',
                          col: 6,
                        },
                        { label: 'NIF', name: 'nif', type: 'text', col: 6 },
                        {
                          label: 'Bio',
                          name: 'bio',
                          type: 'textarea',
                          col: 12,
                        },
                      ].map(({ label, name, type, col }) => (
                        <div className={`col-xl-${col}`} key={name}>
                          <div className="form-group">
                            <label>{label} *</label>
                            {type === 'textarea' ? (
                              <textarea
                                className="form-control"
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                rows={4}
                                required
                              />
                            ) : (
                              <input
                                className="form-control"
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                required
                              />
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="col-xl-12">
                        <div className="form-group">
                          <label className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              name="is_active"
                              checked={formData.is_active}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            Active Status
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <div className="ps-form__bottom mt-4 text-center">
            <button
              type="button"
              className="ps-btn ps-btn--gray mr-3"
              onClick={() => setIsModalVisible(false)}
            >
              Cancel
            </button>
            <button type="submit" className="ps-btn" disabled={loading}>
              {loading ? <LoadingOutlined /> : 'Update Profile'}
            </button>
          </div>
        </form>
      </Modal>

      <style jsx>{`
        .custom-modal {
          .ant-modal-content {
            border-radius: 15px;
            overflow: hidden;
          }
          .ant-modal-header {
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
            padding: 20px;
          }
          .ant-modal-body {
            padding: 24px;
          }
        }
        .upload-container {
          text-align: center;
          .image-preview {
            img {
              object-fit: cover;
              border: 3px solid #f8f9fa;
            }
          }
          .upload-area {
            border: 2px dashed #d9d9d9;
            border-radius: 8px;
            padding: 20px;
            background: #fafafa;
            transition: all 0.3s;
            &:hover {
              border-color: #1890ff;
            }
          }
        }
        .form-group {
          margin-bottom: 20px;
          label {
            font-weight: 500;
            margin-bottom: 8px;
            display: block;
          }
          .form-control {
            border-radius: 8px;
            padding: 10px 15px;
            border: 1px solid #d9d9d9;
            transition: all 0.3s;
            &:focus {
              border-color: #1890ff;
              box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
            }
          }
        }
      `}</style>
    </>
  )
}

export default TableCustomerItems

'use client'

import { getAllOrders } from '@/apis/products'
import {
  getCurrentUser,
  UpdateUser,
  AddAddress,
  deleteAddress,
  updateAddress,
  changepassword, // Import change password API
} from '@/apis/userApi'
import React, { useEffect, useState } from 'react'
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaLock, // Import lock icon for change password
} from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'

const SettingsPage = () => {
  // User data state
  const [userData, setUserData] = useState({
    id: 0,
    full_name: '',
    display_name: '',
    email: '',
    role: '',
    contact_number: '',
    company: '',
    nif: '',
    photo: '',
    addresses: [],
    bio: '',
  })

  // Orders and pagination state
  const [ordersData, setOrdersData] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    count: 0,
  })

  // UI state
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [newAddress, setNewAddress] = useState({
    street_address: '',
    city: '',
    country: '',
    postal_code: '',
    is_default: false,
  })

  // New state for password change
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await getCurrentUser()
      setUserData({
        id: response.id || 0,
        full_name: response.full_name || '',
        display_name: response.display_name || '',
        email: response.email || '',
        role: response.role || '',
        contact_number: response.contact_number || '',
        company: response.company || '',
        nif: response.nif || '',
        photo: response.photo || '',
        addresses: response.addresses || [],
        bio: response.bio || '',
      })
    } catch (error) {
      console.error('Failed to fetch user:', error)
      toast.error('Failed to load user data')
    }
  }

  // Fetch orders with pagination
  const fetchOrdersData = async (page = 1) => {
    try {
      const response = await getAllOrders(page)
      setOrdersData(response.results || [])
      setPagination({
        currentPage: page,
        totalPages: Math.ceil(response.count / 10),
        count: response.count,
      })
    } catch (error) {
      toast.error('Failed to fetch orders')
      console.error('Fetch Error:', error)
    }
  }

  // Initial data loading
  useEffect(() => {
    fetchUserData()
    fetchOrdersData()
  }, [])

  // Profile update handler
  const handleProfileUpdate = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('full_name', userData.full_name)
      formData.append('display_name', userData.display_name)
      formData.append('contact_number', userData.contact_number)
      formData.append('company', userData.company)
      formData.append('nif', userData.nif)
      formData.append('bio', userData.bio)

      if (userData.photo instanceof File) {
        formData.append('photo', userData.photo)
      } else if (typeof userData.photo === 'string') {
        formData.append('photo_url', userData.photo)
      }

      await UpdateUser(formData)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Failed to update profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  // Address form submission
  const handleAddressSubmit = async (e) => {
    e.preventDefault()
    const addressPayload = {
      ...newAddress,
      user_id: userData.id,
    }

    try {
      if (editingAddress !== null) {
        await updateAddress(
          userData.addresses[editingAddress].id,
          addressPayload
        )
        const updatedAddresses = [...userData.addresses]
        updatedAddresses[editingAddress] = addressPayload
        setUserData({ ...userData, addresses: updatedAddresses })
        toast.success('Address updated successfully!')
      } else {
        await AddAddress(addressPayload)
        setUserData({
          ...userData,
          addresses: [...userData.addresses, addressPayload],
        })
        toast.success('Address added successfully!')
      }

      setEditingAddress(null)
      setNewAddress({
        street_address: '',
        city: '',
        country: '',
        postal_code: '',
        is_default: false,
      })
    } catch (error) {
      toast.error(
        editingAddress !== null
          ? 'Failed to update address'
          : 'Failed to add address'
      )
      console.error('Address Error:', error)
    }
  }

  // Address management functions
  const handleEditAddress = (index) => {
    setEditingAddress(index)
    setNewAddress(userData.addresses[index])
  }

  const handleDeleteAddress = async (index) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(userData.addresses[index].id)
        const updatedAddresses = userData.addresses.filter(
          (_, i) => i !== index
        )
        setUserData({ ...userData, addresses: updatedAddresses })
        toast.success('Address deleted successfully!')
      } catch (error) {
        toast.error('Failed to delete address')
        console.error('Delete Error:', error)
      }
    }
  }

  const handleSetDefaultAddress = (index) => {
    const updatedAddresses = userData.addresses.map((addr, i) => ({
      ...addr,
      is_default: i === index,
    }))
    setUserData({ ...userData, addresses: updatedAddresses })
  }

  // Change password handler
  const handleChangePassword = async (e) => {
    e.preventDefault()
    setIsPasswordLoading(true)
    try {
      await changepassword({
        old_password: oldPassword,
        new_password: newPassword,
      })
      toast.success('Password changed successfully!')
      setOldPassword('')
      setNewPassword('')
    } catch (error) {
      toast.error('Failed to change password')
      console.error('Change Password Error:', error)
    } finally {
      setIsPasswordLoading(false)
    }
  }

  // Pagination rendering
  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisibleButtons = 5
    let startPage = 1
    let endPage = pagination.totalPages

    if (pagination.totalPages > maxVisibleButtons) {
      const half = Math.floor(maxVisibleButtons / 2)
      if (pagination.currentPage <= half + 1) {
        endPage = maxVisibleButtons
      } else if (pagination.currentPage >= pagination.totalPages - half) {
        startPage = pagination.totalPages - maxVisibleButtons + 1
      } else {
        startPage = pagination.currentPage - half
        endPage = pagination.currentPage + half
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => fetchOrdersData(i)}
          className={`px-3 py-1 rounded-md ${
            pagination.currentPage === i
              ? 'bg-blue-500 text-white'
              : 'bg-white border border-gray-300'
          }`}
        >
          {i}
        </button>
      )
    }

    return buttons
  }

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <div className="max-w-6xl mx-auto mt-32 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">User Profile</h2>
          <div className="flex flex-wrap gap-2">
            {['profile', 'addresses', 'orders', 'change-password'].map(
              (tab) => (
                <button
                  key={tab}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'profile' && <FaUserCircle size={18} />}
                  {tab === 'addresses' && <FaMapMarkerAlt size={18} />}
                  {tab === 'orders' && <FaShoppingBag size={18} />}
                  {tab === 'change-password' && <FaLock size={18} />}{' '}
                  {/* Lock icon for password change */}
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Side Navigation */}
          <div className="bg-gray-100 p-4 md:p-6 rounded-lg md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['profile', 'addresses', 'orders', 'change-password'].map(
                (tab) => (
                  <li key={tab}>
                    <button
                      className={`flex items-center gap-2 w-full p-2 rounded text-gray-600 hover:text-gray-800 ${
                        activeTab === tab ? 'text-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab === 'profile' && <FaUserCircle size={16} />}
                      {tab === 'addresses' && <FaMapMarkerAlt size={16} />}
                      {tab === 'orders' && <FaShoppingBag size={16} />}
                      {tab === 'change-password' && <FaLock size={16} />}
                      {tab.charAt(0).toUpperCase() +
                        tab.slice(1).replace('-', ' ')}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleProfileUpdate()
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                encType="multipart/form-data"
              >
                <div className="md:col-span-2 flex flex-col items-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-2">
                    {userData.photo ? (
                      <img
                        src={
                          typeof userData.photo === 'string'
                            ? userData.photo
                            : URL.createObjectURL(userData.photo)
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="text-gray-400 text-5xl" />
                    )}
                  </div>
                  <label className="cursor-pointer text-blue-500 text-sm">
                    Change Photo
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        setUserData({ ...userData, photo: e.target.files[0] })
                      }
                      accept="image/*"
                    />
                  </label>
                </div>

                {[
                  { label: 'Full Name', key: 'full_name' },
                  { label: 'Display Name', key: 'display_name' },
                  { label: 'Contact Number', key: 'contact_number' },
                  { label: 'Company', key: 'company' },
                  { label: 'NIF', key: 'nif' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={userData[field.key]}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          [field.key]: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    disabled
                    className="w-full p-2 border border-gray-300 bg-gray-100 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <input
                    type="text"
                    value={userData.role}
                    disabled
                    className="w-full p-2 border border-gray-300 bg-gray-100 rounded"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 disabled:bg-blue-400"
                  >
                    {isLoading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Addresses</h3>
                <form
                  onSubmit={handleAddressSubmit}
                  className="mb-6 bg-gray-50 p-4 rounded-lg"
                >
                  <h4 className="font-medium mb-3">
                    {editingAddress !== null
                      ? 'Edit Address'
                      : 'Add New Address'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Street Address', key: 'street_address' },
                      { label: 'City', key: 'city' },
                      { label: 'Country', key: 'country' },
                      { label: 'Postal Code', key: 'postal_code' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium mb-1">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          value={newAddress[field.key]}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              [field.key]: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    ))}

                    <div className="flex items-center md:col-span-2">
                      <input
                        type="checkbox"
                        id="defaultAddress"
                        checked={newAddress.is_default}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            is_default: e.target.checked,
                          })
                        }
                        className="mr-2 h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="defaultAddress" className="text-sm">
                        Set as default address
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    {editingAddress !== null && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAddress(null)
                          setNewAddress({
                            street_address: '',
                            city: '',
                            country: '',
                            postal_code: '',
                            is_default: false,
                          })
                        }}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {editingAddress !== null
                        ? 'Update Address'
                        : 'Add Address'}
                    </button>
                  </div>
                </form>

                {/* Address List */}
                <div className="space-y-4">
                  {userData.addresses.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      No addresses saved yet.
                    </p>
                  ) : (
                    userData.addresses.map((address, index) => (
                      <div
                        key={index}
                        className={`bg-white p-4 rounded-lg shadow relative border-l-4 ${
                          address.is_default
                            ? 'border-blue-500'
                            : 'border-transparent'
                        }`}
                      >
                        <p className="font-semibold">
                          {address.street_address}
                        </p>
                        <p>
                          {address.city}, {address.country}{' '}
                          {address.postal_code}
                        </p>
                        {address.is_default && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                            Default
                          </span>
                        )}
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <button
                            onClick={() => handleEditAddress(index)}
                            className="text-blue-500 hover:text-blue-700 p-1"
                            title="Edit"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Delete"
                          >
                            <FaTrash size={16} />
                          </button>
                          {!address.is_default && (
                            <button
                              onClick={() => handleSetDefaultAddress(index)}
                              className="text-green-500 hover:text-green-700 p-1"
                              title="Set as default"
                            >
                              <FaMapMarkerAlt size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
                  <h3 className="text-lg font-semibold">Your Orders</h3>
                  {pagination.count > 0 && (
                    <p className="text-gray-500 text-sm">
                      Showing {(pagination.currentPage - 1) * 10 + 1}-
                      {Math.min(pagination.currentPage * 10, pagination.count)}{' '}
                      of {pagination.count} orders
                    </p>
                  )}
                </div>

                {ordersData.length === 0 ? (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <FaShoppingBag className="mx-auto text-gray-400 text-4xl mb-3" />
                    <h4 className="text-lg font-medium text-gray-600 mb-1">
                      No orders found
                    </h4>
                    <p className="text-gray-500">
                      You haven't placed any orders yet
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                      {ordersData.map((order) => (
                        <div
                          key={order.id}
                          className="bg-white p-4 md:p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                        >
                          <div className="flex justify-between items-start mb-3 pb-3 border-b">
                            <div>
                              <h4 className="font-semibold text-blue-600">
                                Order #{order.id}
                              </h4>
                              <p className="text-gray-500 text-sm mt-1">
                                {new Date(order.date).toLocaleDateString(
                                  'en-US',
                                  {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  }
                                )}
                              </p>
                            </div>
                            <div className="bg-blue-50 px-2 py-1 rounded">
                              <p className="text-blue-600 font-bold text-sm">
                                ₹{parseFloat(order.amount).toFixed(2)}
                              </p>
                            </div>
                          </div>

                          <div className="pt-3">
                            <h5 className="font-medium mb-2 text-gray-700 text-sm">
                              Products ({order.products.length})
                            </h5>
                            <div className="space-y-3">
                              {order.products.map((product, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between text-sm"
                                >
                                  <div className="flex-1 pr-2">
                                    <p className="font-medium truncate">
                                      {product.product_name}
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                      {product.quantity} × ₹{product.unit_price}
                                    </p>
                                  </div>
                                  <p className="font-medium whitespace-nowrap">
                                    ₹{product.total_price}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {pagination.totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-8">
                        <button
                          onClick={() =>
                            fetchOrdersData(pagination.currentPage - 1)
                          }
                          disabled={pagination.currentPage === 1}
                          className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                          <FaChevronLeft />
                        </button>

                        <div className="flex gap-1">
                          {renderPaginationButtons()}
                        </div>

                        <button
                          onClick={() =>
                            fetchOrdersData(pagination.currentPage + 1)
                          }
                          disabled={
                            pagination.currentPage === pagination.totalPages
                          }
                          className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                          <FaChevronRight />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Change Password Tab */}
            {activeTab === 'change-password' && (
              <form
                onSubmit={handleChangePassword}
                className="bg-gray-50 p-4 rounded-lg"
              >
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Old Password
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isPasswordLoading}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 disabled:bg-blue-400"
                  >
                    {isPasswordLoading ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsPage

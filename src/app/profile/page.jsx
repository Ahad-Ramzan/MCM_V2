'use client'

import { getAllOrders } from '@/apis/products'
import {
  getCurrentUser,
  UpdateUser,
  AddAddress,
  deleteAddress,
  updateAddress,
  changepassword,
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
  FaLock,
  FaPlus,
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
    adr_type: 'Billing',
  })
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [addressFormType, setAddressFormType] = useState('Billing')

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
    setIsLoading(true)
    const addressPayload = {
      ...newAddress,
      user_id: userData.id,
    }

    try {
      if (editingAddress !== null) {
        // Update existing address
        await updateAddress(editingAddress, addressPayload)
        setUserData({
          ...userData,
          addresses: userData.addresses.map((addr) =>
            addr.id === editingAddress
              ? { ...addressPayload, id: editingAddress }
              : addr
          ),
        })
        toast.success('Address updated successfully!')
      } else {
        // Check if address type already exists
        const existingAddress = userData.addresses.find(
          (addr) => addr.adr_type === newAddress.adr_type
        )
        if (existingAddress) {
          toast.error(
            `You already have a ${newAddress.adr_type === 'Billing' ? 'billing' : 'shipping'} address`
          )
          return
        }

        // Add new address
        const response = await AddAddress(addressPayload)
        setUserData({
          ...userData,
          addresses: [...userData.addresses, response],
        })
        toast.success('Address added successfully!')
      }

      // Reset form
      setNewAddress({
        street_address: '',
        city: '',
        country: '',
        postal_code: '',
        adr_type: 'Billing',
      })
      setEditingAddress(null)
      setShowAddressForm(false)
    } catch (error) {
      toast.error(
        editingAddress !== null
          ? 'Failed to update address'
          : 'Failed to add address'
      )
      console.error('Address Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Address management functions
  const handleEditAddress = (address) => {
    setEditingAddress(address.id)
    setNewAddress({
      street_address: address.street_address,
      city: address.city,
      country: address.country,
      postal_code: address.postal_code,
      adr_type: address.adr_type,
    })
    setShowAddressForm(true)
    setAddressFormType(address.adr_type)
  }

  const handleDeleteAddress = async (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(id)
        setUserData({
          ...userData,
          addresses: userData.addresses.filter((addr) => addr.id !== id),
        })
        toast.success('Address deleted successfully!')
      } catch (error) {
        toast.error('Failed to delete address')
        console.error('Delete Error:', error)
      }
    }
  }

  const getAddressByType = (type) => {
    return userData.addresses.find((addr) => addr.adr_type === type)
  }

  const openAddressForm = (type) => {
    setAddressFormType(type)
    setNewAddress({
      street_address: '',
      city: '',
      country: '',
      postal_code: '',
      adr_type: type,
    })
    setEditingAddress(null)
    setShowAddressForm(true)
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
                  {tab === 'change-password' && <FaLock size={18} />}
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
            {/* Profile Tab - unchanged from original */}

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

            {/* Addresses Tab - updated to match checkout page */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-6">Your Addresses</h3>

                {/* Shipping Address */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-gray-700">
                      Shipping Address
                    </h4>
                    {!getAddressByType('Shipping') && (
                      <button
                        onClick={() => openAddressForm('Shipping')}
                        className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700"
                      >
                        <FaPlus size={12} /> Add Shipping Address
                      </button>
                    )}
                  </div>

                  {getAddressByType('Shipping') ? (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">
                            {getAddressByType('Shipping').street_address}
                          </p>
                          <p className="text-gray-600">
                            {getAddressByType('Shipping').city},{' '}
                            {getAddressByType('Shipping').postal_code},{' '}
                            {getAddressByType('Shipping').country}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleEditAddress(getAddressByType('Shipping'))
                            }
                            className="text-blue-500 hover:text-blue-700 p-1"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteAddress(
                                getAddressByType('Shipping').id
                              )
                            }
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                      <FaMapMarkerAlt className="mx-auto text-gray-400 text-2xl mb-2" />
                      <p className="text-gray-500">No shipping address saved</p>
                    </div>
                  )}
                </div>

                {/* Billing Address */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-gray-700">
                      Billing Address
                    </h4>
                    {!getAddressByType('Billing') && (
                      <button
                        onClick={() => openAddressForm('Billing')}
                        className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700"
                      >
                        <FaPlus size={12} /> Add Billing Address
                      </button>
                    )}
                  </div>

                  {getAddressByType('Billing') ? (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">
                            {getAddressByType('Billing').street_address}
                          </p>
                          <p className="text-gray-600">
                            {getAddressByType('Billing').city},{' '}
                            {getAddressByType('Billing').postal_code},{' '}
                            {getAddressByType('Billing').country}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleEditAddress(getAddressByType('Billing'))
                            }
                            className="text-blue-500 hover:text-blue-700 p-1"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteAddress(
                                getAddressByType('Billing').id
                              )
                            }
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                      <FaMapMarkerAlt className="mx-auto text-gray-400 text-2xl mb-2" />
                      <p className="text-gray-500">No billing address saved</p>
                    </div>
                  )}
                </div>

                {/* Address Form */}
                {showAddressForm && (
                  <div className="border-t pt-6 mt-6">
                    <h4 className="text-lg font-medium mb-4">
                      {editingAddress ? 'Edit' : 'Add'} {addressFormType}{' '}
                      Address
                    </h4>
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          value={newAddress.street_address}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              street_address: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                city: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            value={newAddress.postal_code}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                postal_code: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          value={newAddress.country}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              country: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddressForm(false)}
                          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          {editingAddress ? 'Update Address' : 'Save Address'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

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

            {/* Orders Tab - unchanged from original */}

            {/* Change Password Tab - unchanged from original */}
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsPage

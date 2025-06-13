'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import {
  deleteAddress,
  getAddress,
  getUserById,
  updateAddress,
  updateUserdata,
} from '@/apis/userApi'
import { useParams } from '../../../../../node_modules/next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { getAllHistory, getOrderById } from '@/apis/products'

const initialLojasData = [
  {
    name: 'DAAG - Food Solutions, LDA',
    address:
      'Rua Vale das Chousas nº 7 Zona Industrial Oliveira do Bairro, 3770-203',
    phone: '234758436',
  },
  {
    name: 'DAAG - Food Solutions, LDA',
    address: 'Passeig de la Riera Nº 85 bajos Barcelona, 08191',
    phone: '',
  },
]

const utilizadoresData = [
  {
    name: 'Super-Admin',
    email: 'admin@vondingo.pt',
    estado: '1',
    dataRegisto: 'há 11 meses',
  },
  {
    name: 'Mariano Andrade',
    email: 'marketing@vendin-go.com',
    estado: '1',
    dataRegisto: 'há 11 meses',
  },
]

function LojaEditModal({ open, loja, onClose, onSave }) {
  const [form, setForm] = useState({
    street_address: '',
    city: '',
    country: '',
    postal_code: '',
    is_default: false,
  })

  React.useEffect(() => {
    if (loja) {
      setForm({
        street_address: loja.street_address || '',
        city: loja.city || '',
        country: loja.country || '',
        postal_code: loja.postal_code || '',
        is_default: loja.is_default || false,
      })
    }
  }, [loja])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-[#f9f6ef] rounded-lg shadow-lg w-full max-w-2xl p-6 relative animate-fade-in">
        <h3 className="text-lg font-semibold mb-4">Editar Endereço</h3>
        <button
          className="absolute top-3 right-3 text-gray-500 text-2xl"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSave(form)
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Endereço</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={form.street_address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, street_address: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Cidade</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={form.city}
                onChange={(e) =>
                  setForm((f) => ({ ...f, city: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">País</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={form.country}
                onChange={(e) =>
                  setForm((f) => ({ ...f, country: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Código Postal</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={form.postal_code}
                onChange={(e) =>
                  setForm((f) => ({ ...f, postal_code: e.target.value }))
                }
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_default"
                checked={form.is_default}
                onChange={(e) =>
                  setForm((f) => ({ ...f, is_default: e.target.checked }))
                }
                className="mr-2"
              />
              <label htmlFor="is_default" className="text-sm">
                Definir como endereço principal
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded"
              onClick={onClose}
            >
              Fechar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AddAddressModal({ open, onClose, onAdd, userId }) {
  const [form, setForm] = useState({
    street_address: '',
    city: '',
    country: '',
    postal_code: '',
    is_default: false,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token =
        localStorage.getItem('access_token') ||
        '2f845a19f899034bba9a49419e58b575e8fb3418'

      const payload = {
        ...form,
        user_id: userId,
      }

      const response = await fetch(
        'https://backendmcm.estelatechnologies.com/api/user/addresses/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${token}`,
          },
          body: JSON.stringify(payload),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to add address')
      }

      const data = await response.json()
      toast.success('Address added successfully!')
      onAdd(data)
      onClose()
      // Reset form after successful submission
      setForm({
        street_address: '',
        city: '',
        country: '',
        postal_code: '',
        is_default: false,
      })
    } catch (error) {
      console.error('Error adding address:', error)
      toast.error('Failed to add address. Please try again.')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-[#f9f6ef] rounded-lg shadow-lg w-full max-w-2xl p-6 relative animate-fade-in">
        <h3 className="text-lg font-semibold mb-4">Adicionar Novo Endereço</h3>
        <button
          className="absolute top-3 right-3 text-gray-500 text-2xl"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Endereço</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={form.street_address}
                onChange={(e) =>
                  setForm({ ...form, street_address: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Cidade</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">País</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Código Postal</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={form.postal_code}
                onChange={(e) =>
                  setForm({ ...form, postal_code: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const ClientDetailPage = () => {
  const [activeTab, setActiveTab] = useState('info')
  const [showLojaModal, setShowLojaModal] = useState(false)
  const [showAddAddressModal, setShowAddAddressModal] = useState(false)
  const [address, setAddress] = useState([])
  console.log(address, 'clients Addresses--------')

  const params = useParams()
  const clientId = params.params
  console.log(clientId, 'user Id')
  const [clients, setClientdata] = useState([])
  console.log(clients, 'each clients')

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

  // Add file input ref
  const fileInputRef = React.useRef(null)

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      // Create FormData
      const formDataToSend = new FormData()
      formDataToSend.append('photo', file)
      formDataToSend.append('full_name', formData.full_name)
      formDataToSend.append('contact_number', formData.contact_number)
      formDataToSend.append('is_active', formData.is_active)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('bio', formData.bio)
      formDataToSend.append('company', formData.company)
      formDataToSend.append('nif', formData.nif)

      const token =
        localStorage.getItem('access_token') ||
        '2f845a19f899034bba9a49419e58b575e8fb3418'

      // Update user with new image using fetch directly
      const response = await fetch(
        `https://backendmcm.estelatechnologies.com/api/user/users/${clientId}/`,
        {
          method: 'PUT',
          headers: {
            Authorization: `token ${token}`,
          },
          body: formDataToSend,
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update photo')
      }

      const data = await response.json()

      // Update the formData state with the new photo URL immediately
      setFormData((prev) => ({
        ...prev,
        photo: data.photo, // Update with the new photo URL from response
      }))

      // Also update the clients state to reflect the new photo
      setClientdata((prev) => ({
        ...prev,
        photo: data.photo,
      }))

      toast.success('Profile photo updated successfully!')
    } catch (error) {
      console.error('Failed to update photo:', error)
      toast.error('Failed to update profile photo. Please try again.')
    }
  }

  // Handle alterar button click
  const handleAlterarClick = () => {
    fileInputRef.current?.click()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserById(clientId)
        setClientdata(response)
        // Set form data when client data is fetched
        setFormData({
          full_name: response.full_name || '',
          contact_number: response.contact_number || '',
          is_active: response.is_active || true,
          email: response.email || '',
          bio: response.bio || '',
          company: response.company || '',
          nif: response.nif || '',
          photo: response.photo || '',
        })
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    if (clientId) {
      fetchData()
    }
  }, [])

  //edit
  const [editingAddressId, setEditingAddressId] = useState(null)
  const [editingAddressData, setEditingAddressData] = useState(null)

  function handleEditLoja(id) {
    const addr = address?.results?.find((a) => a.id === id)
    setEditingAddressId(id)
    setEditingAddressData(addr)
    setShowLojaModal(true)
  }

  //editfunction

  async function handleSaveLoja(form) {
    try {
      const payload = {
        ...form,
        user_id: clientId,
      }
      await updateAddress(editingAddressId, payload)

      // Refresh both client data and address data
      const response = await getUserById(clientId)
      setClientdata(response)
      await fetchdata()

      setShowLojaModal(false)
      setEditingAddressId(null)
      setEditingAddressData(null)
      toast.success('Address updated successfully!')
    } catch (e) {
      console.error('Error updating address:', e)
      toast.error('Failed to update address. Please try again.')
    }
  }

  function handleCloseLojaModal() {
    setShowLojaModal(false)
    setEditingLojaIndex(null)
  }

  const handleDeleteLoja = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this address?'
    )
    if (!confirmDelete) return

    try {
      await deleteAddress(id)

      // Refresh both client data and address data
      const response = await getUserById(clientId)
      setClientdata(response)
      await fetchdata()

      toast.success('Address deleted successfully!')
    } catch (error) {
      console.error('Failed to delete address:', error)
      toast.error('Failed to delete address. Please try again.')
    }
  }

  const handleAddAddress = async (newAddress) => {
    // Refresh both client data and address data
    const response = await getUserById(clientId)
    setClientdata(response)
    await fetchdata()
  }

  const fetchdata = async () => {
    try {
      const response = await getAddress()
      setAddress(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    fetchdata()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdate = async () => {
    try {
      // Create payload without photo
      const { photo, ...updatePayload } = formData

      await updateUserdata(clientId, updatePayload)
      // Refresh data after update
      const response = await getUserById(clientId)
      setClientdata(response)
      toast.success('User information updated successfully!')
    } catch (error) {
      console.error('Failed to update user:', error)
      toast.error('Failed to update user information. Please try again.')
    }
  }

  // Add new state for selected address
  const [selectedAddressId, setSelectedAddressId] = useState(null)

  // Add function to handle address selection
  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId)
  }

  return (
    <ContainerDefault title="Editar Comprador">
      <HeaderDashboard
        title="Editar Comprador"
        description="Editar dados do comprador"
      />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      <div className="min-h-screen p-8 bg-gray-50">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center">
          <span className="hover:text-primary cursor-pointer">Clientes</span>
          <span className="mx-2">›</span>
          <span className="text-primary font-semibold">Editar Comprador</span>
        </div>

        {/* Page Title */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">EDITAR COMPRADOR</h2>
          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                clients.is_active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {clients.is_active ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section */}
          <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
            {/* Tabs */}
            <div className="flex border-b mb-8">
              <button
                className={`px-6 py-3 border-b-2 font-semibold text-sm transition-colors ${
                  activeTab === 'info'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-primary'
                }`}
                onClick={() => setActiveTab('info')}
              >
                Informação geral
              </button>
              <button
                className={`px-6 py-3 border-b-2 font-semibold text-sm transition-colors ${
                  activeTab === 'lojas'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-primary'
                }`}
                onClick={() => setActiveTab('lojas')}
              >
                Addresses
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'info' && (
              <div className="flex flex-col md:flex-row gap-8">
                {/* Logo */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-4xl shadow-inner overflow-hidden">
                    {formData.photo ? (
                      <img
                        src={formData.photo}
                        alt="Client Logo"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src="https://backendmcm.estelatechnologies.com/media/profile_photos/doctor_kTCy0cx.jpeg"
                        alt="Default Profile"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={handleAlterarClick}
                    className="text-sm text-primary hover:text-primary-dark transition-colors"
                  >
                    Alterar foto
                  </button>
                  <span className="text-xs text-gray-500">
                    Logotipo da empresa
                  </span>
                </div>

                {/* Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      value={formData.full_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIF
                    </label>
                    <input
                      type="text"
                      name="nif"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      value={formData.nif}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="text"
                      name="contact_number"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      value={formData.contact_number}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Bio Field */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <button
                      onClick={handleUpdate}
                      className="bg-primary text-white px-8 py-2.5 rounded-lg shadow-sm hover:bg-primary-dark transition-colors flex items-center gap-2"
                    >
                      <span>Atualizar</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lojas' && (
              <div>
                <button
                  className="bg-primary text-white px-6 py-2.5 rounded-lg shadow-sm hover:bg-primary-dark transition-colors mb-6 flex items-center gap-2"
                  onClick={() => setShowAddAddressModal(true)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Adicionar Endereço</span>
                </button>
                {/* <div className="mb-6 text-base font-medium text-gray-700">
                  Por favor selecione a sua morada de faturação:
                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {clients.addresses?.map((loja) => (
                    <div
                      key={loja.id}
                      onClick={() => handleAddressSelect(loja.id)}
                      className={`bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer relative ${
                        selectedAddressId === loja.id
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-gray-200'
                      }`}
                    >
                      {/* Check Icon for selected address */}
                      {selectedAddressId === loja.id && (
                        <div className="absolute top-4 left-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}

                      <div
                        className={`font-semibold text-gray-800 mb-2 ${selectedAddressId === loja.id ? 'ml-8' : ''}`}
                      >
                        {loja.city}
                      </div>
                      <div className="text-gray-600 text-sm mb-2">
                        {loja.street_address}
                      </div>
                      <div className="text-gray-500 text-sm mb-4">
                        {loja.country}, {loja.postal_code}
                      </div>

                      {loja.phone && (
                        <div className="text-gray-500 text-sm mb-4">
                          Tlf: {loja.phone}
                        </div>
                      )}

                      <div className="flex gap-4 mt-4 pt-4 border-t">
                        <button
                          className="text-primary hover:text-primary-dark transition-colors text-sm font-medium flex items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditLoja(loja.id)
                          }}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Editar
                        </button>

                        <button
                          className="text-red-600 hover:text-red-700 transition-colors text-sm font-medium flex items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteLoja(loja.id)
                          }}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="w-full md:w-[340px] flex flex-col gap-6">
            {/* More Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Mais informação
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Primavera ID
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50"
                    value={`${clientId.toString().padStart()}`}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Categoria Preços *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50"
                    value="[PVU P] Varejista PT"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Resumo
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    TOTAL ENCOMENDAS
                  </span>
                  <span className="font-medium text-gray-800">
                    {clients?.total_orders || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">TOTAL COMPRADO</span>
                  <span className="font-medium text-gray-800">
                    {clients?.total_order_amount?.toFixed(2) || '0.00'}€
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LojaEditModal
        open={showLojaModal}
        loja={editingAddressData}
        onClose={() => {
          setShowLojaModal(false)
          setEditingAddressId(null)
          setEditingAddressData(null)
        }}
        onSave={handleSaveLoja}
        userId={clientId}
      />

      <AddAddressModal
        open={showAddAddressModal}
        onClose={() => setShowAddAddressModal(false)}
        onAdd={handleAddAddress}
        userId={clientId}
      />
    </ContainerDefault>
  )
}

export default ClientDetailPage

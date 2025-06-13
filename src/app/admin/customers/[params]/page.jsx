'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import {
  deleteAddress,
  getAddress,
  getUserById,
  updateAddress,
} from '@/apis/userApi'
import { useParams } from '../../../../../node_modules/next/navigation'
import toast, { Toaster } from 'react-hot-toast'

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserById(clientId)
        setClientdata(response)
        console.log(response, 'clients data respnse------------------------')
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
      <div className="min-h-screen p-8">
        {/* Breadcrumb */}
        <div className="text-right text-sm text-gray-500 mb-2">
          Clientes &gt;{' '}
          <span className="text-primary font-semibold">Editar Comprador</span>
        </div>

        {/* Page Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          EDITAR COMPRADOR
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {/* Tabs */}
            <div className="flex border-b mb-6">
              <button
                className={`px-4 py-2 border-b-2 font-semibold rounded-t ${
                  activeTab === 'info'
                    ? 'border-primary text-primary bg-white'
                    : 'border-transparent text-gray-600 bg-transparent'
                }`}
                onClick={() => setActiveTab('info')}
              >
                Informação geral
              </button>
              <button
                className={`px-4 py-2 border-b-2 font-semibold rounded-t ml-2 ${
                  activeTab === 'lojas'
                    ? 'border-primary text-primary bg-white'
                    : 'border-transparent text-gray-600 bg-transparent'
                }`}
                onClick={() => setActiveTab('lojas')}
              >
                Lojas
              </button>
              {/* <button
                className={`px-4 py-2 border-b-2 font-semibold rounded-t ml-2 ${
                  activeTab === 'utilizadores'
                    ? 'border-primary text-primary bg-white'
                    : 'border-transparent text-gray-600 bg-transparent'
                }`}
                onClick={() => setActiveTab('utilizadores')}
              >
                Utilizadores
              </button> */}
            </div>

            {/* Tab Content */}
            {activeTab === 'info' && (
              <div className="flex flex-col md:flex-row gap-6">
                {/* Logo */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-3xl">
                    {clients.photo ? (
                      <img
                        src={clients.photo}
                        alt="Client Logo"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span>🖼️</span>
                    )}
                  </div>
                  <button className="text-xs text-primary underline">
                    Alterar
                  </button>
                  <span className="text-xs text-gray-500 mt-1">
                    Logotipo da empresa
                  </span>
                </div>

                {/* Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      value={clients.full_name || ''}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full border rounded px-3 py-2"
                      value={clients.email || ''}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      NIF
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      value={clients.nif || 'N/A'}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Telefone
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      value={clients.contact_number || 'N/A'}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      value={clients.company || 'N/A'}
                      readOnly
                    />
                  </div>

                  {/* Bio Field (if needed) */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Bio
                    </label>
                    <textarea
                      className="w-full border rounded px-3 py-2"
                      value={clients.bio || ''}
                      readOnly
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'lojas' && (
              <div>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded mb-4"
                  onClick={() => setShowAddAddressModal(true)}
                >
                  Adicionar Endereço
                </button>
                <div className="mb-3 text-base font-medium">
                  Por favor selecione a sua morada de faturação:
                </div>
                <div className="flex flex-wrap gap-4">
                  {clients.addresses?.map((loja) => (
                    <div
                      key={loja.id}
                      className="flex-1 min-w-[270px] bg-gray-50 border rounded-lg p-4 shadow-sm"
                    >
                      <div className="font-semibold text-gray-800 mb-1">
                        {loja.city}
                      </div>
                      <div className="text-gray-700 text-sm mb-1">
                        {loja.street_address}
                      </div>
                      <div className="text-gray-600 text-sm mb-1">
                        {loja.country}, {loja.postal_code}
                      </div>

                      {loja.phone && (
                        <div className="text-gray-600 text-xs mb-2">
                          Tlf: {loja.phone}
                        </div>
                      )}

                      <div className="flex gap-3 mt-2">
                        <button
                          className="text-primary text-sm font-medium underline"
                          onClick={() => handleEditLoja(loja.id)}
                        >
                          Editar
                        </button>

                        <button
                          className="text-red-600 text-sm font-medium underline"
                          onClick={() => handleDeleteLoja(loja.id)}
                        >
                          Apagar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

            {/* {activeTab === 'utilizadores' && (
              <div>
                <table className="min-w-full bg-white border border-gray-200 rounded">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b text-left text-base font-medium text-gray-700">
                        Nome
                      </th>
                      <th className="px-4 py-2 border-b text-left text-base font-medium text-gray-700">
                        Email
                      </th>
                      <th className="px-4 py-2 border-b text-left text-base font-medium text-gray-700">
                        Estado
                      </th>
                      <th className="px-4 py-2 border-b text-left text-base font-medium text-gray-700">
                        Data registo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {utilizadoresData.map((user, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b text-base font-medium">
                          {user.name}
                        </td>
                        <td className="px-4 py-2 border-b text-base font-medium">
                          {user.email}
                        </td>
                        <td className="px-4 py-2 border-b text-base font-medium">
                          {user.estado}
                        </td>
                        <td className="px-4 py-2 border-b text-base font-medium">
                          {user.dataRegisto}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )} */}
          </div>

          {/* Right Section */}
          <div className="w-full md:w-[340px] flex flex-col gap-6">
            {/* More Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-base font-semibold mb-4">Mais informação</h3>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-xs mb-1">Primavera ID</label>
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1 text-sm"
                    value="0001"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">
                    Categoria Preços *
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1 text-sm"
                    value="[PVU P] Varejista PT"
                    readOnly
                  />
                </div>
              </div>
            </div>
            {/* Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-base font-semibold mb-4">Resumo</h3>
              <div className="flex justify-between text-sm mb-1">
                <span>TOTAL ENCOMENDAS</span>
                <span>{clients?.total_orders || 0}</span>{' '}
                {/* Changed from total_order to total_orders */}
              </div>
              <div className="flex justify-between text-sm">
                <span>TOTAL COMPRADO</span>
                <span>
                  {clients?.total_order_amount?.toFixed(2) || '0.00'}€
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3">
          <button className="bg-primary text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">
            Atualizar
          </button>
          {/* <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded shadow">
            Login
          </button> */}
        </div>
      </div>
    </ContainerDefault>
  )
}

export default ClientDetailPage

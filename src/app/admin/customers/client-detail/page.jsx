// id: client-detail-page
// name: Client Detail Page with Utilizadores Tab
// type: tsx
// content: |-
'use client'
import React, { useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'

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
  {
    name: 'João Fernandes',
    email: 'joao.fernandes@vondin-go.com',
    estado: '1',
    dataRegisto: 'há 2 semanas',
  },
  {
    name: 'Beatriz Lima @ Finance',
    email: 'finance@vendin-go.com',
    estado: '1',
    dataRegisto: 'há 2025 anos',
  },
  {
    name: 'Edgar Gomes @ Shipping',
    email: 'shipping@vendin-go.com',
    estado: '1',
    dataRegisto: 'há 2025 anos',
  },
  {
    name: 'Henrique @ vendinGO',
    email: 'tech@vendin-go.com',
    estado: '1',
    dataRegisto: 'há 2025 anos',
  },
  {
    name: 'Joana Cardoso @ Supply',
    email: 'supply@vendin-go.com',
    estado: '1',
    dataRegisto: 'há 2025 anos',
  },
  {
    name: 'José Marinheiro @ Finance',
    email: 'jose.marinheiro@vendin-go.com',
    estado: '1',
    dataRegisto: 'há 2025 anos',
  },
  {
    name: 'David Baeza',
    email: 'david.baeza@vendin-go.com',
    estado: '1',
    dataRegisto: 'há 1 semana',
  },
]

function LojaEditModal({ open, loja, onClose, onSave }) {
  const [form, setForm] = useState(loja || {})

  // Update form when loja changes
  React.useEffect(() => {
    setForm(loja || {})
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
            <div>
              <label className="block text-sm mb-1">Nome</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={form.name || ''}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Contacto</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={form.phone || ''}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Morada</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={form.address || ''}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
              />
            </div>
          </div>
          {/* You can add more fields here as needed */}
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

const ClientDetailPage = () => {
  const [activeTab, setActiveTab] = useState('info')
  const [lojas, setLojas] = useState(initialLojasData)
  const [showLojaModal, setShowLojaModal] = useState(false)
  const [editingLojaIndex, setEditingLojaIndex] = useState(null)

  // Handler to open modal for editing
  function handleEditLoja(idx) {
    setEditingLojaIndex(idx)
    setShowLojaModal(true)
  }

  // Handler to close modal
  function handleCloseLojaModal() {
    setShowLojaModal(false)
    setEditingLojaIndex(null)
  }

  // Handler to save loja changes
  function handleSaveLoja(updatedLoja) {
    setLojas((prev) =>
      prev.map((l, idx) => (idx === editingLojaIndex ? updatedLoja : l))
    )
    handleCloseLojaModal()
  }

  return (
    <ContainerDefault title="Editar Comprador">
      <HeaderDashboard
        title="Editar Comprador"
        description="Editar dados do comprador"
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
              <button
                className={`px-4 py-2 border-b-2 font-semibold rounded-t ml-2 ${
                  activeTab === 'utilizadores'
                    ? 'border-primary text-primary bg-white'
                    : 'border-transparent text-gray-600 bg-transparent'
                }`}
                onClick={() => setActiveTab('utilizadores')}
              >
                Utilizadores
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'info' && (
              <div className="flex flex-col md:flex-row gap-6">
                {/* Logo */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-3xl">
                    <span>🖼️</span>
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
                      value="DAAG - Food Solutions, LDA"
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
                      value="geral@detalhealimentar.pt"
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
                      value="516237802"
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
                      value="234758436"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Desconto Comercial
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded px-3 py-2"
                      value="0.00"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Desconto Comercial - Descritivo
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      value=""
                      readOnly
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Condições de Pagamento
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      value="Fatura 30 dias"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lojas' && (
              <div>
                <button className="bg-green-600 text-white px-4 py-2 rounded mb-4">
                  Adicionar Endereço
                </button>
                <div className="mb-3 text-base font-medium">
                  Por favor selecione a sua morada de faturação:
                </div>
                <div className="flex flex-wrap gap-4">
                  {lojas.map((loja, idx) => (
                    <div
                      key={idx}
                      className="flex-1 min-w-[270px] bg-gray-50 border rounded-lg p-4 shadow-sm"
                    >
                      <div className="font-semibold text-gray-800 mb-1">
                        {loja.name}
                      </div>
                      <div className="text-gray-700 text-sm mb-1">
                        {loja.address}
                      </div>
                      {loja.phone && (
                        <div className="text-gray-600 text-xs mb-2">
                          Tlf: {loja.phone}
                        </div>
                      )}
                      <div className="flex gap-3 mt-2">
                        <button
                          className="text-primary text-sm font-medium underline"
                          onClick={() => handleEditLoja(idx)}
                        >
                          Editar
                        </button>
                        <button className="text-red-600 text-sm font-medium underline">
                          Apagar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal should be here, outside the tab content */}
            <LojaEditModal
              open={showLojaModal}
              loja={editingLojaIndex !== null ? lojas[editingLojaIndex] : null}
              onClose={handleCloseLojaModal}
              onSave={handleSaveLoja}
            />

            {activeTab === 'utilizadores' && (
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
            )}
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
                <span>0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>TOTAL COMPRADO</span>
                <span>0,00€</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3">
          <button className="bg-primary text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">
            Atualizar
          </button>
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded shadow">
            Login
          </button>
        </div>
      </div>
    </ContainerDefault>
  )
}

export default ClientDetailPage

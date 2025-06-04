'use client'
import React, { useEffect, useState } from 'react'
import { getAllHistory } from '@/apis/products'

const OrderDetailPage = () => {
  const [Historydata, setHistorydata] = useState([])

  const fetchData = async () => {
    try {
      const response = await getAllHistory()
      setHistorydata(response)
    } catch (error) {
      console.error('Failed to fetch order history:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  let subtotal = 0
  let shipping = 0
  let tax = 0
  let total = 0

  if (Historydata.length > 0) {
    const firstOrder = Historydata[0]
    subtotal = firstOrder.products.reduce(
      (sum, product) => sum + (product.total_price || 0),
      0
    )
    shipping = firstOrder.shipping || 0
    tax = firstOrder.tax || 0
    total = subtotal + shipping + tax
  }

  return (
    <section className="p-6 bg-gray-50 min-h-screen mt-30">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Orders */}
        <div className="lg:col-span-2 space-y-6">
          {/* Products Table */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Descrição do Pedido</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="p-3">Produto</th>
                    <th className="p-3">Preço</th>
                    <th className="p-3">Quantidade</th>
                    <th className="p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Historydata.map((order, i) =>
                    order.products.map((product, j) => (
                      <tr key={`${i}-${j}`} className="border-b">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.product_name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span>{product.product_name}</span>
                        </td>
                        <td className="p-3">{product.unit_price} €</td>
                        <td className="p-3">{product.quantity}</td>
                        <td className="p-3">{product.total_price} €</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded-lg shadow max-w-sm ml-auto">
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-2">Sub Total:</td>
                  <td className="py-2 text-right">{subtotal.toFixed(2)} €</td>
                </tr>
                <tr>
                  <td className="py-2">Entrega:</td>
                  <td className="py-2 text-right">{shipping.toFixed(2)} €</td>
                </tr>
                <tr>
                  <td className="py-2">Impostos:</td>
                  <td className="py-2 text-right">{tax.toFixed(2)} €</td>
                </tr>
                <tr className="border-t font-semibold text-blue-600">
                  <td className="py-2">Total:</td>
                  <td className="py-2 text-right">{total.toFixed(2)} €</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Status & History */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Status */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-4">
                Estado da Encomenda
              </h4>
              <select className="w-full p-2 border rounded text-sm mb-4">
                <option>🟡 Em Preparação</option>
                <option>🚚 Enviado</option>
                <option>✅ Entregue</option>
                <option>❌ Cancelado</option>
              </select>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm">
                Alterar Estado
              </button>
            </div>

            {/* Order History */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-4">Histórico</h4>
              <div className="space-y-4">
                {Historydata.map((order, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Order #{order.id} - {order.products[0]?.product_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.date
                          ? new Date(order.date).toLocaleString()
                          : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Customer Info */}
        <div className="space-y-6">
          {Historydata.map(
            (order, index) =>
              order.delivery_info && (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow text-sm"
                >
                  <h4 className="text-lg font-semibold mb-4">
                    Detalhes do Cliente
                  </h4>
                  <div className="space-y-2">
                    <p className="font-medium">
                      {order.delivery_info.recipient_name}
                    </p>
                    <p>{order.delivery_info.address}</p>
                    <p>
                      {order.delivery_info.city}, {order.delivery_info.country}
                    </p>
                    <p>Telefone: {order.delivery_info.phone_number}</p>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  )
}

export default OrderDetailPage

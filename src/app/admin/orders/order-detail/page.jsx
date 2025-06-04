'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import ModuleOrderShippingInformation from '@/components/SuperAdmin/partials/orders/ModuleOrderShippingInformation'
import { getAllHistory } from '@/apis/products'

const OrderDetailPage = () => {
  const orderItems = [
    {
      name: 'Ferrero - Kinder Diétric 39 or',
      price: 330,
      image: '/images/kinder.jpg', // Update path as needed
    },
    {
      name: 'Pedido do Artileno - soltame 60 or',
      price: 300,
      image: '/images/salami.jpg', // Update path as needed
    },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * 4, 0)
  const shipping = 50.0
  const tax = 83.34
  const total = subtotal + shipping + tax

  const [Historydata, setHistorydata] = useState([])
  console.log(Historydata, 'state history data -----------------------')

  const fetchData = async () => {
    try {
      const response = await getAllHistory()
      console.log(response, 'history data------------------')
      setHistorydata(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  //   useEffect(() => {
  //     window.location.reload()
  //   }, [])

  //   useEffect(() => {
  //     const alreadyReloaded = localStorage.getItem('orderPageReloaded')

  //     if (!alreadyReloaded) {
  //       localStorage.setItem('orderPageReloaded', 'true')
  //       window.location.reload()
  //     }

  //     // Optional: clear flag when leaving the page (if needed)
  //     return () => {
  //       localStorage.removeItem('orderPageReloaded')
  //     }
  //   }, [])

  return (
    <ContainerDefault title="Order Detail">
      <HeaderDashboard
        title="Order Detail"
        description="Martfury Order Details Overview"
      />

      {/* Order Header */}
      {/* <div className="ps-card mb-4 bg-white shadow-sm p-4 rounded">
        <div className="d-flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              DETALHES DO PEDIDO
            </h2>
            <h3 className="text-base text-gray-600">
              Pedido: <strong>1x320 *</strong>
            </h3>
          </div>
        </div>
      </div> */}

      <section className="ps-dashboard">
        <div className="row">
          {/* Left Column */}
          <div className="col-lg-8 col-md-7">
            {/* Products Table */}
            <div className="ps-card mb-4 bg-white p-4 shadow-sm rounded">
              <h4 className="mb-4 text-lg font-semibold text-gray-800">
                Descrição do Pedido
              </h4>
              <div className="table-responsive">
                <table className="table ps-table text-base">
                  <thead className="bg-gray-100 text-gray-700 text-lg">
                    <tr>
                      <th>Produto</th>
                      <th>Preço</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {Historydata.map((item, index) => (
                      <tr key={index} className="text-base">
                        <td className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span>{item.product_name}</span>
                        </td>
                        <td>{item.price} €</td>
                        <td>4</td>
                        <td>{item.price * 4} €</td>
                      </tr>
                    ))} */}

                    {Historydata?.map((order, index) =>
                      order.products.map((product, pIndex) => (
                        <tr key={`${index}-${pIndex}`} className="text-base">
                          <td className="flex items-center gap-2">
                            <img
                              src={product.image}
                              alt={product.product_name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <span>{product.product_name}</span>
                          </td>
                          <td>{product.unit_price} €</td>
                          <td>{product.quantity}</td>
                          <td>{product.total_price} €</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div
              className="ps-card mb-4 p-4 shadow-sm bg-white rounded"
              style={{ maxWidth: '400px', marginLeft: 'auto' }}
            >
              <table className="table ps-table text-base">
                <tbody className="text-base">
                  <tr>
                    <td>Sub Total:</td>
                    <td className="text-end">{subtotal.toFixed(2)} €</td>
                  </tr>
                  <tr>
                    <td>Entrega:</td>
                    <td className="text-end">{shipping.toFixed(2)} €</td>
                  </tr>
                  <tr>
                    <td>Impostos:</td>
                    <td className="text-end">{tax.toFixed(2)} €</td>
                  </tr>
                  <tr className="border-t">
                    <td className="font-semibold">Total:</td>
                    <td className="text-end font-semibold text-primary">
                      {total.toFixed(2)} €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Status and History */}
            <div className="row">
              {/* Order Status */}
              <div className="col-md-5">
                <div className="ps-card mb-4 p-4 bg-white shadow-sm rounded">
                  <h4 className="mb-3 text-lg text-gray-800 font-semibold">
                    Estado da Encomenda
                  </h4>
                  <div className="mb-3">
                    <select className="form-select text-base">
                      <option>🟡 Em Preparação</option>
                      <option>🚚 Enviado</option>
                      <option>✅ Entregue</option>
                      <option>❌ Cancelado</option>
                    </select>
                  </div>
                  <button className="ps-btn ps-btn--sm ps-btn--primary w-full text-base">
                    Alterar Estado
                  </button>
                </div>
              </div>

              {/* Order History */}
              <div className="col-md-7">
                <div className="ps-card mb-4 p-4 bg-white shadow-sm rounded">
                  <h4 className="mb-3 text-lg text-gray-800 font-semibold">
                    Histórico
                  </h4>
                  <div className="space-y-4 text-base">
                    {Historydata?.map((order, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5"></div>
                        <div>
                          <p className="mb-1 text-gray-700">
                            Order #{order.id} -{' '}
                            {order.products[0]?.product_name}
                          </p>
                          <small className="text-muted">
                            {new Date(order.date).toLocaleString()}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Customer Info */}
          <div className="col-lg-4 col-md-5">
            {Historydata?.map(
              (order, index) =>
                order.delivery_info && (
                  <div
                    key={index}
                    className="ps-card mb-4 p-4 bg-white shadow-sm rounded"
                  >
                    <h4 className="mb-3 text-lg text-gray-800 font-semibold">
                      Detalhes do Cliente
                    </h4>
                    <div className="space-y-2 text-base">
                      <p>
                        <strong>{order.delivery_info.recipient_name}</strong>
                      </p>
                      <p>{order.delivery_info.address}</p>
                      <p>
                        {order.delivery_info.city},{' '}
                        {order.delivery_info.country}
                      </p>
                      <p>Telefone: {order.delivery_info.phone_number}</p>
                    </div>
                  </div>
                )
            )}

            {/* <ModuleOrderShippingInformation /> */}
          </div>
        </div>
      </section>
    </ContainerDefault>
  )
}

export default OrderDetailPage

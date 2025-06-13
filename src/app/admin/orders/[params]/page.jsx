'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import { getOrderById } from '@/apis/products'
import { useParams } from 'next/navigation'

const OrderDetailPage = () => {
  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const params = useParams()
  const orderId = params.params

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true)
        const response = await getOrderById(orderId)
        setOrderDetails(response)
      } catch (err) {
        setError(err.message || 'Failed to fetch order details')
        console.error('Error fetching order:', err)
      } finally {
        setLoading(false)
      }
    }

    if (orderId) fetchOrderData()
  }, [orderId])

  // Calculate order totals
  const subtotal =
    orderDetails?.products?.reduce(
      (sum, item) => sum + parseFloat(item.total_price),
      0
    ) || 0
  const shipping = 50.0
  const tax = 83.34
  const total = subtotal + shipping + tax

  if (loading)
    return (
      <ContainerDefault title="Loading...">
        <div className="text-center py-8">Loading order details...</div>
      </ContainerDefault>
    )

  if (error)
    return (
      <ContainerDefault title="Error">
        <div className="text-center py-8 text-red-500">{error}</div>
      </ContainerDefault>
    )

  if (!orderDetails)
    return (
      <ContainerDefault title="Not Found">
        <div className="text-center py-8">Order not found</div>
      </ContainerDefault>
    )

  return (
    <ContainerDefault title={`Order #${orderDetails.id}`}>
      <HeaderDashboard
        title={`Order #${orderDetails.id}`}
        description="Order Details Overview"
      />

      <section className="ps-dashboard">
        <div className="row">
          {/* Left Column - Order Items */}
          <div className="col-lg-8 col-md-7">
            {/* Products Table */}
            <div className="ps-card mb-4 bg-white p-4 shadow-sm rounded">
              <h4 className="mb-4 text-lg font-semibold text-gray-800">
                Order Description
              </h4>
              <div className="table-responsive">
                <table className="table ps-table text-base w-full">
                  <thead className="bg-gray-100 text-gray-700 text-lg">
                    <tr>
                      <th className="text-left p-3">Product</th>
                      <th className="text-right p-3">Price</th>
                      <th className="text-right p-3">Qty</th>
                      <th className="text-right p-3">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails.products.map((product, index) => (
                      <tr key={index} className="text-base border-b">
                        <td className="flex items-center gap-3 p-3">
                          <img
                            src={product.image || '/images/default-product.jpg'}
                            alt={product.product_name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span>{product.product_name}</span>
                        </td>
                        <td className="text-right p-3">
                          {product.unit_price} €
                        </td>
                        <td className="text-right p-3">{product.quantity}</td>
                        <td className="text-right p-3">
                          {product.total_price} €
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="ps-card mb-4 p-4 shadow-sm bg-white rounded max-w-md ml-auto">
              <table className="table ps-table text-base w-full">
                <tbody>
                  {/* <tr>
                    <td>Subtotal:</td>
                    <td className="text-end">{subtotal.toFixed(2)} €</td>
                  </tr>
                  <tr>
                    <td>Shipping:</td>
                    <td className="text-end">{shipping.toFixed(2)} €</td>
                  </tr>
                  <tr>
                    <td>Tax:</td>
                    <td className="text-end">{tax.toFixed(2)} €</td>
                  </tr>
                  <tr className="border-t">
                    <td className="font-semibold">Calculated Total:</td>
                    <td className="text-end font-semibold">
                      {total.toFixed(2)} €
                    </td>
                  </tr> */}
                  <tr className="border">
                    <td className="font-semibold">Orders Total Amount:</td>
                    <td className="text-end font-semibold text-primary">
                      {parseFloat(orderDetails.amount).toFixed(2)} €
                    </td>
                  </tr>
                  {/* {Math.abs(total - parseFloat(orderDetails.amount)) > 0.01 && (
                    <tr className="bg-yellow-50">
                      <td className="font-semibold text-red-500">
                        Difference:
                      </td>
                      <td className="text-end font-semibold text-red-500">
                        {(total - parseFloat(orderDetails.amount)).toFixed(2)} €
                      </td>
                    </tr>
                  )} */}
                </tbody>
              </table>
            </div>

            {/* Order Status Section */}
            <div className="row">
              {/* <div className="col-md-6">
                <div className="ps-card mb-4 p-4 bg-white shadow-sm rounded">
                  <h4 className="mb-3 text-lg font-semibold text-gray-800">
                    Order Status
                  </h4>
                  <div className="mb-3">
                    <select className="form-select text-base w-full p-2 border rounded">
                      <option>🟡 Preparing</option>
                      <option>🚚 Shipped</option>
                      <option>✅ Delivered</option>
                      <option>❌ Canceled</option>
                    </select>
                  </div>
                  <button className="ps-btn ps-btn--sm ps-btn--primary w-full text-base">
                    Update Status
                  </button>
                </div>
              </div> */}

              {/* Order History */}
              <div className="col-md-6">
                <div className="ps-card mb-4 p-4 bg-white shadow-sm rounded">
                  <h4 className="mb-3 text-lg font-semibold text-gray-800">
                    Order History
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5"></div>
                      <div>
                        <p className="text-gray-700">Order created</p>
                        <small className="text-gray-500">
                          {new Date(orderDetails.date).toLocaleString()}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Customer Info */}
          <div className="col-lg-4 col-md-5">
            {orderDetails.delivery_info && (
              <div className="ps-card mb-4 p-4 bg-white shadow-sm rounded">
                <h4 className="mb-3 text-lg font-semibold text-gray-800">
                  Customer Details
                </h4>
                <div className="space-y-2">
                  <p>
                    <strong>{orderDetails.delivery_info.recipient_name}</strong>
                  </p>
                  <p>{orderDetails.delivery_info.address}</p>
                  <p>
                    {orderDetails.delivery_info.city},{' '}
                    {orderDetails.delivery_info.postal_code}
                  </p>
                  <p>{orderDetails.delivery_info.country}</p>
                  <p>Phone: {orderDetails.delivery_info.phone_number}</p>
                </div>
              </div>
            )}

            {/* Payment Information (if available) */}
            {orderDetails.payment_method && (
              <div className="ps-card mb-4 p-4 bg-white shadow-sm rounded">
                <h4 className="mb-3 text-lg font-semibold text-gray-800">
                  Payment Information
                </h4>
                <div className="space-y-2">
                  <p>Method: {orderDetails.payment_method}</p>
                  <p>Status: {orderDetails.payment_status || 'Paid'}</p>
                  <p>Amount: {total.toFixed(2)} €</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </ContainerDefault>
  )
}

export default OrderDetailPage

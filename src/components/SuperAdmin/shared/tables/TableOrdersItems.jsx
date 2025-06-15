import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Modal, Select } from 'antd'
import { useRouter } from 'next/navigation'
import {
  getAllProducts,
  updateOrders,
  getOrderDetails,
  getOrderById,
} from '@/apis/products'
import toast from 'react-hot-toast'
import OrderDetailPage from '@/app/admin/orders/[params]/page'
// import OrderDetailPage from '@/app/Order-detail/page'

const { Option } = Select

const TableOrdersItems = ({ orders, onDelete, onUpdate }) => {
  const router = useRouter()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingOrderId, setEditingOrderId] = useState(null)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [viewingOrderId, setViewingOrderId] = useState(null)
  const [formData, setFormData] = useState({
    product_items: [],
    delivery_info: {
      recipient_name: '',
      address: '',
      phone_number: '',
      city: '',
      postal_code: '',
      country: '',
    },
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [currentProduct, setCurrentProduct] = useState({
    product_id: '',
    quantity: 1,
    product_name: '',
  })
  const [loading, setLoading] = useState(false)
  const [allProducts, setAllProducts] = useState([])

  // Fetch all products on component mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await getAllProducts()
        setAllProducts(response.results || [])
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }
    fetchAllProducts()
  }, [])

  // Fetch order details when editing
  useEffect(() => {
    if (editingOrderId) {
      const fetchOrderDetails = async () => {
        try {
          setLoading(true)
          const orderDetails = await getOrderById(editingOrderId)

          // Create a mapping of product names to IDs
          const productNameToId = {}
          allProducts.forEach((product) => {
            productNameToId[product.product_name] = product.id
          })

          // Transform the API response to match our form structure
          setFormData({
            product_items: orderDetails.products.map((product) => ({
              product_id: productNameToId[product.product_name] || 0,
              quantity: product.quantity,
              product_name: product.product_name,
            })),
            delivery_info: {
              recipient_name: orderDetails.delivery_info.recipient_name,
              address: orderDetails.delivery_info.address,
              phone_number: orderDetails.delivery_info.phone_number,
              city: orderDetails.delivery_info.city,
              postal_code: orderDetails.delivery_info.postal_code,
              country: orderDetails.delivery_info.country,
            },
          })
        } catch (error) {
          toast.error('Failed to fetch order details')
          console.error(error)
        } finally {
          setLoading(false)
        }
      }
      fetchOrderDetails()
    }
  }, [editingOrderId, allProducts])

  // Fetch products based on search term
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([])
        return
      }

      try {
        const res = await getAllProducts(1, searchTerm)
        setSearchResults(res.results || [])
      } catch (err) {
        console.error('Product search failed:', err)
      }
    }

    const debounce = setTimeout(fetchProducts, 300)
    return () => clearTimeout(debounce)
  }, [searchTerm])

  const handleProductSelect = (product) => {
    setCurrentProduct({
      product_id: product.id,
      product_name: product.product_name,
      quantity: 1,
    })
    setSearchTerm('')
    setSearchResults([])
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1
    setCurrentProduct((prev) => ({
      ...prev,
      quantity: value > 0 ? value : 1,
    }))
  }

  const addProductToOrder = () => {
    if (!currentProduct.product_id) {
      toast.error('Please select a product')
      return
    }

    setFormData((prev) => ({
      ...prev,
      product_items: [
        ...prev.product_items,
        {
          product_id: currentProduct.product_id,
          quantity: currentProduct.quantity,
          product_name: currentProduct.product_name,
        },
      ],
    }))

    setCurrentProduct({
      product_id: '',
      quantity: 1,
      product_name: '',
    })
  }

  const removeProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      product_items: prev.product_items.filter((_, i) => i !== index),
    }))
  }

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      delivery_info: {
        ...prev.delivery_info,
        [name]: value,
      },
    }))
  }

  const handleDetailClick = (orderId) => {
    setViewingOrderId(orderId)
    setIsDetailModalVisible(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()

    if (formData.product_items.length === 0) {
      toast.error('Please add at least one product to the order')
      return
    }

    try {
      setLoading(true)
      // Prepare the payload in the required format
      const payload = {
        product_items: formData.product_items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
        delivery_info: formData.delivery_info,
      }

      await updateOrders(editingOrderId, payload)
      toast.success('Order updated successfully!')
      setIsModalVisible(false)
      onUpdate() // Refresh orders list
    } catch (error) {
      console.error('Order update failed:', error)
      toast.error(error.message || 'Failed to update order')
    } finally {
      setLoading(false)
    }
  }

  const tableItemsView = orders.map((item) => {
    let badgeView, fullfillmentView

    if (item.payment) {
      badgeView = <span className="ps-badge success">Pago</span>
    } else {
      badgeView = <span className="ps-badge gray">Pendente</span>
    }

    switch (item.fullfillment) {
      case 'In Progress':
        fullfillmentView = (
          <span className="ps-fullfillment warning">Pendente</span>
        )
        break
      case 'Cancel':
        fullfillmentView = (
          <span className="ps-fullfillment danger">cancelado</span>
        )
        break
      default:
        fullfillmentView = (
          <span className="ps-fullfillment success">Entregue</span>
        )
        break
    }

    const handleEditClick = () => {
      setEditingOrderId(item.id)
      setIsModalVisible(true)
    }

    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>
          <Link href="/orders/order-detail">
            {item.products && item.products.length > 0
              ? item.products.map((product, index) => (
                  <span key={product.id || index}>
                    {product.product_name}
                    {index !== item.products.length - 1 && ', '}
                  </span>
                ))
              : 'No Products'}
          </Link>
        </td>
        <td>
          <strong> {new Date(item.date).toLocaleDateString()}</strong>
        </td>
        <td>{badgeView}</td>
        <td>{fullfillmentView}</td>
        <td>
          <strong>{item.amount}</strong>
        </td>
        <td>
          <button
            className="ps-btn ps-btn--sm"
            onClick={handleEditClick}
            style={{ backgroundColor: '#fcb800', color: '#000' }}
          >
            Edit
          </button>
          <button
            className="ps-btn ps-btn--sm ml-2"
            onClick={() => handleDetailClick(item.id)}
            style={{ backgroundColor: '#4CAF50', color: '#fff' }}
          >
            Detail
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
              <th>Produto</th>
              <th>Data</th>
              <th>Pagamento</th>
              <th>Estado</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{tableItemsView}</tbody>
        </table>
      </div>

      {/* Edit Order Modal */}
      <Modal
        title="Edit Order"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {loading ? (
          <div className="text-center py-4">Loading order details...</div>
        ) : (
          <form className="ps-form" onSubmit={handleEditSubmit}>
            <div className="ps-form__content">
              <div className="row">
                {/* Product Section */}
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <figure className="ps-block--form-box">
                    <figcaption>Edit Products</figcaption>
                    <div className="ps-block__content">
                      <div
                        className="form-group"
                        style={{ position: 'relative' }}
                      >
                        <label>Search Product *</label>
                        <input
                          className="form-control"
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Type product name..."
                        />
                        {searchResults.length > 0 && (
                          <ul
                            className="dropdown-menu show"
                            style={{
                              position: 'absolute',
                              zIndex: 9999,
                              width: '100%',
                              maxHeight: '200px',
                              overflowY: 'auto',
                            }}
                          >
                            {searchResults.map((product) => (
                              <li
                                key={product.id}
                                className="dropdown-item"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleProductSelect(product)}
                              >
                                {product.product_name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {currentProduct.product_id && (
                        <div className="form-group">
                          <label>Selected Product</label>
                          <input
                            className="form-control mb-2"
                            type="text"
                            value={currentProduct.product_name}
                            readOnly
                          />
                          <label>Quantity *</label>
                          <input
                            className="form-control"
                            type="number"
                            value={currentProduct.quantity}
                            onChange={handleQuantityChange}
                            min="1"
                          />
                          <button
                            type="button"
                            className="btn btn-primary mt-2"
                            onClick={addProductToOrder}
                          >
                            Add to Order
                          </button>
                        </div>
                      )}
                    </div>
                  </figure>

                  {/* Added Products List */}
                  {formData.product_items.length > 0 && (
                    <figure className="ps-block--form-box mt-4">
                      <figcaption>Order Products</figcaption>
                      <div className="ps-block__content">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Quantity</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.product_items.map((item, index) => (
                              <tr key={index}>
                                <td>{item.product_name}</td>
                                <td>{item.quantity}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() => removeProduct(index)}
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </figure>
                  )}
                </div>

                {/* Delivery Info Section */}
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <figure className="ps-block--form-box">
                    <figcaption>Delivery Information</figcaption>
                    <div className="ps-block__content">
                      {[
                        { label: 'Recipient Name', name: 'recipient_name' },
                        { label: 'Address', name: 'address' },
                        { label: 'Phone Number', name: 'phone_number' },
                        { label: 'City', name: 'city' },
                        { label: 'Postal Code', name: 'postal_code' },
                        { label: 'Country', name: 'country' },
                      ].map(({ label, name }) => (
                        <div className="form-group" key={name}>
                          <label>{label} *</label>
                          <input
                            className="form-control"
                            type="text"
                            name={name}
                            value={formData.delivery_info[name]}
                            onChange={handleDeliveryChange}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </figure>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="ps-form__bottom mt-4">
              <button
                type="button"
                className="ps-btn ps-btn--gray"
                onClick={() => setIsModalVisible(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="ps-btn" disabled={loading}>
                {loading ? 'Updating...' : 'Update Order'}
              </button>
            </div>
          </form>
        )}
      </Modal>

      <Modal
        title="Order Details"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={1000}
      >
        {viewingOrderId && (
          <OrderDetailPage params={{ params: viewingOrderId }} />
        )}
      </Modal>
    </>
  )
}

export default TableOrdersItems

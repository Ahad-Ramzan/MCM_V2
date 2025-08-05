'use client'

import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import TableOrdersItems from '@/components/SuperAdmin/shared/tables/TableOrdersItems'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
import { Select, Modal } from 'antd'
import Link from 'next/link'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import {
  deleteOrder,
  getAllOrders,
  getAllProducts,
  createOrder,
} from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'

const { Option } = Select

const OrdersPage = () => {
  const [orders, setOrdersData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)
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

  // Fetch orders data
  const fetchData = async (page = 1) => {
    try {
      const response = await getAllOrders(page)
      console.log('Fetched Orders:', response) // Debugging line
      setOrdersData(response)
      setCurrentPage(page)
    } catch (error) {
      toast.error('Failed to fetch orders.')
      console.error('Fetch Error:', error) // Log the error
    }
  }

  const handleDeleteOrder = async (id) => {
    if (confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(id)
        toast.success('Order deleted successfully!')
        fetchData(currentPage) // Refresh data after deletion
      } catch (error) {
        console.error('Delete failed:', error)
        toast.error('Failed to delete order.')
      }
    }
  }

  const handlePageChange = (page) => {
    fetchData(page)
  }

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

  // Fetch initial orders data on mount
  useEffect(() => {
    fetchData() // Initial fetch
  }, [])

  // Handle selecting a product from search dropdown
  const handleProductSelect = (product) => {
    setCurrentProduct((prev) => ({
      ...prev,
      product_id: product.id,
      product_name: product.product_name,
    }))
    setSearchTerm('')
    setSearchResults([])
  }

  // Handle quantity change for current product
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1
    setCurrentProduct((prev) => ({
      ...prev,
      quantity: value > 0 ? value : 1,
    }))
  }

  // Add current product to the order
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

  // Remove product from order
  const removeProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      product_items: prev.product_items.filter((_, i) => i !== index),
    }))
  }

  // Handle delivery fields
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

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.product_items.length === 0) {
      toast.error('Please add at least one product to the order')
      return
    }

    try {
      await createOrder(formData)
      toast.success('Order created successfully!')
      setFormData({
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
      setCurrentProduct({
        product_id: '',
        quantity: 1,
        product_name: '',
      })
      setSearchTerm('')
      setSearchResults([])
      setIsModalVisible(false) // Close modal after submission
      fetchData(currentPage) // Refresh orders list
    } catch (error) {
      console.error('Order creation failed:', error)
      toast.error('Failed to create order')
    }
  }

  const totalPages = Math.ceil(orders.count / 10)

  return (
    <ContainerDefault>
      <HeaderDashboard title="Encomendas" description="Lista de Encomendas" />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      <section className="ps-items-listing">
        <div className="ps-section__header simple">
          <div className="ps-section__filter">
            <form className="ps-form--filter" action="index.html" method="get">
              <div className="ps-form__left">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Pesquisar"
                  />
                </div>
                <div className="form-group">
                  <Select
                    placeholder="Estado"
                    className="ps-ant-dropdown"
                    listItemHeight={20}
                  >
                    <Option value="active">Active</Option>
                    <Option value="in-active">InActive</Option>
                  </Select>
                </div>
              </div>
              <div className="ps-form__right">
                <button className="ps-btn ps-btn--gray">
                  <i className="icon icon-funnel mr-2"></i>
                  Filtros
                </button>
              </div>
            </form>
          </div>
          <div className="ps-section__actions">
            <button
              className="ps-btn"
              onClick={() => setIsModalVisible(true)} // Open modal for new order
            >
              <i className="icon icon-plus mr-2"></i>Nova Encomenda
            </button>
            {/* <Link href={`/admin/orders/order-detail`} className="ps-btn ps-btn">
              Orders Details
            </Link> */}
          </div>
        </div>
        <div className="ps-section__content">
          {orders.results.length > 0 ? (
            <TableOrdersItems
              orders={orders.results}
              onDelete={handleDeleteOrder}
            />
          ) : (
            <p>No orders available.</p> // Message when no orders are found
          )}
        </div>
        <div className="ps-section__footer">
          <p>
            Mostrar {orders.results.length} de {orders.count} produtos.
          </p>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      {/* Create Order Modal */}
      <Modal
        title="Create New Order"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <form className="ps-form" onSubmit={handleSubmit}>
          <div className="ps-form__content">
            <div className="row">
              {/* Product Section */}
              <div className="col-xl-12 col-lg-12 col-md-12">
                <figure className="ps-block--form-box">
                  <figcaption>Add Products</figcaption>
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
              type="reset"
              className="ps-btn ps-btn--gray"
              onClick={() => {
                setFormData({
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
                setCurrentProduct({
                  product_id: '',
                  quantity: 1,
                  product_name: '',
                })
                setSearchTerm('')
                setSearchResults([])
              }}
            >
              Cancel
            </button>
            <button type="submit" className="ps-btn">
              Submit Order
            </button>
          </div>
        </form>
      </Modal>
    </ContainerDefault>
  )
}

export default OrdersPage

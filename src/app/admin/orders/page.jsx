'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import TableOrdersItems from '@/components/SuperAdmin/shared/tables/TableOrdersItems'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
import { Select } from 'antd'
import Link from 'next/link'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import { deleteOrder, getAllOrders } from '@/apis/products'
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
  const fetchData = async (page = 1) => {
    try {
      const response = await getAllOrders(page)
      // toast.success('Order Deleted successfully!')
      setOrdersData(response)
      setCurrentPage(page)

      // Store in state
    } catch (error) {
      // toast.error('Failed to delete order.')
    }
  }

  const handleDeleteOrder = async (id) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      try {
        await deleteOrder(id)
        // alert('Brand deleted successfully.')
        toast.success('Order Deleted successfully!')
        await fetchData() // Refresh data after deletion
      } catch (error) {
        console.error('Delete failed:', error)
        // alert('Failed to delete brand.')
        toast.error('Failed to delete order.')
      }
    }
  }

  const handlePageChange = (page) => {
    fetchData(page)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const totalPages = Math.ceil(orders.count / 10)
  return (
    <ContainerDefault>
      <HeaderDashboard title="Enconmendas" description="Lista de Encomendas" />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000, // default for all toasts
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
            <Link href="/admin/orders/create-orders" className="ps-btn ">
              <i className="icon icon-plus mr-2"></i>Nova Encomenda
            </Link>
            {/* <a className="ps-btn ps-btn--gray" href="new-order.html">
              <i className="icon icon-download2 mr-2"></i>Exportar
            </a> */}

            <Link href={`/admin/orders/order-detail`} className="ps-btn ps-btn">
              Orders Details
            </Link>

            {/* <button
              className="ps-btn ps-btn"
              onClick={() => {
                window.location.href = '/admin/orders/order-detail'
              }}
            >
              Orders Detail
            </button> */}
          </div>
        </div>
        <div className="ps-section__content">
          <TableOrdersItems
            orders={orders.results}
            onDelete={handleDeleteOrder}
          />
        </div>
        <div className="ps-section__footer">
          <p>Mostrar 10 de 30 produtos.</p>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </ContainerDefault>
  )
}
export default OrdersPage

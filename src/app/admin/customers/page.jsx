'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
import TableCustomerItems from '@/components/SuperAdmin/shared/tables/TableCustomerItems'
import FormSearchSimple from '@/components/SuperAdmin/shared/forms/FormSearchSimple'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import { deleteUser, getUserdata } from '@/apis/userApi'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

const CustomersPage = () => {
  const [userData, setUsersData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const fetchData = async (page = 1) => {
    try {
      const response = await getUserdata(page)
      console.log(response, 'ressclinet data')
      setUsersData(response)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }
  console.log(userData, 'client data')

  const deleteUserdate = async (id) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      try {
        await deleteUser(id)
        // alert('Brand deleted successfully.')
        toast.success('Client Deleted successfully!')
        await fetchData() // Refresh data after deletion
      } catch (error) {
        // console.error('Delete failed:', error)
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

  const totalPages = Math.ceil(userData.count / 10)

  return (
    <ContainerDefault title="Clientes">
      <HeaderDashboard title="Clientes" description="Lista de Clientes" />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000, // default for all toasts
        }}
      />
      <section className="ps-items-listing">
        <div className="ps-section__header simple">
          <div className="ps-section__filter">
            <FormSearchSimple />
          </div>
          <div className="ps-section__actions">
            <Link href="/admin/customers/create-client" className="ps-btn">
              <i className="icon icon-plus mr-2" />
              NOVO PRODUTO
            </Link>
          </div>
        </div>
        <div className="ps-section__content">
          <TableCustomerItems userData={userData} onDelete={deleteUserdate} />
        </div>
        <div className="ps-section__footer">
          <p>Mostrar 10 de 30 produtos..</p>
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
export default CustomersPage

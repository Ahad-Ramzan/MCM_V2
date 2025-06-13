'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
import TableCustomerItems from '@/components/SuperAdmin/shared/tables/TableCustomerItems'
import FormSearchSimple from '@/components/SuperAdmin/shared/forms/FormSearchSimple'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import { deleteUser, getUserdata, registerUser } from '@/apis/userApi'
import toast, { Toaster } from 'react-hot-toast'
import { Modal } from 'antd'
import Link from '../../../../node_modules/next/link'

// Initial state for the form
const initialFormState = {
  email: '',
  password: '',
  full_name: '',
  role: 'admin',
  address: '',
  bio: '',
  display_name: '',
  contact_number: '',
}

const CustomersPage = () => {
  const [userData, setUsersData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false) // State for modal visibility
  const [formData, setFormData] = useState(initialFormState) // State for form data

  const fetchData = async (page = 1) => {
    try {
      const response = await getUserdata(page)
      console.log(response, 'users data with orders details')
      setUsersData(response)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const deleteUserdate = async (id) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      try {
        await deleteUser(id)
        toast.success('Client Deleted successfully!')
        await fetchData() // Refresh data after deletion
      } catch (error) {
        toast.error('Failed to delete order.')
      }
    }
  }

  const handlePageChange = (page) => {
    fetchData(page)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await registerUser(formData)
      toast.success('User created successfully!')
      setFormData(initialFormState) // Reset form
      setIsModalVisible(false) // Close modal
      await fetchData() // Refresh user data
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(error.message || 'Failed to create user')
    }
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
            <button
              className="ps-btn"
              onClick={() => setIsModalVisible(true)} // Open modal
            >
              <i className="icon icon-plus mr-2" />
              Add Client
            </button>
            {/* <Link href="/admin/customers/client-detail" className="ps-btn">
             
              Client Detail
            </Link> */}
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

      {/* Create User Modal */}
      <Modal
        title="Create New Client"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <form className="ps-form" onSubmit={handleSubmit}>
          <div className="ps-form__content">
            <div className="row">
              <div className="col-xl-12">
                <figure className="ps-block--form-box">
                  <figcaption>User Information</figcaption>
                  <div className="ps-block__content">
                    {[
                      { label: 'Email', name: 'email' },
                      { label: 'Password', name: 'password' },
                      { label: 'Full Name', name: 'full_name' },
                      { label: 'Role', name: 'role' },
                      { label: 'Address', name: 'address' },
                      { label: 'Bio', name: 'bio' },
                      { label: 'Display Name', name: 'display_name' },
                      { label: 'Contact Number', name: 'contact_number' },
                    ].map(({ label, name }) => (
                      <div className="form-group" key={name}>
                        <label>{label} *</label>
                        <input
                          className="form-control"
                          type="text"
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <div className="ps-form__bottom mt-4">
            <button
              type="reset"
              className="ps-btn ps-btn--gray"
              onClick={() => setFormData(initialFormState)}
            >
              Cancel
            </button>
            <button type="submit" className="ps-btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </ContainerDefault>
  )
}

export default CustomersPage

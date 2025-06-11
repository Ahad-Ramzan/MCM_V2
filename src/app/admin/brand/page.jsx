'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import {
  deleteBrand,
  getAllBrands,
  createBrands,
  updateBrand,
} from '@/apis/products'
import TableBrandName from '@/components/SuperAdmin/shared/tables/TableBrandName'
import toast, { Toaster } from 'react-hot-toast'
import debounce from 'lodash.debounce'
import FormSearchSimple from '@/components/SuperAdmin/shared/forms/FormSearchSimple'
import { Modal } from 'antd'

const BrandPage = () => {
  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [brandName, setBrandName] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchData = async (page = 1, search = '') => {
    try {
      const response = await getAllBrands(page, search)
      setProductsData(response)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch brands:', error)
    }
  }

  const handleDeleteBrand = async (id) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      try {
        await deleteBrand(id)
        toast.success('Brand deleted successfully!')
        await fetchData()
      } catch (error) {
        console.error('Delete failed:', error)
        toast.error('Failed to delete brand.')
      }
    }
  }

  const handlePageChange = (page) => {
    fetchData(page, searchTerm)
  }

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      fetchData(1, searchTerm)
    }, 500)

    debouncedSearch()
    return () => debouncedSearch.cancel()
  }, [searchTerm])

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreateBrand = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createBrands({ id: 0, brand_name: brandName })
      toast.success('Brand created successfully!')
      setIsModalVisible(false)
      setBrandName('')
      fetchData()
    } catch (error) {
      toast.error('Failed to create brand.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateBrand = async (updatedBrand) => {
    try {
      await updateBrand(updatedBrand.id, updatedBrand) // Update the brand using the API
      toast.success('Brand updated successfully!')
      fetchData() // Refresh the brand list
    } catch (error) {
      console.error('Failed to update brand:', error)
      toast.error('Failed to update brand.')
    }
  }

  const totalPages = Math.ceil(productsData.count / 10)

  return (
    <ContainerDefault title="Brands">
      <HeaderDashboard title="Brands" description="Lists of Brands" />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <button className="ps-btn" onClick={() => setIsModalVisible(true)}>
            <i className="icon icon-plus mr-2" />
            Add Brand
          </button>
        </div>

        <div className="ps-section__header">
          <FormSearchSimple onSearchChange={(value) => setSearchTerm(value)} />
        </div>

        <div className="ps-section__content">
          <TableBrandName
            productsData={productsData.results}
            onDelete={handleDeleteBrand}
            onUpdateBrand={handleUpdateBrand} // Pass the update function
          />
        </div>

        <div className="ps-section__footer">
          <p>
            Showing {productsData.results.length} of {productsData.count}{' '}
            brands.
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      {/* Brand Creation Modal */}
      <Modal
        title="Create New Brand"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <form onSubmit={handleCreateBrand}>
          <div className="form-group">
            <label>Brand Name</label>
            <input
              type="text"
              className="form-control"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter brand name"
              required
            />
          </div>
          <button type="submit" className="ps-btn mt-3" disabled={loading}>
            {loading ? 'Creating...' : 'Create Brand'}
          </button>
        </form>
      </Modal>
    </ContainerDefault>
  )
}

export default BrandPage

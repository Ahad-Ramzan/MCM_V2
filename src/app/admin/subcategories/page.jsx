'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import TableCategoryItems from '@/components/SuperAdmin/shared/tables/TableCategoryItems'
import TableSubCategoriesItems from '@/components/SuperAdmin/shared/tables/TableSubCategoriesItems'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
import FormCreateCategory from '@/components/SuperAdmin/shared/forms/FormCreateCategory'
import FormCreateSubCategory from '@/components/SuperAdmin/shared/forms/FormCreateSubCategory'
import FormSearchSimple from '@/components/SuperAdmin/shared/forms/FormSearchSimple'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import {
  deletecategory,
  deletesubcategory,
  getAllCategories,
  getAllSubCategories,
  getSubCategoriesAllData,
} from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'
import debounce from 'lodash.debounce'
import { Modal, Button } from 'antd'

const CategoriesPage = () => {
  const [categories, setCategories] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  const [subcategories, setAllSubCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false) // Modal visibility state

  const fetchData = async (page = 1, search = '') => {
    try {
      const response = await getAllSubCategories(page, search)
      setCategories(response) // Store in state
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchAllData = async (page = 1, search = '') => {
    try {
      const response = await getSubCategoriesAllData(page, search)
      setAllSubCategories(response) // Store in state
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const handleDeleteCategory = async (id) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      try {
        await deletesubcategory(id)
        toast.success('Category Deleted successfully!')
        await fetchData(currentPage, searchTerm) // Refresh data after deletion
      } catch (error) {
        toast.error('Failed to Delete Category')
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
    fetchAllData()
  }, [])

  const totalPages = Math.ceil(categories.count / 10)

  return (
    <ContainerDefault>
      <HeaderDashboard title="Categorias" description="Lista de Categorias" />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000, // default for all toasts
        }}
      />
      <section className="ps-dashboard ps-items-listing">
        <div className="ps-section__left">
          <div
            className="ps-section__header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <FormSearchSimple
              onSearchChange={(value) => setSearchTerm(value)}
            />
            <button
              className="ps-btn ml-60 w-40"
              onClick={() => setIsModalVisible(true)} // Open modal for subcategory creation
            >
              <i className="icon icon-plus mr-2" />
              Add New Subcategory
            </button>
          </div>
          <div className="ps-section__content">
            <TableSubCategoriesItems
              categories={categories.results}
              onDelete={handleDeleteCategory}
              subcategories={subcategories}
            />
            <div className="ps-section__footer">
              <p>
                Showing {categories.results.length} of {categories.count} items.
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Create Subcategory Modal */}
      <Modal
        title="Create New Subcategory"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <FormCreateSubCategory categories={subcategories} />
      </Modal>
    </ContainerDefault>
  )
}

export default CategoriesPage

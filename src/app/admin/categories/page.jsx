'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import TableCategoryItems from '@/components/SuperAdmin/shared/tables/TableCategoryItems'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
import FormSearchSimple from '@/components/SuperAdmin/shared/forms/FormSearchSimple'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import {
  deletecategory,
  getAllCategories,
  getSubCategoriesAllData,
} from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'
import debounce from 'lodash.debounce'
import { Modal } from 'antd'
import FormCreateCategory from '@/components/SuperAdmin/shared/forms/FormCreateCategory'

const CategoriesPage = () => {
  const [categories, setCategories] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [subcategories, setAllSubCategories] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false) // Modal visibility state

  const fetchData = async (page = 1, search = '') => {
    try {
      const response = await getAllCategories(page, search)
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
    } catch (error) {
      console.error('Failed to fetch subcategories:', error)
    }
  }

  const handleDeleteCategory = async (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await deletecategory(id)
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

  const handleCategoryCreated = async () => {
    setIsModalVisible(false)
    await fetchData(currentPage, searchTerm)
    await fetchAllData()
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
                Add Category
              </button>
              {/* <Link href="/admin/customers/client-detail" className="ps-btn">
             
              Client Detail
            </Link> */}
            </div>
          </div>

          <div className="ps-section__content">
            <TableCategoryItems
              categories={categories.results}
              onDelete={handleDeleteCategory}
              onUpdate={handleCategoryCreated}
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

      {/* Create Category Modal */}
      <Modal
        title="Create New Category"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <FormCreateCategory
          categories={subcategories}
          onSuccess={handleCategoryCreated}
        />
      </Modal>
    </ContainerDefault>
  )
}

export default CategoriesPage

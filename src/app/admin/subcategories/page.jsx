'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import TableCategoryItems from '@/components/SuperAdmin/shared/tables/TableCategoryItems'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
import FormCreateCategory from '@/components/SuperAdmin/shared/forms/FormCreateCategory'
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
import TableSubCategoriesItems from '@/components/SuperAdmin/shared/tables/TableSubCategoriesItems'
import FormCreateSubCategory from '@/components/SuperAdmin/shared/forms/FormCreateSubCategory'

const CategoriesPage = () => {
  const [categories, setCategories] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  const [subcategories, setAllSubCategories] = useState([])
  console.log(subcategories, 'subcategores--------------------all')
  const [searchTerm, setSearchTerm] = useState('')
  // console.log(categories, 'cat-----')
  const [currentPage, setCurrentPage] = useState(1)

  const fetchData = async (page = 1, search = '') => {
    try {
      const response = await getAllSubCategories(page, search)
      console.log(response, 'response sub categories ------------')
      setCategories(response) // Store in state
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchAllData = async (page = 1, search = '') => {
    try {
      const response = await getSubCategoriesAllData(page, search)
      console.log(response, 'response sub categories ------------')
      setAllSubCategories(response) // Store in state
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  // const fetchData = async (page = 1, search = '') => {
  //     try {
  //       const response = await getAllProducts(page, search)
  //       setProductsData(response)
  //       setCurrentPage(page)
  //     } catch (error) {
  //       toast.error('Failed to fetch products')
  //     }
  //   }

  const handleDeleteCategory = async (id) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      try {
        await deletesubcategory(id)
        toast.success('Category Deleted successfully!')
        await fetchData(currentPage, searchTerm) // Refresh data after deletion
      } catch (error) {
        // console.error('Delete failed:', error)
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
  // const data=
  // console.log(data,"categories data")
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
          <div className="ps-section__header">
            <FormSearchSimple
              onSearchChange={(value) => setSearchTerm(value)}
            />
          </div>
          <div className="ps-section__content">
            <TableSubCategoriesItems
              categories={categories.results}
              onDelete={handleDeleteCategory}
              subcategories={subcategories}
            />
            <div className="ps-section__footer">
              <p>Mortar 5 de 30 items.</p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
        <div className="ps-section__right">
          {/* <FormCreateCategory /> */}
          <FormCreateSubCategory categories={subcategories} />
        </div>
      </section>
    </ContainerDefault>
  )
}

export default CategoriesPage

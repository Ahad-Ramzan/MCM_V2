'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import TableCategoryItems from '@/components/SuperAdmin/shared/tables/TableCategoryItems'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
import FormCreateCategory from '@/components/SuperAdmin/shared/forms/FormCreateCategory'
import FormSearchSimple from '@/components/SuperAdmin/shared/forms/FormSearchSimple'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import { deletecategory, getAllCategories } from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'

const CategoriesPage = () => {
  const [categories, setCategories] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  // console.log(categories, 'cat-----')
  const [currentPage, setCurrentPage] = useState(1)

  const fetchData = async (page = 1) => {
    try {
      const response = await getAllCategories(page)
      setCategories(response) // Store in state
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const handleDeleteCategory = async (id) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      try {
        await deletecategory(id)
        toast.success('Category Deleted successfully!')
        await fetchData() // Refresh data after deletion
      } catch (error) {
        // console.error('Delete failed:', error)
        toast.error('Failed to Delete Category')
      }
    }
  }

  const handlePageChange = (page) => {
    fetchData(page)
  }

  useEffect(() => {
    fetchData()
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
            <FormSearchSimple />
          </div>
          <div className="ps-section__content">
            <TableCategoryItems
              categories={categories.results}
              onDelete={handleDeleteCategory}
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
          <FormCreateCategory />
        </div>
      </section>
    </ContainerDefault>
  )
}

export default CategoriesPage

'use client'
import React, { useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
import TableProjectItems from '@/components/SuperAdmin/shared/tables/TableProjectItems'
import { Select } from 'antd'
import Link from 'next/link'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import {
  deleteProduct,
  getAllProducts,
  getBrandAllData,
  getCategoriesAllData,
} from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'

const { Option } = Select

const ProductPage = () => {
  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  const [categories, setCategories] = useState([])
  console.log(categories, 'cat-------------------------------')
  const [brand, setBrandsData] = useState([])
  console.log(brand, 'bar-------------------------------')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchData = async (
    page = 1,
    search = '',
    brand = '',
    category = '',
    status = ''
  ) => {
    try {
      const response = await getAllProducts(
        page,
        search,
        brand,
        category,
        status
      )
      setProductsData(response)
      setCurrentPage(page)
    } catch (error) {
      toast.error('Failed to fetch products')
    }
  }

  const handleDeleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        toast.success('Product Deleted successfully!')
        await fetchData(currentPage, searchTerm)
      } catch (error) {
        toast.error('Failed to delete product')
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

  // Initial Load
  useEffect(() => {
    fetchData()
  }, [])

  const fetchBrandsData = async () => {
    try {
      const response = await getBrandAllData()
      setBrandsData(response)
    } catch (error) {
      throw new Error('failed to fetch the data')
    }
  }

  const fetchAllCategories = async () => {
    try {
      const response = await getCategoriesAllData()
      setCategories(response)
    } catch (error) {
      throw new Error('failed to fetch data')
    }
  }

  useEffect(() => {
    fetchAllCategories()
    fetchBrandsData()
  }, [])

  const totalPages = Math.ceil(productsData.count / 10)

  return (
    <ContainerDefault title="Products">
      <HeaderDashboard title="Produtos" description="Lista de Protudos " />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <Link href="/admin/products/create-product" className="ps-btn">
            <i className="icon icon-plus mr-2" />
            NOVO PRODUTO
          </Link>
        </div>
        <div className="ps-section__header">
          <div className="ps-section__filter">
            <form className="ps-form--filter">
              <div className="ps-form__left">
                <div className="form-group">
                  <Select
                    placeholder="Selecionar Categoria"
                    className="ps-ant-dropdown"
                    value={selectedCategory}
                    onChange={(value) => {
                      setSelectedCategory(value)
                      fetchData(1, searchTerm, selectedBrand, value)
                    }}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <Option key={cat.id} value={cat.id}>
                        {cat.name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="form-group">
                  <Select
                    placeholder="Product Type"
                    className="ps-ant-dropdown"
                    value={selectedBrand}
                    onChange={(value) => {
                      setSelectedBrand(value)
                      fetchData(1, searchTerm, value, selectedCategory)
                    }}
                  >
                    <option value="">Select Brand</option>
                    {brand.map((b) => (
                      <Option key={b.id} value={b.id}>
                        {b.brand_name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="form-group">
                  <Select
                    placeholder="Estado"
                    className="ps-ant-dropdown"
                    value={selectedStatus}
                    onChange={(value) => {
                      setSelectedStatus(value)
                      fetchData(
                        1,
                        searchTerm,
                        selectedBrand,
                        selectedCategory,
                        value
                      )
                    }}
                  >
                    <Option value="">All</Option>
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                  </Select>
                </div>
              </div>
              <div className="ps-form__right">
                <button type="button" className="ps-btn ps-btn--gray">
                  <i className="icon icon-funnel mr-2"></i>
                  Filtros
                </button>
              </div>
            </form>
          </div>

          <div className="ps-section__search">
            <div className="ps-form--search-simple">
              <input
                className="form-control"
                type="text"
                placeholder="Search product"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="button">
                <i className="icon icon-magnifier"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="ps-section__content">
          {productsData.results.length > 0 ? (
            <TableProjectItems
              productsData={productsData.results}
              onDelete={handleDeleteProduct}
            />
          ) : (
            <p style={{ padding: '1rem' }}>No products found.</p>
          )}
        </div>

        <div className="ps-section__footer">
          <p>
            Mostrar {productsData.results.length} de {productsData.count}{' '}
            Produtos.
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </ContainerDefault>
  )
}

export default ProductPage

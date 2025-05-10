'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
import TableProjectItems from '@/components/SuperAdmin/shared/tables/TableProjectItems'
import { Select } from 'antd'
import Link from 'next/link'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import { deleteProduct, getAllProducts } from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'

const { Option } = Select

const ProductPage = () => {
  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [currentPage, setCurrentPage] = useState(1)

  const fetchData = async (page = 1) => {
    try {
      const response = await getAllProducts(page)
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
        await fetchData(currentPage)
      } catch (error) {
        toast.error('Failed to delete product')
      }
    }
  }

  const handlePageChange = (page) => {
    fetchData(page)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const totalPages = Math.ceil(productsData.count / 10) // Assuming 10 products per page

  return (
    <ContainerDefault title="Products">
      <HeaderDashboard title="Produtos" description="Lista de Protudos " />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <Link href="/admin/products/create-product" className="ps-btn ">
            <i className="icon icon-plus mr-2" />
            NOVO PRODUTO
          </Link>
        </div>
        <div className="ps-section__header">
          <div className="ps-section__filter">
            <form className="ps-form--filter" method="get">
              <div className="ps-form__left">
                <div className="form-group">
                  <Select
                    placeholder="Selecionar Categoria"
                    className="ps-ant-dropdown"
                  >
                    <Option value="clothing-and-apparel">
                      Clothing & Apparel
                    </Option>
                    <Option value="garden-and-kitchen">Garden & Kitchen</Option>
                  </Select>
                </div>
                <div className="form-group">
                  <Select
                    placeholder="Product Type"
                    className="ps-ant-dropdown"
                  >
                    <Option value="simple-product">Simple Product</Option>
                    <Option value="groupped-product">Groupped Product</Option>
                  </Select>
                </div>
                <div className="form-group">
                  <Select placeholder="Estado" className="ps-ant-dropdown">
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
          <div className="ps-section__search">
            <form className="ps-form--search-simple" method="get">
              <input
                className="form-control"
                type="text"
                placeholder="Search product"
              />
              <button>
                <i className="icon icon-magnifier"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="ps-section__content">
          <TableProjectItems
            productsData={productsData.results}
            onDelete={handleDeleteProduct}
          />
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

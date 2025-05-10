'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
// import TableProjectItems from '@/components/SuperAdmin/shared/tables/TableProjectItems';
import { Select } from 'antd'
import Link from 'next/link'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import { deleteBrand, getAllBrands, getAllProducts } from '@/apis/products'
import TableBrandName from '@/components/SuperAdmin/shared/tables/TableBrandName'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const { Option } = Select
const BrandPage = () => {
  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  const [currentPage, setCurrentPage] = useState(1)
  console.log(productsData, 'products---')

  // const handleDeleteBrand = async (id) => {
  //         if (confirm('Are you sure you want to delete this brand?')) {
  //             try {
  //                 await deleteBrand(id);
  //                 alert('Brand deleted successfully.');
  //                 await fetchData()
  //             } catch (error) {
  //                 console.error('Delete failed:', error);
  //                 alert('Failed to delete brand.');
  //             }
  //         }
  //     };
  // useEffect(() => {
  //         const fetchData = async () => {
  //             try {
  //                 const response = await getAllBrands();
  //                 console.log(response,"ressprod")
  //                 setProductsData(response); // Store in state
  //             } catch (error) {
  //                 console.error('Failed to fetch categories:', error);
  //             }
  //         };

  //         fetchData();
  //     }, []);

  const fetchData = async (page = 1) => {
    try {
      const response = await getAllBrands(page)
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
        // alert('Brand deleted successfully.');
        toast.success('Brand Deleted successfully!')
        await fetchData() // Refresh data after deletion
      } catch (error) {
        console.error('Delete failed:', error)
        // alert('Failed to delete brand.');
        toast.error('Failed to Delete Brand.')
      }
    }
  }

  const handlePageChange = (page) => {
    fetchData(page)
  }

  const router = useRouter()

  const handleClick = () => {
    router.push('/admin/brand/create-brand')
  }

  useEffect(() => {
    fetchData()
  }, [])

  const totalPages = Math.ceil(productsData.count / 10)
  return (
    <ContainerDefault title="Brands">
      <HeaderDashboard title="Brands" description="Lists of Brands " />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000, // default for all toasts
        }}
      />
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <button className="ps-btn" onClick={handleClick}>
            <i className="icon icon-plus mr-2" />
            Add Brand
          </button>
        </div>
        <div className="ps-section__header">
          <div className="ps-section__filter">
            <form className="ps-form--filter" action="index.html" method="get">
              <div className="ps-form__left">
                <div className="form-group">
                  <Select
                    placeholder="Selecionar Categoria"
                    className="ps-ant-dropdown"
                    listItemHeight={20}
                  >
                    <Option value="clothing-and-apparel">
                      Clothing & Apparel
                    </Option>
                    <Option value="garden-and-kitchen">Garden & Kitchen</Option>
                  </Select>
                </div>
                <div className="form-group">
                  <Select
                    placeholder="Selecionar Categoria"
                    className="ps-ant-dropdown"
                    listItemHeight={20}
                  >
                    <Option value="simple-product">Simple Product</Option>
                    <Option value="groupped-product">Groupped product</Option>
                  </Select>
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
          <div className="ps-section__search">
            <form
              className="ps-form--search-simple"
              action="index.html"
              method="get"
            >
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
          <TableBrandName
            productsData={productsData.results}
            onDelete={handleDeleteBrand}
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
export default BrandPage

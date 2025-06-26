'use client'
import React, { useEffect, useState } from 'react'
import ProductCardStar from '@/ui/ProductCardStar'
import { FaTh, FaBars } from 'react-icons/fa'
import { getAllProducts } from '@/apis/products'
import Pagination from '../SuperAdmin/elements/basic/Pagination'
import useProductsStore from '@/store/productsStore'
import { toast } from 'react-toastify'

const ProductListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  // Get state from store
  const {
    products,
    selectedCategory,
    selectedCategoryName,
    selectedSubcategory,
    selectedSubcategoryName,
    fetchFilteredProducts,
  } = useProductsStore()

  // Fetch data function
  const fetchData = async (page = 1) => {
    try {
      setLoading(true)
      const data = await fetchFilteredProducts(getAllProducts, page)
      setProductsData(data)
      setCurrentPage(page)
    } catch (error) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  // Fetch products when filters change
  useEffect(() => {
    fetchData(1)
  }, [selectedCategory, selectedSubcategory])

  const handlePageChange = (page) => {
    fetchData(page)
  }

  const totalPages = Math.ceil(productsData.count / 10)

  return (
    <div className="w-full lg:px-4 py-6 bg-white">
      {/* Top bar */}
      <div className="flex flex-wrap w-full justify-between items-center border border-gray-100 p-3 bg-gray-50 mb-6">
        <div>
          <h2 className="text-lg font-semibold">
            {selectedCategory
              ? selectedCategoryName
              : selectedSubcategory
                ? selectedSubcategoryName
                : 'Todos os Produtos'}
          </h2>
          <p className="text-sm text-gray-700">
            <strong>{productsData.count}</strong> Produtos encontrados
          </p>
        </div>

        <div className="flex gap-4 flex-wrap items-center justify-between">
          <select className="text-sm border border-gray-300 rounded px-2 py-1 mt-2">
            <option>Ordenar por</option>
            <option>Preço: menor para maior</option>
            <option>Preço: maior para menor</option>
          </select>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>Mostrar</span>
            <FaTh className="cursor-pointer text-gray-500 hover:text-black" />
            <FaBars className="cursor-pointer text-gray-500 hover:text-black" />
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--secondary)]"></div>
        </div>
      ) : (
        <>
          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.length > 0 ? (
              products.map((product, index) => (
                <ProductCardStar
                  key={product.id || index}
                  productId={product.id}
                  image={product.product_thumbnail}
                  brand={product.brand}
                  title={product.product_name}
                  price={product.regular_price + '€'}
                  sold={product.sold_items}
                  discount={calculateDiscount(
                    product.regular_price,
                    product.sale_price
                  )}
                />
              ))
            ) : (
              <div className="col-span-5 text-center py-10 text-gray-500">
                Nenhum produto encontrado.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="ps-section__footer mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  )
}

// Discount helper
function calculateDiscount(original, sale) {
  const originalPrice = parseFloat(original)
  const salePrice = parseFloat(sale)
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return null
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

export default ProductListPage

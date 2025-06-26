'use client'

import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ProductCardStar from '@/ui/ProductCardStar'
import { getAllProducts } from '@/apis/products'
import Pagination from '../SuperAdmin/elements/basic/Pagination'
import useProductsStore from '@/store/productsStore'

const BestSale = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  // Get store state
  const {
    selectedCategory,
    selectedCategoryName,
    selectedSubcategory,
    selectedSubcategoryName,
    products,
  } = useProductsStore()

  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  const fetchData = async (page = 1) => {
    try {
      setLoading(true)
      const response = await getAllProducts(
        page,
        '', // search
        '', // brand
        selectedCategory || '', // category
        '', // status
        '', // min price
        '', // max price
        selectedSubcategory || '' // subcategory
      )
      setProductsData(response)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch products when filters change
  useEffect(() => {
    fetchData(1)
  }, [selectedCategory, selectedSubcategory])

  const itemsPerPage = 5

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }

  const handleNext = () => {
    if (startIndex + itemsPerPage < productsData.results.length) {
      setStartIndex(startIndex + 1)
    }
  }

  const visibleProducts = productsData.results.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handlePageChange = (page) => {
    fetchData(page)
  }

  const totalPages = Math.ceil(productsData.count / 10)

  return (
    <div className="hidden xl:block w-full ml-4 py-5">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[var(--lightGray4)] mb-4">
        <h1 className="text-lg text-[var(--darkGray4)] font-semibold">
          {selectedCategory
            ? `Produtos da Categoria: ${selectedCategoryName}`
            : selectedSubcategory
              ? `Produtos da Subcategoria: ${selectedSubcategoryName}`
              : 'Mais Vendidos'}
        </h1>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="p-2 rounded-full disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= productsData.results.length}
            className="p-2 rounded-full disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
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
          <div className="grid grid-cols-5 gap-4">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product, index) => (
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
          {productsData.results.length > 0 && (
            <div className="ps-section__footer mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

function calculateDiscount(original, sale) {
  const originalPrice = parseFloat(original)
  const salePrice = parseFloat(sale)
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return null
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

export default BestSale

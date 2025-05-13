'use client'
import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ProductCardStar from '@/ui/ProductCardStar'
import { getAllProducts } from '@/apis/products'
import Pagination from '../SuperAdmin/elements/basic/Pagination'

const Recomended = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [currentPage, setCurrentPage] = useState(1)

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

  // const fetchData = async () => {
  //   try {
  //     const response = await getAllProducts()
  //     setProductsData(response)
  //   } catch (error) {
  //     console.error('Failed to fetch products:', error)
  //   }
  // }

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

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  // Slice the real results for display
  const visibleProducts = productsData.results.slice(
    startIndex,
    startIndex + itemsPerPage
  )
  console.log(visibleProducts, 'visible products ----')
  const handlePageChange = (page) => {
    fetchData(page)
  }

  const totalPages = Math.ceil(productsData.count / 10)

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="hidden xl:block w-full ml-4 py-5">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[var(--lightGray4)] mb-4">
        <h1 className="text-lg text-[var(--darkGray4)] font-semibold">
          Recomendados
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

      {/* Product grid */}
      <div className="grid grid-cols-5 gap-4">
        {visibleProducts.map((product, index) => (
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
        ))}
      </div>
      <div className="ps-section__footer">
        {/* <p>
          Mostrar {productsData.results.length} de {productsData.count}{' '}
          Produtos.
        </p> */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

// Calculate discount percentage
function calculateDiscount(original, sale) {
  const originalPrice = parseFloat(original)
  const salePrice = parseFloat(sale)
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return null
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

export default Recomended

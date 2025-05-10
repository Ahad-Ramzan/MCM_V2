'use client'

import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ProductCardStar from '@/ui/ProductCardStar'
import { getAllProducts } from '@/apis/products'

const BestSale = () => {
  const [startIndex, setStartIndex] = useState(0)

  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  console.log(productsData, 'final products')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts()
        setProductsData(response)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])
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

  return (
    <div className="hidden xl:block w-full ml-4 py-5">
      {/* Header */}
      <div className=" flex justify-between items-center border-b border-[var(--lightGray4)] mb-4">
        <h1 className="text-lg text-[var(--darkGray4)] font-semibold">
          Mais Vendidos
        </h1>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className=" p-2 rounded-full disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= productsData.results.length}
            className=" p-2 rounded-full disabled:opacity-50"
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

export default BestSale

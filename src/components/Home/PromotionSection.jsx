'use client'

import React, { useRef, useEffect, useState } from 'react'
import CountdownTimer from '@/ui/CountdownTimer'
import ProductCard from '@/ui/ProductCard'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { getAllProducts } from '@/apis/products'
import useSearchStore from '@/store/searchStore'
// import useSearchStore from '@/stores/searchStore'

const PromotionSection = () => {
  const { searchTerm, searchResults } = useSearchStore()
  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(0)

  const fetchData = async () => {
    try {
      const response = await getAllProducts(1, searchTerm)
      setProductsData(response)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [searchTerm]) // Refetch when searchTerm changes

  // Use searchResults if available, otherwise use regular products
  const displayProducts = searchTerm ? searchResults : productsData.results

  // Rest of your component remains the same, just use displayProducts instead of productsData.results
  return (
    <div className="Container mx-auto py-6 my-8">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
        <div className="flex items-center flex-wrap gap-3">
          <h2 className="text-xl font-semibold">
            {searchTerm ? `Resultados para "${searchTerm}"` : 'Promoções'}
          </h2>
          {!searchTerm && <CountdownTimer targetDate="2025-04-15T23:59:59" />}
        </div>
        <button className="text-sm underline text-gray-500 hover:text-gray-700">
          Ver todos
        </button>
      </div>

      {/* Scrollable Product List */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll(-300)}
          className="absolute -left-2 top-[35%] z-10 p-2 hidden sm:flex items-center justify-center text-black hover:text-white hover:bg-[var(--primary)] text-2xl h-8 w-7 cursor-pointer"
        >
          <FaChevronLeft size={14} />
        </button>

        {/* Product Scroll Row */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth scroll-pl-4 scroll-pr-4 snap-x snap-mandatory no-scrollbar px-8"
        >
          {displayProducts.map((product, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0 w-[200px] sm:w-[220px] md:w-[240px]"
            >
              <ProductCard
                productId={product.id}
                image={product.product_thumbnail}
                brand={product.brand}
                title={product.product_name}
                price={product.regular_price + '€'}
                rating={product.rating || 4}
                sold={product.sold_items}
                discount={calculateDiscount(
                  product.regular_price,
                  product.sale_price
                )}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll(300)}
          className="absolute right-0 top-[35%] z-10 p-2 hidden sm:flex items-center justify-center text-black hover:text-white hover:bg-[var(--primary)] text-2xl h-8 w-7 cursor-pointer"
        >
          <FaChevronRight size={14} />
        </button>
      </div>

      {/* Dots for small screens */}
      {visibleCount > 0 && (
        <div className="flex justify-center items-center gap-2 mt-4 lg:hidden">
          {Array.from({
            length: Math.ceil(displayProducts.length / visibleCount),
          }).map((_, idx) => {
            const isActive = Math.floor(activeIndex / visibleCount) === idx
            return (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx * visibleCount)}
                className={`h-2 w-2 cursor-pointer rounded-full transition-all duration-300 ${
                  isActive ? 'bg-[var(--primary)] scale-125' : 'bg-gray-300'
                }`}
              />
            )
          })}
        </div>
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

export default PromotionSection

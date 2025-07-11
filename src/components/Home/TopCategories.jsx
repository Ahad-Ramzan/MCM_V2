'use client'
import React, { useEffect, useState } from 'react'
import CategoryCard from '@/ui/TopCategoryCard'
import { getAllCategories } from '@/apis/products'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import useProductsStore from '@/store/productsStore'
import { useRouter } from 'next/navigation'

const TopCategories = ({ category }) => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(0)
  const cardsPerPage = 7
  const { setSelectedCategory, fetchFilteredProducts } = useProductsStore()

  // Calculate total number of pages
  const totalPages = Math.ceil(category.length / cardsPerPage)

  // Navigate to previous page
  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  // Navigate to next page
  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  // Get current visible cards
  const getVisibleCards = () => {
    const startIndex = currentPage * cardsPerPage
    const endIndex = startIndex + cardsPerPage
    return category.slice(startIndex, endIndex)
  }

  // Handle category selection - same as BottomNavbar
  const handleCategorySelect = async (categoryId, categoryName, e) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedCategory(categoryId, categoryName)
    await fetchFilteredProducts()
    router.push(`/category?category=${categoryId}`)
  }

  return (
    <div className="Container my-10 relative">
      <h2 className="text-lg font-semibold mb-4">Top Categorias</h2>

      <div className="relative px-8">
        {/* Left Arrow */}
        <button
          onClick={prevPage}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
        >
          <FaChevronLeft />
        </button>

        {/* Cards Container */}
        <div className="flex justify-center gap-4 transition-all duration-500 ease-in-out">
          {getVisibleCards().map((item, index) => (
            <div
              key={index + currentPage * cardsPerPage}
              className="w-[140px] sm:w-[160px] md:w-[180px] transition-all duration-300"
              onClick={(e) => handleCategorySelect(item.id, item.name, e)}
            >
              <CategoryCard title={item.name} image={item.image} id={item.id} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextPage}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentPage === idx
                  ? 'bg-[var(--primary)] scale-125'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TopCategories

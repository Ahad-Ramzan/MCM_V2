'use client'
import React, { useEffect, useState } from 'react'
import CategoryCard from '@/ui/CategoryCard'
import { getAllCategories } from '@/apis/products'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import useProductsStore from '@/store/productsStore'
import { useRouter } from 'next/navigation'

const CategoryGrid = () => {
  const router = useRouter()
  const [categories, setCategories] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [currentPage, setCurrentPage] = useState(0)
  const cardsPerPage = 5 // Number of cards to show at once

  // Get store functions
  const {
    setCategories: setStoreCategories,
    setSelectedCategory,
    setSelectedSubcategory,
    fetchFilteredProducts,
  } = useProductsStore()

  const fetchCategoryData = async () => {
    try {
      const response = await getAllCategories()
      setCategories(response)
      setStoreCategories(response.results || [])
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  useEffect(() => {
    fetchCategoryData()
  }, [])

  const handleCategorySelect = async (categoryId, categoryName, e) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedCategory(categoryId, categoryName)
    await fetchFilteredProducts()
    router.push(`/category?category=${categoryId}`)
  }

  const handleSubcategorySelect = async (subcategoryId, subcategoryName, e) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedSubcategory(subcategoryId, subcategoryName)
    await fetchFilteredProducts()
    router.push(`/category?subcategory=${subcategoryId}`)
  }

  // Calculate total number of pages
  const totalPages = Math.ceil((categories.results?.length || 0) / cardsPerPage)

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
    if (!categories.results || categories.results.length === 0) return []
    const startIndex = currentPage * cardsPerPage
    const endIndex = startIndex + cardsPerPage
    return categories.results.slice(startIndex, endIndex)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative px-8">
        {/* Left Arrow */}
        <button
          onClick={prevPage}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
          disabled={categories.results?.length <= cardsPerPage}
        >
          <FaChevronLeft />
        </button>

        {/* Cards Container */}
        <div className="flex justify-between gap-4 transition-all duration-500 ease-in-out">
          {getVisibleCards().map((category, index) => (
            <div key={index} className="flex-1 min-w-0">
              <CategoryCard
                title={category.name}
                items={category.sub_categories}
                image={category.image}
                onCategorySelect={handleCategorySelect}
                onSubcategorySelect={handleSubcategorySelect}
                categoryId={category.id}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextPage}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
          disabled={categories.results?.length <= cardsPerPage}
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

export default CategoryGrid

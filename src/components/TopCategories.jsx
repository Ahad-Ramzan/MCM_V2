'use client'
import React, { useEffect, useRef, useState } from 'react'
import CategoryCard from '@/ui/TopCategoryCard'
import { getCategoriesAllData } from '@/apis/products'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const TopCategories = () => {
  const [categories, setCategories] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  console.log(categories, 'cateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const cardWidth = 160
  const gap = 12

  const fetchAllCategories = async () => {
    try {
      const response = await getCategoriesAllData()
      setCategories(response)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const scrollAmount = (cardWidth + gap) * direction
      const newScroll = container.scrollLeft + scrollAmount
      container.scrollTo({ left: newScroll, behavior: 'smooth' })

      const indexChange = direction > 0 ? 1 : -1
      setActiveIndex((prev) => Math.max(0, prev + indexChange))
    }
  }

  useEffect(() => {
    fetchAllCategories()
  }, [])

  return (
    <div className="Container mx-auto py-6 my-8">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
        <h2 className="text-xl font-semibold">Top Categorias</h2>
        <button className="text-sm underline text-gray-500 hover:text-gray-700">
          Ver todos
        </button>
      </div>

      {/* Scrollable Categories */}
      <div className="relative">
        {/* Left Arrow */}
        {categories.results.length > 1 && (
          <button
            onClick={() => scroll(-1)}
            disabled={activeIndex === 0}
            className={`absolute -left-2 top-[35%] z-10 p-2 flex items-center justify-center text-black hover:text-white hover:bg-[var(--primary)] text-2xl h-8 w-7 cursor-pointer ${
              activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaChevronLeft size={14} />
          </button>
        )}

        {/* Category Scroll Row */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar px-8"
        >
          {categories.results.map((category, idx) => (
            <div key={idx} className="shrink-0">
              <CategoryCard title={category.name} image={category.image} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {categories.results.length > 1 && (
          <button
            onClick={() => scroll(1)}
            disabled={activeIndex >= categories.results.length - 1}
            className={`absolute -right-2 top-[35%] z-10 p-2 flex items-center justify-center text-black hover:text-white hover:bg-[var(--primary)] text-2xl h-8 w-7 cursor-pointer ${
              activeIndex >= categories.results.length - 1
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            <FaChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  )
}

export default TopCategories

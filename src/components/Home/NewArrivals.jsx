'use client'
import Link from 'next/link'
import React, { useRef, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ProductCardStarHorizontal from '@/ui/ProductCardStarHorizontal'
import { getAllProducts } from '@/apis/products'
import Pagination from '../SuperAdmin/elements/basic/Pagination'

const NewArrivals = () => {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [cardWidth, setCardWidth] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)

  const totalPages = Math.ceil(productsData.count / 10)

  const fetchData = async (page = 1) => {
    setLoading(true)
    try {
      const response = await getAllProducts(page)
      setProductsData(response)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page) => {
    fetchData(page)
  }

  // Calculate card width and visible count
  useEffect(() => {
    const updateDimensions = () => {
      if (scrollRef.current && scrollRef.current.firstChild) {
        const card = scrollRef.current.firstChild
        const style = window.getComputedStyle(card)
        const margin =
          parseFloat(style.marginRight) + parseFloat(style.marginLeft)
        const cardWidth = card.offsetWidth + margin
        setCardWidth(cardWidth)

        const containerWidth = scrollRef.current.offsetWidth
        setVisibleCount(Math.max(1, Math.floor(containerWidth / cardWidth)))
      }
    }

    updateDimensions()
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [productsData.results])

  // Scroll functions
  const scroll = (direction) => {
    if (!scrollRef.current || !cardWidth) return

    const container = scrollRef.current
    const newIndex =
      direction === 'left'
        ? Math.max(0, activeIndex - 1)
        : Math.min(productsData.results.length - 1, activeIndex + 1)

    container.scrollTo({
      left: newIndex * cardWidth,
      behavior: 'smooth',
    })
    setActiveIndex(newIndex)
  }

  const scrollToIndex = (index) => {
    const container = scrollRef.current
    if (container && cardWidth) {
      container.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
    }
  }

  // Update active index on scroll
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const index = cardWidth ? Math.round(scrollLeft / cardWidth) : 0
      setActiveIndex(index)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [cardWidth])

  const canScrollLeft = activeIndex > 0
  const canScrollRight =
    activeIndex < productsData.results.length - visibleCount

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="Container py-6 my-8">
      {/* Menu Bar */}
      <div className="w-full flex justify-between bg-gray-100 p-4 my-12">
        <h2 className="text-xl font-normal">Novas Chegadas</h2>
        <div className="flex gap-4 items-center text-sm text-[var(--darkGray4)]">
          <Link href="#">Ver todos</Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--secondary)]"></div>
        </div>
      ) : (
        <>
          {/* Product Carousel */}
          <div className="relative">
            <button
              onClick={() => scroll('left')}
              className={`absolute -left-2 top-[35%] z-10 p-2 hidden sm:flex items-center justify-center text-black hover:text-white hover:bg-[var(--primary)] text-2xl h-8 w-7 cursor-pointer ${
                !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!canScrollLeft || loading}
            >
              <FaChevronLeft size={14} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth scroll-pl-4 scroll-pr-4 snap-x snap-mandatory no-scrollbar px-8"
            >
              {productsData.results.length > 0 ? (
                productsData.results.map((product) => (
                  <div key={product.id} className="flex-shrink-0 snap-start">
                    <ProductCardStarHorizontal
                      image={product.product_thumbnail}
                      title={product.product_name}
                      price={product.regular_price + '€'}
                    />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-10 text-gray-500">
                  Nenhum produto encontrado.
                </div>
              )}
            </div>

            <button
              onClick={() => scroll('right')}
              className={`absolute -right-2 top-[35%] z-10 p-2 hidden sm:flex items-center justify-center text-black hover:text-white hover:bg-[var(--primary)] text-2xl h-8 w-7 cursor-pointer ${
                !canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!canScrollRight || loading}
            >
              <FaChevronRight size={14} />
            </button>
          </div>

          {/* Mobile dots indicator */}
          {productsData.results.length > 0 && (
            <div className="flex justify-center gap-2 mt-4 lg:hidden">
              {Array.from({
                length: Math.ceil(productsData.results.length / visibleCount),
              }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx * visibleCount)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    Math.floor(activeIndex / visibleCount) === idx
                      ? 'bg-[var(--primary)] scale-125'
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {productsData.results.length > 0 && totalPages > 1 && (
            <div className="mt-6">
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

export default NewArrivals

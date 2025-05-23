'use client'

import React, { useRef, useEffect, useState } from 'react'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'
import ProductCardStar from '@/ui/ProductCardStar'
import { getAllProducts } from '@/apis/products'
import Pagination from '../SuperAdmin/elements/basic/Pagination'

const products = Array(12).fill({
  image: '/placeholder.png',
  brand: 'Marca Produto',
  price: '10,99€',
  title: 'Placas de Gesso',
  rating: 4,
  sold: 73,
  soldRatio: 0.4,
})

const InsulationSection = () => {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: offset,
        behavior: 'smooth',
      })
    }
  }

  const scrollToIndex = (index) => {
    const container = scrollRef.current
    if (container) {
      const itemWidth = container.children[0].offsetWidth + 16 // card width + gap
      container.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth',
      })
    }
  }
  const [currentPage, setCurrentPage] = useState(1)

  // Update active dot on scroll
  useEffect(() => {
    const container = scrollRef.current

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const itemWidth = container.children[0].offsetWidth + 16
      const index = Math.round(scrollLeft / itemWidth)
      setActiveIndex(index)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

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

  // Dynamically calculate how many cards fit in viewport
  useEffect(() => {
    const container = scrollRef.current

    const updateVisibleCount = () => {
      if (container && container.children.length > 0) {
        const containerWidth = container.offsetWidth
        const cardWidth = container.children[0].offsetWidth + 16 // 16px gap
        setVisibleCount(Math.floor(containerWidth / cardWidth))
      }
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)

    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  const handlePageChange = (page) => {
    fetchData(page)
  }

  const totalPages = Math.ceil(productsData.count / 10)

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="Container py-6 my-8">
      {/* Menu Bar  */}
      <div className="w-full flex justify-between flex-wrap bg-gray-100 p-4 my-12">
        <h2 className="text-xl font-normal">Isolamentos e ETICS</h2>
        <div className="flex gap-4 flex-wrap items-center text-sm text-[var(--darkGray4)] text-nowrap">
          <Link href="#">Novos</Link>
          <Link href="#">Mais Vendidos</Link>
          <Link href="#">Populares</Link>
          <Link href="#">Ver todos</Link>
        </div>
      </div>

      {/* Scrollable Product List */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll(-300)}
          className="absolute -left-2 top-[35%] z-10  p-2 hidden sm:flex items-center justify-center text-black hover:text-white hover:bg-[var(--primary)] text-2xl h-8 w-7 cursor-pointer"
        >
          <FaChevronLeft size={14} />
        </button>

        {/* Product Scroll Row */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth scroll-pl-4 scroll-pr-4 snap-x snap-mandatory no-scrollbar px-8"
        >
          {productsData.results.map((product, index) => (
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

        {/* Right Arrow */}
        <button
          onClick={() => scroll(300)}
          className="absolute right-0 top-[35%] z-10 p-2 hidden sm:flex items-center justify-center text-black hover:text-white hover:bg-[var(--primary)] text-2xl h-8 w-7 cursor-pointer"
        >
          <FaChevronRight size={14} />
        </button>
      </div>

      {/* Dots for small screens */}
      <div className="flex justify-center items-center gap-2 mt-4 lg:hidden ">
        {Array.from({ length: Math.ceil(products.length / visibleCount) }).map(
          (_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx * visibleCount)}
              className={`h-2 w-2 cursor-pointer rounded-full transition-all duration-300 ${
                Math.floor(activeIndex / visibleCount) === idx
                  ? 'bg-[var(--primary)] scale-125'
                  : 'bg-gray-300'
              }`}
            ></button>
          )
        )}
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

function calculateDiscount(original, sale) {
  const originalPrice = parseFloat(original)
  const salePrice = parseFloat(sale)
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return null
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

export default InsulationSection

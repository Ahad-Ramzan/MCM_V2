'use client'

import React, { useRef, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'
import ProductCardStar from '@/ui/ProductCardStar'
import {
  getAllProducts,
  getAllCategories,
  getAllListAllProducts,
  getAllPopularProducts,
  getAllNewProducts,
  getAllBestSellers,
} from '@/apis/products'
import Pagination from '../SuperAdmin/elements/basic/Pagination'
import { toast } from 'react-toastify'
import useProductsStore from '@/store/productsStore'

const ConstructionMaterials = () => {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [featuredCategory, setFeaturedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  const { setSelectedCategory } = useProductsStore()
  const [viewMode, setViewMode] = useState('default')

  // Fetch featured category and its products
  const fetchFeaturedCategory = async () => {
    try {
      const categoriesResponse = await getAllCategories()
      const featuredCat = categoriesResponse.results.find(
        (cat) => cat.feature === 'feature2' // Changed to feature2
      )

      if (!featuredCat) {
        throw new Error('No category with feature2 found')
      }

      return featuredCat
    } catch (error) {
      console.error('Error fetching featured category:', error)
      toast.error('Failed to load featured category')
      return null
    }
  }

  const fetchProducts = async (categoryId, page = 1) => {
    try {
      const response = await getAllProducts(
        page,
        '', // search
        '', // brand
        categoryId, // category
        '' // status
      )
      return response
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
      return {
        count: 0,
        next: null,
        previous: null,
        results: [],
      }
    }
  }

  const fetchBestSellers = async (categoryId) => {
    try {
      const response = await getAllBestSellers(categoryId)
      return {
        count: response.count,
        next: null,
        previous: null,
        results: response.results,
      }
    } catch (error) {
      console.error('Error fetching best sellers:', error)
      toast.error('Failed to load best sellers')
      return {
        count: 0,
        next: null,
        previous: null,
        results: [],
      }
    }
  }

  // Fetch new products
  const fetchNewProducts = async (categoryId) => {
    try {
      const response = await getAllNewProducts(categoryId)
      return {
        count: response.count,
        next: null,
        previous: null,
        results: response.results,
      }
    } catch (error) {
      console.error('Error fetching new products:', error)
      toast.error('Failed to load new products')
      return {
        count: 0,
        next: null,
        previous: null,
        results: [],
      }
    }
  }

  // Fetch popular products
  const fetchPopularProducts = async (categoryId) => {
    try {
      const response = await getAllPopularProducts(categoryId)
      return {
        count: response.count,
        next: null,
        previous: null,
        results: response.results,
      }
    } catch (error) {
      console.error('Error fetching popular products:', error)
      toast.error('Failed to load popular products')
      return {
        count: 0,
        next: null,
        previous: null,
        results: [],
      }
    }
  }

  const fetchallDataProducts = async (categoryId) => {
    try {
      const response = await getAllListAllProducts(categoryId)
      return {
        count: response.count,
        next: null,
        previous: null,
        results: response.results,
      }
    } catch (error) {
      console.error('Error fetching popular products:', error)
      toast.error('Failed to load popular products')
      return {
        count: 0,
        next: null,
        previous: null,
        results: [],
      }
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)

      // 1. Get featured category
      const category = await fetchFeaturedCategory()
      if (!category) {
        setLoading(false)
        return
      }

      setFeaturedCategory(category)
      setSelectedCategory(category.id, category.name)

      // 2. Get products for this category
      const products = await fetchProducts(category.id)
      setProductsData(products)

      setLoading(false)
    }

    loadData()
  }, [])

  const handlePageChange = async (page) => {
    if (!featuredCategory) return

    setLoading(true)
    const products = await fetchProducts(featuredCategory.id, page)
    setProductsData(products)
    setCurrentPage(page)
    setLoading(false)
  }

  // Scroll functions
  const scroll = (offset) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: 'smooth' })
  }

  const scrollToIndex = (index) => {
    const container = scrollRef.current
    if (container && container.children[0]) {
      const itemWidth = container.children[0].offsetWidth + 16
      container.scrollTo({ left: index * itemWidth, behavior: 'smooth' })
    }
  }

  // Update active dot on scroll
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const itemWidth = container.children[0]?.offsetWidth + 16 || 300
      const index = Math.round(scrollLeft / itemWidth)
      setActiveIndex(index)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [productsData.results])

  // Calculate visible items count
  useEffect(() => {
    const container = scrollRef.current
    if (!container || !container.children[0]) return

    const updateVisibleCount = () => {
      const containerWidth = container.offsetWidth
      const cardWidth = container.children[0].offsetWidth + 16
      setVisibleCount(Math.max(1, Math.floor(containerWidth / cardWidth)))
    }

    updateVisibleCount()
    const resizeObserver = new ResizeObserver(updateVisibleCount)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [productsData.results])

  const handleViewModeChange = async (mode) => {
    if (!featuredCategory || mode === viewMode) return

    setLoading(true)
    setViewMode(mode)

    try {
      let products
      switch (mode) {
        case 'bestSellers':
          products = await fetchBestSellers(featuredCategory.id)
          break
        case 'newProducts':
          products = await fetchNewProducts(featuredCategory.id)
          break
        case 'popularProducts':
          products = await fetchPopularProducts(featuredCategory.id)
          break
        case 'seeall':
          products = await fetchallDataProducts(featuredCategory.id)
          break

        default:
          products = await fetchProducts(featuredCategory.id)
      }
      setProductsData(products)
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(productsData.count / 10)

  return (
    <div className="Container py-6 my-8">
      {/* Menu Bar */}
      <div className="w-full flex justify-between flex-wrap bg-gray-100 p-4 my-6 sm:my-12">
        <h2 className="text-xl font-normal">
          {featuredCategory?.name || 'Materiais de Construção'}
        </h2>
        <div className="flex gap-4 flex-wrap items-center text-sm text-[var(--darkGray4)] text-nowrap">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleViewModeChange('newProducts')
            }}
            className={viewMode === 'newProducts' ? 'font-bold' : ''}
          >
            Novos
          </Link>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleViewModeChange('bestSellers')
            }}
            className={viewMode === 'bestSellers' ? 'font-bold' : ''}
          >
            Mais Vendidos
          </Link>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleViewModeChange('popularProducts')
            }}
            className={viewMode === 'popularProducts' ? 'font-bold' : ''}
          >
            Populares
          </Link>

          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleViewModeChange('seeall')
            }}
            className={viewMode === 'seeall' ? 'font-bold' : ''}
          >
            Ver todos
          </Link>
          {/* {featuredCategory && (
                            <Link href={`/category?category=${featuredCategory.id}`}>
                              Ver todos
                            </Link>
                          )} */}
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
              onClick={() => scroll(-300)}
              className="absolute -left-2 top-[35%] z-10 p-2 hidden sm:flex items-center justify-center text-black hover:text-white hover:bg-[var(--primary)] text-2xl h-8 w-7 cursor-pointer"
              disabled={loading}
            >
              <FaChevronLeft size={14} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto scroll-smooth scroll-pl-4 scroll-pr-4 snap-x snap-mandatory no-scrollbar px-8"
            >
              {productsData.results.length > 0 ? (
                productsData.results.map((product) => (
                  <ProductCardStar
                    key={product.id}
                    productId={product.id}
                    image={product.product_thumbnail}
                    brand={product.brand}
                    title={product.product_name}
                    price={`${product.regular_price}€`}
                    sold={product.sold_items}
                    discount={calculateDiscount(
                      product.regular_price,
                      product.sale_price
                    )}
                  />
                ))
              ) : (
                <div className="w-full text-center py-10 text-gray-500">
                  Nenhum produto encontrado nesta categoria.
                </div>
              )}
            </div>

            <button
              onClick={() => scroll(300)}
              className="absolute -right-2 top-[35%] z-10 p-2 hidden sm:flex items-center justify-center text-black hover:text-white hover:bg-[var(--primary)] text-2xl h-8 w-7 cursor-pointer"
              disabled={loading}
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

function calculateDiscount(original, sale) {
  const originalPrice = parseFloat(original)
  const salePrice = parseFloat(sale)
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return null
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

export default ConstructionMaterials

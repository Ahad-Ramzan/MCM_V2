'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { getAllBrands, getAllCategories, getAllProducts } from '@/apis/products'
import { useRouter, useSearchParams } from 'next/navigation'
import useProductsStore from '@/store/productsStore'

const SidebarFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Zustand store values
  const {
    products,
    brands,
    categories,
    setProducts,
    setBrands,
    setCategories,
  } = useProductsStore()

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [price, setPrice] = useState([0, 10000])
  const [loading, setLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Debounce price changes to avoid too many API calls
  const [priceDebounceTimeout, setPriceDebounceTimeout] = useState(null)

  // Memoized URL update function to prevent unnecessary re-renders
  const updateUrlAndFetchProducts = useCallback(
    (categoryId, brandId, minPrice, maxPrice, shouldFetch = true) => {
      // Update URL parameters without causing page jump
      const params = new URLSearchParams(searchParams.toString())

      if (categoryId) {
        params.set('category', categoryId)
      } else {
        params.delete('category')
      }

      if (brandId) {
        params.set('brand', brandId)
      } else {
        params.delete('brand')
      }

      params.set('sale_price_min', minPrice)
      params.set('sale_price_max', maxPrice)

      // Use replace instead of push to prevent page jump
      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.replaceState({}, '', newUrl)

      // Fetch products with filters only if needed
      if (shouldFetch) {
        fetchProductsWithFilters(categoryId, brandId, minPrice, maxPrice)
      }
    },
    [searchParams]
  )

  const handlePriceChange = useCallback(
    (index, value) => {
      const newPrice = [...price]
      newPrice[index] = parseInt(value)
      setPrice(newPrice)

      // Clear previous timeout
      if (priceDebounceTimeout) {
        clearTimeout(priceDebounceTimeout)
      }

      // Debounce the API call to avoid too many requests
      const timeout = setTimeout(() => {
        updateUrlAndFetchProducts(
          selectedCategory,
          selectedBrand,
          newPrice[0],
          newPrice[1]
        )
      }, 300) // 300ms debounce

      setPriceDebounceTimeout(timeout)
    },
    [
      price,
      selectedCategory,
      selectedBrand,
      updateUrlAndFetchProducts,
      priceDebounceTimeout,
    ]
  )

  const handleCategorySelect = useCallback(
    (categoryId) => {
      // Prevent event bubbling
      event?.stopPropagation()

      const newCategory = selectedCategory === categoryId ? null : categoryId
      setSelectedCategory(newCategory)
      updateUrlAndFetchProducts(newCategory, selectedBrand, price[0], price[1])
    },
    [selectedCategory, selectedBrand, price, updateUrlAndFetchProducts]
  )

  const handleBrandSelect = useCallback(
    (brandId) => {
      // Prevent event bubbling
      event?.stopPropagation()

      const newBrand = selectedBrand === brandId ? null : brandId
      setSelectedBrand(newBrand)
      updateUrlAndFetchProducts(selectedCategory, newBrand, price[0], price[1])
    },
    [selectedCategory, selectedBrand, price, updateUrlAndFetchProducts]
  )

  const fetchBrands = useCallback(async () => {
    try {
      const response = await getAllBrands()
      setBrands(response.results || [])
    } catch (error) {
      console.error('Failed to fetch brands:', error)
    }
  }, [setBrands])

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getAllCategories()
      setCategories(response.results || [])
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }, [setCategories])

  const fetchProductsWithFilters = useCallback(
    async (categoryId, brandId, min, max) => {
      try {
        setLoading(true)
        const data = await getAllProducts(
          1,
          searchParams.get('search') || '',
          brandId || '',
          categoryId || '',
          searchParams.get('status') || '',
          min,
          max
        )
        setProducts(data.results || [])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    },
    [searchParams, setProducts]
  )

  const clearAllFilters = useCallback(() => {
    setSelectedCategory(null)
    setSelectedBrand(null)
    setPrice([0, 10000])
    updateUrlAndFetchProducts(null, null, 0, 10000)
  }, [updateUrlAndFetchProducts])

  // Memoized check for active filters
  const hasActiveFilters = useMemo(() => {
    return selectedCategory || selectedBrand || price[0] > 0 || price[1] < 10000
  }, [selectedCategory, selectedBrand, price])

  // Initialize filters from URL parameters only once
  useEffect(() => {
    if (!isInitialized) {
      const initializeFilters = async () => {
        // Fetch data first
        await Promise.all([fetchBrands(), fetchCategories()])

        // Get initial values from URL
        const categoryFromUrl = searchParams.get('category')
        const brandFromUrl = searchParams.get('brand')
        const minPrice = searchParams.get('sale_price_min') || 0
        const maxPrice = searchParams.get('sale_price_max') || 10000

        // Set initial state
        setSelectedCategory(categoryFromUrl ? parseInt(categoryFromUrl) : null)
        setSelectedBrand(brandFromUrl ? parseInt(brandFromUrl) : null)
        setPrice([parseInt(minPrice), parseInt(maxPrice)])

        // Fetch products with initial filters
        await fetchProductsWithFilters(
          categoryFromUrl ? parseInt(categoryFromUrl) : null,
          brandFromUrl ? parseInt(brandFromUrl) : null,
          minPrice,
          maxPrice
        )

        setIsInitialized(true)
      }

      initializeFilters()
    }
  }, [
    isInitialized,
    searchParams,
    fetchBrands,
    fetchCategories,
    fetchProductsWithFilters,
  ])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (priceDebounceTimeout) {
        clearTimeout(priceDebounceTimeout)
      }
    }
  }, [priceDebounceTimeout])

  return (
    <div className="hidden max-w-[250px] xl:flex xl:flex-col h-[calc(100vh-120px)] sticky top-[120px]">
      <div className="overflow-y-auto flex-1 p-2 space-y-6">
        {/* Categories */}
        <div className="bg-gray-100 p-4">
          <h3 className="font-semibold mb-6 text-md uppercase">Categorias</h3>
          <ul className="space-y-3 text-sm text-[var(--darkGray4)]">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleCategorySelect(cat.id)
                }}
              >
                <div className="relative">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat.id}
                    onChange={(e) => {
                      e.stopPropagation()
                      handleCategorySelect(cat.id)
                    }}
                    className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-0 focus:ring-offset-0 focus:outline-none focus:border-gray-300 focus:shadow-none"
                    style={{
                      outline: 'none',
                      boxShadow: 'none',
                      border:
                        selectedCategory === cat.id
                          ? '2px solid var(--secondary)'
                          : '2px solid #d1d5db',
                    }}
                  />
                </div>
                <span
                  className={`${
                    selectedCategory === cat.id ? 'font-bold text-black' : ''
                  }`}
                >
                  {cat.name}
                </span>
              </li>
            ))}
          </ul>

          {/* Clear Category Filter */}
          {selectedCategory && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleCategorySelect(null)
              }}
              className="mt-3 text-xs text-red-500 hover:text-red-700 underline"
            >
              Limpar categoria
            </button>
          )}
        </div>

        {/* Brands */}
        <div className="bg-gray-100 p-4">
          <h3 className="font-semibold mb-3 text-md uppercase">Marcas</h3>
          <ul className="space-y-3 text-sm text-[var(--darkGray4)]">
            {brands.map((brand) => (
              <li
                key={brand.id}
                className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleBrandSelect(brand.id)
                }}
              >
                <div className="relative">
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === brand.id}
                    onChange={(e) => {
                      e.stopPropagation()
                      handleBrandSelect(brand.id)
                    }}
                    className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-0 focus:ring-offset-0 focus:outline-none focus:border-gray-300 focus:shadow-none"
                    style={{
                      outline: 'none',
                      boxShadow: 'none',
                      border:
                        selectedBrand === brand.id
                          ? '2px solid var(--secondary)'
                          : '2px solid #d1d5db',
                    }}
                  />
                </div>
                <span
                  className={`${
                    selectedBrand === brand.id ? 'font-bold text-black' : ''
                  }`}
                >
                  {brand.brand_name}
                </span>
              </li>
            ))}
          </ul>

          {/* Clear Brand Filter */}
          {selectedBrand && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleBrandSelect(null)
              }}
              className="mt-3 text-xs text-red-500 hover:text-red-700 underline"
            >
              Limpar marca
            </button>
          )}
        </div>

        {/* Price Range */}
        <div className="bg-gray-100 p-4">
          <h3 className="font-semibold mb-4 text-md uppercase">Preço</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-600">Min</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={price[0]}
                  onChange={(e) => {
                    e.stopPropagation()
                    handlePriceChange(0, e.target.value)
                  }}
                  className="w-full accent-[var(--secondary)]"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-600">Max</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={price[1]}
                  onChange={(e) => {
                    e.stopPropagation()
                    handlePriceChange(1, e.target.value)
                  }}
                  className="w-full accent-red-500"
                />
              </div>
            </div>

            {/* Price Input Fields */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                min="0"
                max="10000"
                value={price[0]}
                onChange={(e) => {
                  e.stopPropagation()
                  handlePriceChange(0, e.target.value)
                }}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[var(--secondary)]"
                placeholder="Min"
              />
              <span className="text-xs text-gray-500">-</span>
              <input
                type="number"
                min="0"
                max="10000"
                value={price[1]}
                onChange={(e) => {
                  e.stopPropagation()
                  handlePriceChange(1, e.target.value)
                }}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[var(--secondary)]"
                placeholder="Max"
              />
            </div>

            <p className="text-xs text-gray-700 text-center mt-2">
              Preço: {price[0]}€ - {price[1]}€
            </p>

            {loading && (
              <div className="flex items-center justify-center mt-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--secondary)]"></div>
                <span className="text-xs text-gray-500 ml-2">
                  Carregando...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarFilter

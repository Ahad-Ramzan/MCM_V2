'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { getAllBrands, getAllCategories, getAllProducts } from '@/apis/products'
import { useRouter } from 'next/navigation'
import useProductsStore from '@/store/productsStore'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

const SidebarFilter = () => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  // Zustand store values
  const {
    products,
    brands,
    categories,
    selectedCategory,
    selectedSubcategory,
    setProducts,
    setBrands,
    setCategories,
    setSelectedCategory,
    setSelectedSubcategory,
  } = useProductsStore()

  const [expandedCategories, setExpandedCategories] = useState({})
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [price, setPrice] = useState([0, 10000])
  const [loading, setLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [priceDebounceTimeout, setPriceDebounceTimeout] = useState(null)

  // Toggle category expansion
  const toggleCategory = useCallback((categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }, [])

  // Get current URL parameters
  const getCurrentParams = useCallback(() => {
    if (typeof window === 'undefined') return {}

    const params = new URLSearchParams(window.location.search)
    return {
      category: params.get('category'),
      subcategory: params.get('subcategory'),
      brand: params.get('brand'),
      sale_price_min: params.get('sale_price_min') || '0',
      sale_price_max: params.get('sale_price_max') || '10000',
      search: params.get('search') || '',
      status: params.get('status') || '',
    }
  }, [])

  // Memoized URL update function
  const updateUrlAndFetchProducts = useCallback(
    (
      categoryId,
      subcategoryId,
      brandId,
      minPrice,
      maxPrice,
      shouldFetch = true
    ) => {
      if (typeof window === 'undefined') return

      const params = new URLSearchParams(window.location.search)

      if (categoryId) {
        params.set('category', categoryId)
      } else {
        params.delete('category')
      }

      if (subcategoryId) {
        params.set('subcategory', subcategoryId)
      } else {
        params.delete('subcategory')
      }

      if (brandId) {
        params.set('brand', brandId)
      } else {
        params.delete('brand')
      }

      params.set('sale_price_min', minPrice)
      params.set('sale_price_max', maxPrice)

      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.replaceState({}, '', newUrl)

      if (shouldFetch) {
        fetchProductsWithFilters(
          categoryId,
          subcategoryId,
          brandId,
          minPrice,
          maxPrice
        )
      }
    },
    []
  )

  const handlePriceChange = useCallback(
    (index, value) => {
      const newPrice = [...price]
      newPrice[index] = parseInt(value)
      setPrice(newPrice)

      if (priceDebounceTimeout) {
        clearTimeout(priceDebounceTimeout)
      }

      const timeout = setTimeout(() => {
        updateUrlAndFetchProducts(
          selectedCategory,
          selectedSubcategory,
          selectedBrand,
          newPrice[0],
          newPrice[1]
        )
      }, 300)

      setPriceDebounceTimeout(timeout)
    },
    [
      price,
      selectedCategory,
      selectedSubcategory,
      selectedBrand,
      updateUrlAndFetchProducts,
      priceDebounceTimeout,
    ]
  )

  const handleCategorySelect = useCallback(
    (categoryId, categoryName) => {
      const newCategory = selectedCategory === categoryId ? null : categoryId
      const newCategoryName =
        selectedCategory === categoryId ? '' : categoryName

      setSelectedCategory(newCategory, newCategoryName)
      // Do not clear subcategory when selecting a new category
      updateUrlAndFetchProducts(
        newCategory,
        selectedSubcategory,
        selectedBrand,
        price[0],
        price[1]
      )

      // Expand the selected category
      if (newCategory) {
        setExpandedCategories((prev) => ({
          ...prev,
          [newCategory]: true,
        }))
      }
    },
    [
      selectedCategory,
      selectedSubcategory,
      selectedBrand,
      price,
      updateUrlAndFetchProducts,
      setSelectedCategory,
    ]
  )

  const handleSubcategorySelect = useCallback(
    (subcategoryId, subcategoryName) => {
      const newSubcategory =
        selectedSubcategory === subcategoryId ? null : subcategoryId
      const newSubcategoryName =
        selectedSubcategory === subcategoryId ? '' : subcategoryName

      setSelectedSubcategory(newSubcategory, newSubcategoryName)
      updateUrlAndFetchProducts(
        selectedCategory,
        newSubcategory,
        selectedBrand,
        price[0],
        price[1]
      )
    },
    [
      selectedSubcategory,
      selectedBrand,
      price,
      updateUrlAndFetchProducts,
      setSelectedSubcategory,
      selectedCategory,
    ]
  )

  const handleBrandSelect = useCallback(
    (brandId) => {
      const newBrand = selectedBrand === brandId ? null : brandId

      // If a brand is selected, ensure the category is set
      if (newBrand) {
        const defaultCategoryId = categories[0]?.id // Set to the first category or any logic you prefer
        setSelectedCategory(defaultCategoryId, categories[0]?.name) // Set the default category
      } else {
        setSelectedCategory(null, '') // Clear category if brand is deselected
      }

      setSelectedBrand(newBrand)
      updateUrlAndFetchProducts(
        newBrand ? selectedCategory : null,
        selectedSubcategory,
        newBrand,
        price[0],
        price[1]
      )
    },
    [
      selectedCategory,
      selectedSubcategory,
      selectedBrand,
      price,
      updateUrlAndFetchProducts,
      categories,
    ]
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
    async (categoryId, subcategoryId, brandId, min, max) => {
      try {
        setLoading(true)
        const currentParams = getCurrentParams()
        const data = await getAllProducts(
          1,
          currentParams.search || '',
          brandId || '',
          categoryId || '',
          currentParams.status || '',
          min,
          max,
          subcategoryId || ''
        )
        setProducts(data.results || [])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    },
    [getCurrentParams, setProducts]
  )

  const clearAllFilters = useCallback(() => {
    setSelectedCategory(null, '')
    setSelectedSubcategory(null, '')
    setSelectedBrand(null)
    setPrice([0, 10000])
    updateUrlAndFetchProducts(null, null, null, 0, 10000)
  }, [updateUrlAndFetchProducts, setSelectedCategory, setSelectedSubcategory])

  const hasActiveFilters = useMemo(() => {
    return (
      selectedCategory ||
      selectedSubcategory ||
      selectedBrand ||
      price[0] > 0 ||
      price[1] < 10000
    )
  }, [selectedCategory, selectedSubcategory, selectedBrand, price])

  // Initialize filters from URL parameters only once
  useEffect(() => {
    setIsClient(true)

    if (!isInitialized && typeof window !== 'undefined') {
      const initializeFilters = async () => {
        await Promise.all([fetchBrands(), fetchCategories()])
        const currentParams = getCurrentParams()

        setSelectedCategory(
          currentParams.category ? parseInt(currentParams.category) : null,
          ''
        )
        setSelectedSubcategory(
          currentParams.subcategory
            ? parseInt(currentParams.subcategory)
            : null,
          ''
        )
        setSelectedBrand(
          currentParams.brand ? parseInt(currentParams.brand) : null
        )
        setPrice([
          parseInt(currentParams.sale_price_min),
          parseInt(currentParams.sale_price_max),
        ])

        // Expand category if subcategory is selected
        if (currentParams.subcategory) {
          const parentCategory = categories.find((cat) =>
            cat.sub_categories?.some(
              (sub) => sub.id === parseInt(currentParams.subcategory)
            )
          )
          if (parentCategory) {
            setExpandedCategories((prev) => ({
              ...prev,
              [parentCategory.id]: true,
            }))
          }
        }

        await fetchProductsWithFilters(
          currentParams.category ? parseInt(currentParams.category) : null,
          currentParams.subcategory
            ? parseInt(currentParams.subcategory)
            : null,
          currentParams.brand ? parseInt(currentParams.brand) : null,
          currentParams.sale_price_min,
          currentParams.sale_price_max
        )

        setIsInitialized(true)
      }

      initializeFilters()
    }
  }, [
    isInitialized,
    getCurrentParams,
    fetchBrands,
    fetchCategories,
    fetchProductsWithFilters,
    categories,
    setSelectedCategory,
    setSelectedSubcategory,
  ])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (priceDebounceTimeout) {
        clearTimeout(priceDebounceTimeout)
      }
    }
  }, [priceDebounceTimeout])

  if (!isClient || !isInitialized) {
    return (
      <div className="hidden max-w-[250px] xl:flex xl:flex-col h-[calc(100vh-120px)] sticky top-[120px]"></div>
    )
  }

  return (
    <div className="hidden max-w-[250px] xl:flex xl:flex-col h-[calc(100vh-120px)] sticky top-[120px]">
      <div className="overflow-y-auto flex-1 p-2 space-y-6">
        {/* Categories */}
        <div className="bg-gray-100 p-4">
          <h3 className="font-semibold mb-6 text-md uppercase">Categorias</h3>
          <ul className="space-y-3 text-sm text-[var(--darkGray4)]">
            {categories.map((cat) => (
              <li key={cat.id} className="space-y-3">
                <div className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
                  <div className="relative">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.id}
                      onChange={(e) => {
                        e.stopPropagation()
                        handleCategorySelect(cat.id, cat.name)
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
                    className={`flex-1 ${selectedCategory === cat.id ? 'font-bold text-black' : ''}`}
                    onClick={() => toggleCategory(cat.id)}
                  >
                    {cat.name}
                  </span>
                  {cat.sub_categories?.length > 0 && (
                    <button onClick={() => toggleCategory(cat.id)}>
                      {expandedCategories[cat.id] ? (
                        <MdKeyboardArrowUp size={18} />
                      ) : (
                        <MdKeyboardArrowDown size={18} />
                      )}
                    </button>
                  )}
                </div>

                {/* Subcategories */}
                {expandedCategories[cat.id] &&
                  cat.sub_categories?.length > 0 && (
                    <ul className="ml-6 space-y-2">
                      {cat.sub_categories.map((sub) => (
                        <li
                          key={sub.id}
                          className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleSubcategorySelect(sub.id, sub.name)
                          }}
                        >
                          <div className="relative">
                            <input
                              type="radio"
                              name="subcategory"
                              checked={selectedSubcategory === sub.id}
                              onChange={(e) => {
                                e.stopPropagation()
                                handleSubcategorySelect(sub.id, sub.name)
                              }}
                              className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-0 focus:ring-offset-0 focus:outline-none focus:border-gray-300 focus:shadow-none"
                              style={{
                                outline: 'none',
                                boxShadow: 'none',
                                border:
                                  selectedSubcategory === sub.id
                                    ? '2px solid var(--secondary)'
                                    : '2px solid #d1d5db',
                              }}
                            />
                          </div>
                          <span
                            className={`${selectedSubcategory === sub.id ? 'font-bold text-black' : ''}`}
                          >
                            {sub.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>

          {(selectedCategory || selectedSubcategory) && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                clearAllFilters()
              }}
              className="mt-3 text-xs text-red-500 hover:text-red-700 underline"
            >
              Limpar filtros
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
                  className={`${selectedBrand === brand.id ? 'font-bold text-black' : ''}`}
                >
                  {brand.brand_name}
                </span>
              </li>
            ))}
          </ul>

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

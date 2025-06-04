'use client'
import { getAllBrands, getAllCategories } from '@/apis/products'
import React, { useEffect, useState } from 'react'

const SidebarFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [price, setPrice] = useState([0, 2000])
  const [categories, setcategories] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [brandsdata, setBrandsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  const handlePriceChange = (index, value) => {
    const newPrice = [...price]
    newPrice[index] = Number(value)
    setPrice(newPrice)
  }

  const fetchData = async () => {
    try {
      const response = await getAllBrands()
      setBrandsData(response)
    } catch (error) {
      console.error('Failed to fetch brands:', error)
    }
  }

  const fetchCategoryData = async () => {
    try {
      const response = await getAllCategories()
      setcategories(response)
    } catch (error) {
      console.error('Failed to fetch brands:', error)
    }
  }

  useEffect(() => {
    fetchData()
    fetchCategoryData()
  }, [])

  return (
    <div className="hidden max-w-[250px] xl:flex xl:flex-col h-[calc(100vh-120px)] sticky top-[120px]">
      {/* Scrollable Content (Categories and Brands) */}
      <div className="overflow-y-auto flex-1 p-2 space-y-6">
        {/* Categories */}
        <div className="bg-gray-100 p-4">
          <h3 className="font-semibold mb-6 text-md uppercase">Categorias</h3>
          <ul className="space-y-2 text-sm text-[var(--darkGray4)]">
            {categories.results.map((cat, i) => (
              <li
                key={i}
                className={`cursor-pointer hover:underline ${
                  selectedCategory === cat ? 'font-bold text-black' : ''
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div className="bg-gray-100 p-4">
          <h3 className="font-semibold mb-3 text-md uppercase">Marcas</h3>
          <ul className="space-y-2 text-sm text-[var(--darkGray4)]">
            {brandsdata.results.map((brand, i) => (
              <li
                key={i}
                className={`cursor-pointer hover:underline ${
                  selectedBrand === brand ? 'font-bold text-black' : ''
                }`}
                onClick={() => setSelectedBrand(brand.id)}
              >
                {brand.brand_name}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-100 p-4">
          <h3 className="font-semibold mb-4 text-md uppercase">Preço</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <input
                type="range"
                min="0"
                max="2000"
                value={price[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                className="w-full accent-[var(--secondary)]"
              />
              <input
                type="range"
                min="0"
                max="2000"
                value={price[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                className="w-full accent-red-500"
              />
            </div>
            <p className="text-xs text-gray-700 text-center">
              Preço: {price[0]}€ - {price[1]}€
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Price Filter at Bottom */}
    </div>
  )
}

export default SidebarFilter

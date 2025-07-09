'use client'
import React, { useEffect, useState } from 'react'
import { Brandimg } from '@/assets/images/index'
import { getBrandAllData } from '@/apis/products'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const BrandsLogoBar = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleCount = 5 // Number of brands to show at once

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrandAllData()
        setBrands(data || [])
      } catch (err) {
        console.error('Failed to fetch brands:', err)
        setError('Failed to load brands')
      } finally {
        setLoading(false)
      }
    }
    fetchBrands()
  }, [])

  const nextBrand = () => {
    setCurrentIndex((prev) =>
      prev >= brands.length - visibleCount ? 0 : prev + 1
    )
  }

  const prevBrand = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? brands.length - visibleCount : prev - 1
    )
  }

  const getVisibleBrands = () => {
    return brands.slice(currentIndex, currentIndex + visibleCount)
  }

  if (loading) return <div className="py-8 text-center">Loading brands...</div>
  if (error) return <div className="py-8 text-center text-red-500">{error}</div>
  if (!brands.length)
    return <div className="py-8 text-center">No brands available</div>

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Featured Brands
        </h2>
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prevBrand}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
            disabled={brands.length <= visibleCount}
          >
            <FaChevronLeft />
          </button>

          {/* Brands Container */}
          <div className="flex justify-center gap-4 overflow-hidden px-10">
            {getVisibleBrands().map((brand) => (
              <div
                key={brand.id}
                className="flex-shrink-0 w-64 rounded-lg border border-gray-100 hover:border-blue-200 transition-all"
              >
                <div className="flex items-center p-4">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img
                      src={brand.image || Brandimg.src}
                      alt={brand.brand_name || 'Brand logo'}
                      className="object-contain max-w-full max-h-full"
                      onError={(e) => {
                        e.target.src = Brandimg.src
                      }}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">
                      {brand.brand_name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Shop now →</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextBrand}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
            disabled={brands.length <= visibleCount}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BrandsLogoBar

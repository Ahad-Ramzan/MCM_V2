'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProductCardStarHorizontal from '@/ui/ProductCardStarHorizontal'
import { getAllProducts } from '@/apis/products'
import Pagination from '../SuperAdmin/elements/basic/Pagination'

const NewArrivals = () => {
  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(productsData.count / 10)
  const fetchData = async (page = 1) => {
    try {
      const response = await getAllProducts(page)
      setProductsData(response)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const handlePageChange = (page) => {
    fetchData(page)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="Container py-6 my-8">
      {/* Menu Bar  */}
      <div className="w-full flex justify-between bg-gray-100 p-4 my-12">
        <h2 className="text-xl font-normal">Novas Chegadas</h2>
        <div className="flex gap-4 items-center text-sm text-[var(--darkGray4)]">
          <Link href="#">Ver todos</Link>
        </div>
      </div>
      {/* New arrivals Map */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {productsData.results.map((product, index) => (
          <ProductCardStarHorizontal
            key={product.id || index}
            image={product.product_thumbnail}
            title={product.product_name}
            price={product.regular_price + '€'}
          />
        ))}
      </div>
      <div className="ps-section__footer">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default NewArrivals

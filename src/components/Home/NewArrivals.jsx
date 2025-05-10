'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProductCardStarHorizontal from '@/ui/ProductCardStarHorizontal'
import { getAllProducts } from '@/apis/products'

const NewArrivals = () => {
  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  const fetchData = async () => {
    try {
      const response = await getAllProducts()
      setProductsData(response)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* {[1, 2, 3, 4, 5, 6, 7, 8].map((product) => (
          <ProductCardStarHorizontal key={product} />
        ))} */}
        {productsData.results.map((product, index) => (
          <ProductCardStarHorizontal
            key={product.id || index}
            // productId={product.id}
            image={product.product_thumbnail}
            // brand={product.brand}
            title={product.product_name}
            price={product.regular_price + '€'}
            // sold={product.sold_items}
            // discount={calculateDiscount(
            //   product.regular_price,
            //   product.sale_price
            // )}
          />
        ))}
      </div>
    </div>
  )
}

export default NewArrivals

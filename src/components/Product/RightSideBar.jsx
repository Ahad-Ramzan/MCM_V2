'use client'
import ProductCardStar from '@/ui/ProductCardStar'
import React, { useEffect, useState } from 'react'
import { ProductInfoTabs } from './product-info-tabs'
import ProductDetails from './ProductDetails'
import { getAllProducts } from '@/apis/products'

const RightSideBar = () => {
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
    <aside className="hidden xl:block w-full lg:w-[280px] p-4  bg-white space-y-6">
      {/* Features List */}
      <div className="space-y-4 bg-gray-50 p-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          🌐 Envíos Rápidos
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          💸 Reembolsos até 7 dias
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          💰 Grandes Poupanças
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          💳 Pagamento Seguro
        </div>
      </div>

      {/* Placeholder Banner */}
      <div className="bg-gray-100 aspect-square p-4 w-full rounded" />
      <div className="bg-gray-100 aspect-square p-4 w-full rounded" />

      {/* <div className="border border-[var(--lightGray4)] ">
        <div className="bg-gray-100   w-full h-9 rounded flex items-center ">
          <h3 className="text-sm font-semibold pl-4">Marca 1</h3>
        </div>

      
        <div className="p-4">
          {productsData.results.map((product, index) => (
            <ProductCardStar
              key={product.id || index}
              productId={product.id}
              image={product.product_thumbnail}
              brand={product.brand}
              title={product.product_name}
              price={product.regular_price + '€'}
              sold={product.sold_items}
             
            />
          ))}
        
        </div>
      </div> */}
    </aside>
  )
}

export default RightSideBar

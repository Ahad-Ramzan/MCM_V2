'use client'
import React, { useEffect, useState } from 'react'
import ProductCardStar from '@/ui/ProductCardStar'
import { FaTh, FaBars } from 'react-icons/fa'
import { getAllProducts } from '@/apis/products'

const itemsPerPage = 15

const ProductListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts()
        setProductsData(response)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  const totalPages = Math.ceil(productsData.results.length / itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const visibleProducts = productsData.results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  console.log(visibleProducts, 'visible product brands')
  useEffect(() => {
    console.log('Visible products:', visibleProducts)
  }, [visibleProducts])

  return (
    <div className="w-full lg:px-4 py-6 bg-white">
      {/* Top bar */}
      <div className="flex flex-wrap w-full justify-between items-center border border-gray-100 p-3 bg-gray-50 mb-6">
        <p className="text-sm text-gray-700">
          <strong>{productsData.results.length}</strong> Produtos encontrados
        </p>

        <div className="flex gap-4 flex-wrap items-center justify-between">
          <select className="text-sm border border-gray-300 rounded px-2 py-1 mt-2">
            <option>Ordenar por</option>
            <option>Preço: menor para maior</option>
            <option>Preço: maior para menor</option>
          </select>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>Mostrar</span>
            <FaTh className="cursor-pointer text-gray-500 hover:text-black" />
            <FaBars className="cursor-pointer text-gray-500 hover:text-black" />
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {visibleProducts.map((product, index) => (
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

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm  disabled:opacity-50"
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 text-sm ${
              currentPage === i + 1
                ? 'text-black'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm  disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

// Discount helper
function calculateDiscount(original, sale) {
  const originalPrice = parseFloat(original)
  const salePrice = parseFloat(sale)
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return null
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

export default ProductListPage

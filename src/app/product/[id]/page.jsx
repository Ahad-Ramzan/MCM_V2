'use client'
import { getAllProducts, getProductsById } from '@/apis/products'
import Breadcrumb from '@/components/Breadcrumb'
import { ProductInfoTabs } from '@/components/Product/product-info-tabs'
import ProductDetails from '@/components/Product/ProductDetails'
import RightSideBar from '@/components/Product/RightSideBar'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function Product() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id
  const [productData, setProductsData] = useState(null)

  useEffect(() => {
    if (productData?.product_name) {
      document.title = `'${productData.product_name}' - MCM - Materiais Construção`
    }
  }, [productData?.product_name])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductsById(productId)
        setProductsData(response)
      } catch (error) {
        console.error('Failed to fetch product:', error)
      }
    }
    if (productId) {
      fetchData()
    }
  }, [productId])

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Categorea', href: '/' },
          { label: productData?.product_name || 'Placa de Gesso' },
        ]}
      />
      <div className="Container flex  flex-col lg:flex-row w-full mt-20 ">
        <div className="flex-1 p-4">
          {productData && <ProductDetails productData={productData} />}
          {productData && <ProductInfoTabs productData={productData} />}
        </div>
        <RightSideBar />
      </div>
      <div className="Container mx-auto">
        <h2 className="text-2xl font-semibold pb-4 border-b border-[var(--lightGray4)]">
          Produtos Semelhantes
        </h2>
        <p className="text-[var(--darkGray4)] my-6">Produto nao encontrado</p>
      </div>
    </div>
  )
}

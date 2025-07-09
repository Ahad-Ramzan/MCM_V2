'use client'
import Breadcrumb from '@/components/Breadcrumb'
import CheckoutPage from '@/components/checkout/CheckoutPage'
import React from 'react'

export default function Category() {
  return (
    <div className="mt-20">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Carinho', href: '/' },
          { label: 'Finalizar Compra' }, // No href means current page
        ]}
      />
      <CheckoutPage />
    </div>
  )
}

'use client'

import { CartProvider } from './context/CartContext'
// Import other providers here if needed

export function Providers({ children }) {
  return (
    <CartProvider>
      {/* Add other providers here */}
      {children}
    </CartProvider>
  )
}
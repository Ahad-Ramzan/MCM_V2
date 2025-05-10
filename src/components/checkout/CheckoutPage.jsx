'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import useCartStore from '@/cartstore/estore'
import { createOrder } from '@/apis/products'
// import { Toaster } from 'react-hot-toast'
import toast, { Toaster } from 'react-hot-toast'

// Simple styled inputs/buttons:
function Input({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={`border border-[var(--lightGray4)] px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[var(--secondary)] ${className}`}
      value={value}
      onChange={onChange}
    />
  )
}

function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-[var(--secondary)] text-white px-6 py-2 hover:bg-[var(--secondary2)] transition rounded"
    >
      {children}
    </button>
  )
}

function Checkbox({ name, checked, onChange }) {
  return (
    <input
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-[var(--secondary)] border-[var(--lightGray4)] rounded focus:ring-[var(--secondary)]"
    />
  )
}

export default function Checkout() {
  const router = useRouter()
  const cartItems = useCartStore((s) => s.cart)
  const clearCart = useCartStore((s) => s.clearCart)

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: '',
    saveForFuture: false,
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setFormData((f) => ({ ...f, [name]: value }))
  }

  const handleCheckbox = (e) => {
    const { name, checked } = e.target
    setFormData((f) => ({ ...f, [name]: checked }))
  }

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const handleSubmit = async () => {
    if (!cartItems.length) {
      // alert('Your cart is empty.')
      toast.success('Cart is Empty !')
      return
    }
    const payload = {
      product_ids: cartItems.map((i) => i.id),
      delivery_info: {
        recipient_name: `${formData.firstName} ${formData.lastName}`,
        address: formData.address,
        phone_number: formData.phone,
        city: formData.city,
        postal_code: formData.postalCode,
        country: 'Pakistan',
      },
    }
    try {
      await createOrder(payload)
      clearCart()
      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
        email: '',
        saveForFuture: false,
      })
      // alert('Order created successfully!')
      toast.success('Order created successfully!')
      router.push('/checkout')
    } catch {
      // alert('Failed to create order.')
      toast.error('Failed to create order.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Finalize Your Order</h1>
      <Toaster position="top-center" />
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-4">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInput}
          />
          <Input
            name="phone"
            type="tel"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleInput}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInput}
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInput}
            />
            <Input
              name="address"
              placeholder="Address"
              className="md:col-span-2"
              value={formData.address}
              onChange={handleInput}
            />
            <Input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInput}
            />
            <Input
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleInput}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              name="saveForFuture"
              checked={formData.saveForFuture}
              onChange={handleCheckbox}
            />
            <label className="text-sm">Save this info for next time</label>
          </div>
          <Button onClick={handleSubmit}>Place Order</Button>
        </div>

        {/* Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          <div className="border p-4 space-y-3">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">No products in cart.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.product_name} × {item.quantity}
                  </span>
                  <span>€{item.price * item.quantity}</span>
                </div>
              ))
            )}
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>Subtotal</span>
              <span>€{subtotal}</span>
            </div>
            <div className="flex justify-between font-bold mt-1">
              <span>Total</span>
              <span>€{subtotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

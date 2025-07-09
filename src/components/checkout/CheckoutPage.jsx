// import React from 'react'
// import useCartStore from '@/cartstore/estore'
// import { useRouter } from 'next/navigation'
// import { createOrder } from '@/apis/products'
// import toast, { Toaster } from 'react-hot-toast'

// export default function CheckoutPage() {
//   const router = useRouter()
//   const cartItems = useCartStore((state) => state.cart)
//   const removeFromCart = useCartStore((state) => state.removeFromCart)
//   const clearCart = useCartStore((state) => state.clearCart)
//   const updateQuantity = useCartStore((state) => state.updateQuantity)

//   const shippingCost = 5.99
//   const tax = 3.51

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   )
//   const total = subtotal + shippingCost + tax

//   const handleRemove = (id) => {
//     removeFromCart(id)
//   }

//   const handleFinalizeOrder = async () => {
//     if (!cartItems.length) {
//       toast.error('Your cart is empty!')
//       return
//     }
//     try {
//       const payload = {
//         product_items: cartItems.map((item) => ({
//           product_id: item.id,
//           quantity: item.quantity,
//         })),
//       }
//       await createOrder(payload)
//       clearCart()
//       toast.success('Order placed successfully!')
//       router.push('/checkout')
//     } catch (e) {
//       toast.error('Failed to place order.')
//     }
//   }

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 px-2 sm:px-8 py-10 flex flex-col gap-8">
//       <Toaster position="top-center" />
//       <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-700 tracking-tight drop-shadow-sm">
//         🛒 Seu Carrinho{' '}
//         <span className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-base ml-2">
//           {cartItems.length} items
//         </span>
//       </h1>
//       <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
//         {/* Cart Items */}
//         <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
//           {cartItems.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16">
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
//                 alt="Empty Cart"
//                 className="w-28 mb-6 opacity-70"
//               />
//               <p className="text-gray-500 text-xl">Seu carrinho está vazio.</p>
//             </div>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center gap-4 border-b last:border-b-0 border-gray-200 py-6 group transition"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.product_name}
//                   className="w-20 h-20 object-cover rounded-xl border border-gray-100 shadow"
//                 />
//                 <div className="flex-1">
//                   <div className="font-bold text-lg text-gray-800 mb-1">
//                     {item.product_name}
//                   </div>
//                   <div className="flex items-center gap-2 mt-1">
//                     <button
//                       className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-lg hover:bg-blue-200 transition disabled:opacity-50"
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       disabled={item.quantity <= 1}
//                       aria-label="Decrease quantity"
//                     >
//                       −
//                     </button>
//                     <input
//                       type="text"
//                       value={item.quantity}
//                       className="w-12 text-center outline-none border-none bg-transparent font-semibold text-lg"
//                       readOnly
//                       aria-label="Quantity"
//                     />
//                     <button
//                       className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-lg hover:bg-blue-200 transition"
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       aria-label="Increase quantity"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 <div className="font-bold text-xl text-pink-500 min-w-[80px] text-right">
//                   €{(item.price * item.quantity).toFixed(2)}
//                 </div>
//                 <button
//                   className="ml-4 text-sm px-3 py-1 rounded-full bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition font-semibold shadow-sm"
//                   onClick={() => handleRemove(item.id)}
//                 >
//                   Remover
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Order Summary */}
//         <div className="w-full lg:w-[340px]">
//           <div className="bg-gradient-to-br from-blue-100 via-white to-pink-100 rounded-2xl shadow-xl p-8 border border-blue-100 sticky top-10">
//             <h2 className="text-xl font-bold mb-6 text-blue-700 flex items-center gap-2">
//               <span className="text-2xl">🧾</span> Resumo do pedido
//             </h2>
//             <div className="flex justify-between mb-2 text-gray-700">
//               <span>Sub Total:</span>
//               <span className="font-medium">€{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between mb-2 text-gray-700">
//               <span>Custos de envio :</span>
//               <span className="font-medium">€{shippingCost.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between mb-2 text-gray-700">
//               <span>Impostos:</span>
//               <span className="font-medium">€{tax.toFixed(2)}</span>
//             </div>
//             <div className="border-t border-blue-200 my-4"></div>
//             <div className="flex justify-between font-extrabold text-xl text-blue-900 mb-4">
//               <span>Total :</span>
//               <span>€{total.toFixed(2)}</span>
//             </div>
//             <button
//               className="mt-2 w-full bg-gradient-to-r from-blue-500 to-pink-400 hover:from-blue-600 hover:to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg transition text-lg tracking-wide"
//               onClick={handleFinalizeOrder}
//             >
//               Finalizar Encomenda
//             </button>
//             <p className="text-xs text-gray-400 text-center mt-3">
//               Seu pagamento é seguro e criptografado.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

//

// import React, { useState } from 'react'
// import useCartStore from '@/cartstore/estore'
// import { useRouter } from 'next/navigation'
// import { createOrder } from '@/apis/products'
// import toast, { Toaster } from 'react-hot-toast'

// export default function CheckoutPage() {
//   const router = useRouter()
//   const cartItems = useCartStore((state) => state.cart)
//   const removeFromCart = useCartStore((state) => state.removeFromCart)
//   const clearCart = useCartStore((state) => state.clearCart)
//   const updateQuantity = useCartStore((state) => state.updateQuantity)

//   const custosEnvio = 0
//   const impostos = 0

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   )
//   const total = subtotal + custosEnvio + impostos

//   const removerItem = (id) => {
//     removeFromCart(id)
//   }

//   const handleFinalizarClick = async () => {
//     if (!cartItems.length) {
//       toast.error('Seu carrinho está vazio!')
//       return
//     }

//     try {
//       const payload = {
//         product_items: cartItems.map((item) => ({
//           product_id: item.id,
//           quantity: item.quantity,
//         })),
//       }

//       await createOrder(payload)
//       clearCart()
//       toast.success('Encomenda realizada com sucesso!')
//       // router.push('/encomendas')
//     } catch (e) {
//       toast.error('Falha ao finalizar encomenda.')
//     }
//   }

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 px-2 sm:px-8 py-10 flex flex-col gap-8 relative">
//       <Toaster position="top-center" />

//       <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-700 tracking-tight drop-shadow-sm">
//         🛒 Seu Carrinho{' '}
//         <span className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-base ml-2">
//           {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
//         </span>
//       </h1>

//       <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
//         {/* Itens do Carrinho */}
//         <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
//           {cartItems.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16">
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
//                 alt="Carrinho Vazio"
//                 className="w-28 mb-6 opacity-70"
//               />
//               <p className="text-gray-500 text-xl">Seu carrinho está vazio.</p>
//               <button
//                 onClick={() => router.push('/')}
//                 className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//               >
//                 Continuar Comprando
//               </button>
//             </div>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center gap-4 border-b last:border-b-0 border-gray-200 py-6 group transition"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.product_name}
//                   className="w-20 h-20 object-cover rounded-xl border border-gray-100 shadow"
//                 />
//                 <div className="flex-1">
//                   <div className="font-bold text-lg text-gray-800 mb-1">
//                     {item.product_name}
//                   </div>
//                   <div className="text-gray-500 text-sm mb-2">
//                     {item.category}
//                   </div>
//                   <div className="flex items-center gap-2 mt-1">
//                     <button
//                       className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-lg hover:bg-blue-200 transition disabled:opacity-50"
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       disabled={item.quantity <= 1}
//                       aria-label="Diminuir quantidade"
//                     >
//                       −
//                     </button>
//                     <input
//                       type="text"
//                       value={item.quantity}
//                       className="w-12 text-center outline-none border-none bg-transparent font-semibold text-lg"
//                       readOnly
//                       aria-label="Quantidade"
//                     />
//                     <button
//                       className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-lg hover:bg-blue-200 transition"
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       aria-label="Aumentar quantidade"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 <div className="font-bold text-xl text-pink-500 min-w-[80px] text-right">
//                   €{(item.price * item.quantity).toFixed(2)}
//                 </div>
//                 <button
//                   className="ml-4 text-sm px-3 py-1 rounded-full bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition font-semibold shadow-sm"
//                   onClick={() => removerItem(item.id)}
//                 >
//                   Remover
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Resumo da Encomenda */}
//         <div className="w-full lg:w-[340px]">
//           <div className="bg-gradient-to-br from-blue-100 via-white to-pink-100 rounded-2xl shadow-xl p-8 border border-blue-100 sticky top-10">
//             <h2 className="text-xl font-bold mb-6 text-blue-700 flex items-center gap-2">
//               <span className="text-2xl">🧾</span> Resumo do Pedido
//             </h2>
//             <div className="flex justify-between mb-2 text-gray-700">
//               <span>Subtotal:</span>
//               <span className="font-medium">€{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between mb-2 text-gray-700">
//               <span>Portes de Envio:</span>
//               <span className="font-medium">€{custosEnvio.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between mb-2 text-gray-700">
//               <span>Impostos:</span>
//               <span className="font-medium">€{impostos.toFixed(2)}</span>
//             </div>
//             <div className="border-t border-blue-200 my-4"></div>
//             <div className="flex justify-between font-extrabold text-xl text-blue-900 mb-4">
//               <span>Total:</span>
//               <span>€{total.toFixed(2)}</span>
//             </div>
//             <button
//               className="mt-2 w-full bg-gradient-to-r from-blue-500 to-pink-400 hover:from-blue-600 hover:to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg transition text-lg tracking-wide"
//               onClick={handleFinalizarClick}
//             >
//               Finalizar Encomenda
//             </button>
//             <p className="text-xs text-gray-400 text-center mt-3">
//               Seu pagamento é seguro e criptografado.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import React, { useState, useEffect } from 'react'
import useCartStore from '@/cartstore/estore'
import { useRouter } from 'next/navigation'
import { createOrder } from '@/apis/products'
import {
  getCurrentUser,
  AddAddress,
  deleteAddress,
  updateAddress,
} from '@/apis/userApi'
import toast, { Toaster } from 'react-hot-toast'
import { FaEdit, FaTrash, FaMapMarkerAlt, FaCheck } from 'react-icons/fa'

export default function CheckoutPage() {
  const router = useRouter()
  const cartItems = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  const [userAddresses, setUserAddresses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [newAddress, setNewAddress] = useState({
    street_address: '',
    city: '',
    country: '',
    postal_code: '',
    is_default: false,
  })
  const [selectedAddress, setSelectedAddress] = useState(null)

  const custosEnvio = 0
  const impostos = 0

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const total = subtotal + custosEnvio + impostos

  useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        const response = await getCurrentUser()
        setUserAddresses(response.addresses || [])
        // Set the default address as selected if available
        const defaultAddress = response.addresses.find(
          (addr) => addr.is_default
        )
        if (defaultAddress) {
          setSelectedAddress(defaultAddress.id)
        }
      } catch (error) {
        console.error('Failed to fetch user addresses:', error)
        toast.error('Failed to load addresses')
      }
    }

    fetchUserAddresses()
  }, [])

  const handleFinalizarClick = async () => {
    if (!cartItems.length) {
      toast.error('Seu carrinho está vazio!')
      return
    }

    if (!selectedAddress) {
      toast.error('Por favor selecione um endereço de entrega')
      return
    }

    try {
      const payload = {
        product_items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        shipping_address_id: selectedAddress,
      }

      await createOrder(payload)
      clearCart()
      toast.success('Encomenda realizada com sucesso!')
      router.push('/')
    } catch (e) {
      toast.error('Falha ao finalizar encomenda.')
    }
  }

  const handleAddressSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (editingAddress !== null) {
        // Update existing address
        await updateAddress(editingAddress, newAddress)
        setUserAddresses(
          userAddresses.map((addr) =>
            addr.id === editingAddress ? newAddress : addr
          )
        )
        toast.success('Endereço atualizado com sucesso!')
      } else {
        // Add new address
        const response = await AddAddress(newAddress)
        setUserAddresses([...userAddresses, response])
        toast.success('Endereço adicionado com sucesso!')
      }

      setNewAddress({
        street_address: '',
        city: '',
        country: '',
        postal_code: '',
        is_default: false,
      })
      setEditingAddress(null)
    } catch (error) {
      console.error('Address operation failed:', error)
      toast.error('Falha na operação de endereço')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAddress = async (id) => {
    if (window.confirm('Tem certeza de que deseja excluir este endereço?')) {
      try {
        await deleteAddress(id)
        setUserAddresses(userAddresses.filter((addr) => addr.id !== id))
        toast.success('Endereço excluído com sucesso!')
      } catch (error) {
        console.error('Failed to delete address:', error)
        toast.error('Falha ao excluir endereço')
      }
    }
  }

  const handleEditAddress = (address) => {
    setEditingAddress(address.id)
    setNewAddress({
      street_address: address.street_address,
      city: address.city,
      country: address.country,
      postal_code: address.postal_code,
      is_default: address.is_default,
    })
  }

  const handleSetDefaultAddress = async (id) => {
    try {
      await updateAddress(id, {
        ...userAddresses.find((addr) => addr.id === id),
        is_default: true,
      })
      setUserAddresses(
        userAddresses.map((addr) => ({
          ...addr,
          is_default: addr.id === id,
        }))
      )
      toast.success('Endereço padrão atualizado!')
    } catch (error) {
      console.error('Failed to set default address:', error)
      toast.error('Falha ao definir endereço padrão')
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 px-2 sm:px-8 py-10 flex flex-col gap-8 relative">
      <Toaster position="top-center" />

      <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-700 tracking-tight drop-shadow-sm">
        🛒 Seu Carrinho{' '}
        <span className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-base ml-2">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
        </span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Itens do Carrinho */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                alt="Carrinho Vazio"
                className="w-28 mb-6 opacity-70"
              />
              <p className="text-gray-500 text-xl">Seu carrinho está vazio.</p>
              <button
                onClick={() => router.push('/')}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b last:border-b-0 border-gray-200 py-6 group transition"
              >
                <img
                  src={item.image}
                  alt={item.product_name}
                  className="w-20 h-20 object-cover rounded-xl border border-gray-100 shadow"
                />
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-800 mb-1">
                    {item.product_name}
                  </div>
                  <div className="text-gray-500 text-sm mb-2">
                    {item.category}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-lg hover:bg-blue-200 transition disabled:opacity-50"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Diminuir quantidade"
                    >
                      −
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      className="w-12 text-center outline-none border-none bg-transparent font-semibold text-lg"
                      readOnly
                      aria-label="Quantidade"
                    />
                    <button
                      className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-lg hover:bg-blue-200 transition"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="font-bold text-xl text-pink-500 min-w-[80px] text-right">
                  €{(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="ml-4 text-sm px-3 py-1 rounded-full bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition font-semibold shadow-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remover
                </button>
              </div>
            ))
          )}
        </div>

        {/* Resumo da Encomenda */}
        <div className="w-full lg:w-[340px] flex flex-col gap-6">
          {/* Address Section */}

          {/* Order Summary */}
          <div className="bg-gradient-to-br from-blue-100 via-white to-pink-100 rounded-2xl shadow-xl p-6 border border-blue-100">
            <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
              🧾 Resumo do Pedido
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Portes de Envio:</span>
                <span className="font-medium">€{custosEnvio.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Impostos:</span>
                <span className="font-medium">€{impostos.toFixed(2)}</span>
              </div>
              <div className="border-t border-blue-200 my-2"></div>
              <div className="flex justify-between font-bold text-lg text-blue-900">
                <span>Total:</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="mt-4 w-full bg-gradient-to-r from-blue-500 to-pink-400 hover:from-blue-600 hover:to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg transition"
              onClick={handleFinalizarClick}
              disabled={cartItems.length === 0 || !selectedAddress}
            >
              Finalizar Encomenda
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              Seu pagamento é seguro e criptografado.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-100 via-white to-pink-100 rounded-2xl shadow-xl p-6 border border-blue-100">
            <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
              <FaMapMarkerAlt /> Endereço de Entrega
            </h2>

            {/* Address List */}
            <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
              {userAddresses.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Nenhum endereço cadastrado
                </p>
              ) : (
                userAddresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-3 rounded-lg border ${selectedAddress === address.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{address.street_address}</p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.postal_code},{' '}
                          {address.country}
                        </p>
                        {address.is_default && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                            Padrão
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditAddress(address)
                          }}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteAddress(address.id)
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add/Edit Address Form */}
            <div className="mt-4">
              <h3 className="font-medium mb-2">
                {editingAddress ? 'Editar Endereço' : 'Adicionar Novo Endereço'}
              </h3>
              <form onSubmit={handleAddressSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="Endereço"
                    value={newAddress.street_address}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        street_address: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Cidade"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CEP"
                    value={newAddress.postal_code}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        postal_code: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="País"
                    value={newAddress.country}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, country: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="defaultAddress"
                    checked={newAddress.is_default}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        is_default: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <label htmlFor="defaultAddress" className="text-sm">
                    Definir como endereço padrão
                  </label>
                </div>
                <div className="flex justify-end gap-2">
                  {editingAddress && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAddress(null)
                        setNewAddress({
                          street_address: '',
                          city: '',
                          country: '',
                          postal_code: '',
                          is_default: false,
                        })
                      }}
                      className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancelar
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {isLoading
                      ? 'Salvando...'
                      : editingAddress
                        ? 'Atualizar'
                        : 'Adicionar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

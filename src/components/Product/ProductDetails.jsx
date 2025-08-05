import React, { useState, useEffect } from 'react'
import StarRating from '@/ui/StarRating'
import { FaRegHeart, FaChartBar } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedinIn,
} from 'react-icons/fa'
import useCartStore from '../../cartstore/estore'
import { useRouter } from 'next/navigation'

const ProductDetails = ({ productData }) => {
  const {
    product_name = 'Placa de Gesso',
    brand = 'Marca 1',
    sale_price = '21.99',
    regular_price = '30.00',
    sku = 'SF1133569600-1',
    gallery = [],
    product_description = 'No description available',
    stock = 999,
    sold_items = 4,
    rating = 4,
    reviews = 1,
    tags = ['placas', 'gesso'],
    category = 'dummy',
    id = 'prod-123',
    product_thumbnail,
  } = productData || {}

  const [quantity, setQuantity] = useState(1)
  const { addToCart, cart } = useCartStore()
  const router = useRouter()

  const handleAddToCart = () => {
    const product = {
      id,
      product_name,
      price: parseFloat(sale_price),
      image: product_thumbnail,
    }
    console.log(product, 'products --------------addto acrt')
    console.log(quantity, 'quantity --------------addto acrt')
    addToCart(product, quantity)
    toast.success('Product Added to Cart')
  }

  const handleGoToCheckout = () => {
    router.push('/checkout')
  }

  useEffect(() => {
    // This will log the cart to the console after each update.
    console.log(cart)
  }, [cart])

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <Toaster position="top-center" />
      {/* Left: Image Gallery */}
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          {gallery.slice(0, 4).map((image, i) => (
            <div key={i} className="bg-gray-100 w-12 h-12 rounded">
              <img
                src={image.thumbnail || image.image}
                alt="Product"
                className="object-cover w-full h-full rounded"
              />
            </div>
          ))}
        </div>
        <div className="bg-gray-100 rounded w-[400px] h-auto sm:h-[400px]">
          <img
            src={product_thumbnail}
            alt={product_name}
            className="object-cover w-full h-full rounded"
          />
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex-1">
        <h1 className="text-xl font-semibold">{product_name}</h1>
        <div className="text-sm text-gray-500 mt-1 border-b border-gray-300 pb-2">
          Marca: <span className="text-blue-600">{brand}</span> |{' '}
          <span className="inline-flex items-center gap-1">
            <StarRating rating={rating} /> ({reviews} Avaliação
            {reviews > 1 && 's'})
          </span>
        </div>

        <div className="text-2xl font-bold text-black mt-4 mb-8">
          {sale_price} €
          <span className="text-sm line-through text-gray-500 ml-2">
            {regular_price} €
          </span>
        </div>

        {/* Product Description */}
        <p className="text-sm text-gray-600 mt-4">{product_description}</p>

        {/* Features */}
        <ul className="text-sm text-gray-500 mt-4 space-y-3 border-b border-gray-300 pb-4">
          <li>• Stock: {stock}</li>
          <li>• Vendidos: {sold_items}</li>
        </ul>

        {/* Quantity & Buttons */}
        <div className="mt-6 flex flex-wrap gap-4 border-b border-gray-300 pb-4">
          {/* Quantity Selector */}
          <div className="flex flex-col">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantidade
            </label>
            <div className="flex items-center border border-gray-300 overflow-hidden rounded">
              <button
                className="px-3 py-1 text-lg"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <input
                type="text"
                value={quantity}
                className="w-10 text-center outline-none"
                readOnly
              />
              <button
                className="px-3 py-1 text-lg"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap mt-3">
            <button
              onClick={handleAddToCart}
              className="bg-[var(--primary)] text-white px-6 py-2 rounded font-medium cursor-pointer"
            >
              Adicionar
            </button>
            <button
              onClick={handleGoToCheckout}
              className="bg-[var(--secondary)] text-white px-6 py-2 rounded font-medium cursor-pointer"
            >
              {/* Comprar Agora */}
              Checkout
            </button>
            <button className="text-gray-600 text-xl cursor-pointer">
              <FaRegHeart />
            </button>
            <button className="text-gray-500 text-xl cursor-pointer">
              <FaChartBar />
            </button>
          </div>
        </div>

        {/* Meta Info */}
        <div className="text-sm text-gray-600 mt-6 space-y-2">
          <p>
            <span className="font-semibold text-black">Reportar</span>
          </p>
          <p>
            <span className="font-semibold">SKU:</span> {sku}
          </p>
          <p>
            <span className="font-semibold">Categorias:</span> {category}
          </p>
          <p>
            <span className="font-semibold">Tags:</span>{' '}
            {tags.map((tag, i) => (
              <span key={i} className="mr-1">
                {tag}
              </span>
            ))}
          </p>
        </div>

        {/* Social Share */}
        <div className="flex gap-3 mt-4">
          <a className="bg-blue-600 text-white p-2 rounded cursor-pointer">
            <FaFacebookF size={16} />
          </a>
          <a className="bg-sky-400 text-white p-2 rounded cursor-pointer">
            <FaTwitter size={16} />
          </a>
          <a className="bg-red-600 text-white p-2 rounded cursor-pointer">
            <FaGooglePlusG size={16} />
          </a>
          <a className="bg-blue-700 text-white p-2 rounded cursor-pointer">
            <FaLinkedinIn size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

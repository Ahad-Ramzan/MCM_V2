import React from 'react'
import Image from 'next/image'
import StarRating from './StarRating'
import Link from '../../node_modules/next/link'

const ProductCard = ({
  productId,
  image = '/placeholder.png',
  brand = 'MARCA PRODUTO',
  price = '10,99€',
  title = 'Placas de Gesso',
  rating = 4,
  sold = 73,
  soldRatio = 0.5,
  discount,
  // ratio between 0 and 1
}) => {
  return (
    <Link href={`product/${productId}`} className="block">
      <div className="w-[200px] text-sm">
        {/* Image */}
        <div className="relative aspect-square w-full bg-gray-100 rounded mb-2 overflow-hidden">
          <img src={image} alt={title} className="object-cover w-full h-full" />
          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-1 right-1 bg-[var(--secondary)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              -{discount}%
            </div>
          )}
        </div>

        {/* Brand */}
        <p className="uppercase text-xs text-gray-400 border-b pb-1">{brand}</p>

        {/* Price */}
        <p className="text-[var(--secondary)] font-bold text-lg mt-2">
          {price}
        </p>

        {/* Title */}
        <p className="text-sm font-medium text-[var(--primary)]">{title}</p>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-1">
          <StarRating rating={rating} />
          <span className="text-[var(--lightGray6)] text-xs">({rating})</span>
        </div>

        {/* Progress bar */}
        <div className="mt-2 w-full h-2 bg-gray-200 ">
          <div
            className="bg-[var(--secondary)] h-full "
            style={{ width: `${soldRatio * 100}%` }}
          />
        </div>

        {/* Sold */}
        {/* <p className="text-xs text-gray-500 mt-1">Vendidos: {sold}</p> */}
      </div>
    </Link>
  )
}

export default ProductCard

'use client'
import React from 'react'
import StarRating from '@/ui/StarRating'
import Link from 'next/link'

const ProductCardStar = ({
  productId,
  image = '/globe.svg',
  brand = 'Marca Produto',
  title = 'Placas de Gesso',
  price = '10.99€', // Use dot (.) for parsing
  rating = 4,
  sold = 10,
  discount, // e.g., 20 means 20% off
}) => {
  const numericPrice = parseFloat(price.replace('€', '').replace(',', '.'))
  const discountedPrice = discount
    ? (numericPrice * (1 - discount / 100)).toFixed(2).replace('.', ',') + '€'
    : price

  const originalPriceFormatted = numericPrice.toFixed(2).replace('.', ',') + '€'

  return (
    <Link href={`product/${productId}`} className="block">
      <div className="border-[var(--lightGray4)] w-[160px] sm:w-[180px] flex flex-col gap-2 relative cursor-pointer">
        {/* <img
          src={image}
          alt={product_name}
          className="object-cover w-full h-full rounded"
        /> */}
        {/* Product Image */}
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
        <p className="text-[10px] text-[var(--darkGray4)] uppercase border-b border-[var(--lightGray4)] pb-1 mb-1">
          {brand}
        </p>

        {/* Title */}
        <h3 className="text-[13px] font-semibold text-[var(--primary)] leading-snug">
          {title}
        </h3>

        {/* Rating and count */}
        <div className="flex items-center gap-1 mt-[2px]">
          <StarRating rating={rating} />
          <span className="text-[10px] text-gray-400">{sold}</span>
        </div>
        {/* Price */}
        <div className="mt-[2px] font-semibold text-[13px] text-gray-900 flex gap-1 items-center">
          {discount ? (
            <>
              <span className="text-red-600">{discountedPrice}</span>
              <span className="line-through text-gray-400 text-[12px]">
                {originalPriceFormatted}
              </span>
            </>
          ) : (
            <>{price}</>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCardStar

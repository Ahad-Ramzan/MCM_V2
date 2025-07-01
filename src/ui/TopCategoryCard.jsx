'use client'
import React from 'react'
import Link from 'next/link'

const DEFAULT_IMAGE =
  'https://backendmcm.estelatechnologies.com/media/category_gallery/ban2.jpeg'

const CategoryCard = ({ title, image, id }) => {
  return (
    <Link href={`/category?category=${id}`} passHref legacyBehavior>
      <div className="w-[160px] h-52 min-w-[160px] relative overflow-hidden rounded-xl shadow-md cursor-pointer group">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <img
            src={DEFAULT_IMAGE}
            alt="Default Category"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center text-sm font-semibold py-2 px-2">
          <p className="truncate">{title}</p>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard

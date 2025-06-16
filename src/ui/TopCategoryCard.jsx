'use client'
import React from 'react'

// Use this specific default image instead of the random Unsplash image
const DEFAULT_IMAGE =
  'https://backendmcm.estelatechnologies.com/media/category_gallery/ban2.jpeg'

const CategoryCard = ({ title, image }) => {
  return (
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
  )
}

export default CategoryCard

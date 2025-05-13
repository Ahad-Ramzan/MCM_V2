'use client'
import React from 'react'

// Dummy placeholder image (can be replaced with your own or a free CDN like Unsplash)
const DEFAULT_IMAGE = 'https://source.unsplash.com/random/160x160'
const CategoryCard = ({ title, image }) => {
  const hasValidImage = typeof image === 'string' && image.trim() !== ''

  return (
    <div className="w-[160px] h-52 border border-[var(--lightGray4)] overflow-hidden flex flex-col justify-between hover:shadow-md transition">
      <img
        src={hasValidImage ? image : DEFAULT_IMAGE}
        alt={title}
        className="h-full w-full object-cover"
      />
      <div className="p-2 pb-10 text-center text-sm font-medium bg-white">
        {title}
      </div>
    </div>
  )
}

export default CategoryCard

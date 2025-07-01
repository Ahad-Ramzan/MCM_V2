'use client'
import React from 'react'
import Link from 'next/link'

const CategoryCard = ({
  title,
  items = [],
  image,
  categoryId,
  onCategorySelect,
  onSubcategorySelect,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg flex gap-4 p-4 w-full items-start max-w-md hover:shadow-md transition-all duration-300 bg-white group">
      {/* Image */}
      <div className="aspect-square w-[50%] h-full rounded-lg overflow-hidden bg-gray-100 group-hover:shadow-sm transition-all duration-300">
        <Link
          href={`/category?category=${categoryId}`}
          onClick={(e) => onCategorySelect(categoryId, title, e)}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </Link>
      </div>

      {/* Title & Items */}
      <div className="flex-1">
        <h3 className="font-bold mb-3 text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          <Link
            href={`/category?category=${categoryId}`}
            onClick={(e) => onCategorySelect(categoryId, title, e)}
            className="cursor-pointer"
          >
            {title}
          </Link>
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <li key={index} className="leading-tight flex items-start">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-2"></span>
              <Link
                href={`/category?subcategory=${item.id}`}
                onClick={(e) => onSubcategorySelect(item.id, item.name, e)}
                className="flex-1 group-hover:text-gray-800 transition-colors duration-300 cursor-pointer"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CategoryCard

// components/TopCategories.jsx
'use client'
import React, { useEffect, useState } from 'react'
import CategoryCard from '@/ui/TopCategoryCard'
import { getAllCategories } from '@/apis/products'

// const categories = [
//   {
//     title: "Madeiras",
//   },
//   {
//     title: "Construção",
//   },
//   {
//     title: "Ferragens",
//   },
//   {
//     title: "Ferramentas",
//   },
//   {
//     title: "Pavimentos",
//   },
//   {
//     title: "Revestimentos",
//   },
//   {
//     title: "Acrílicos",
//   },
//   {
//     title: "Cimentos",
//   },
// ];

const TopCategories = () => {
  const [categories, setCategories] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  console.log(categories, 'new categoriess added----')
  const fetchCategoryData = async () => {
    try {
      const response = await getAllCategories()
      setCategories(response)
    } catch (error) {
      console.error('Failed to fetch brands:', error)
    }
  }

  useEffect(() => {
    // fetchData()
    fetchCategoryData()
  }, [])
  return (
    <div className="Container my-10 ">
      <h2 className="text-lg font-semibold mb-4">Top Categorias</h2>
      <div className="flex gap-4 flex-wrap">
        {categories.results.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.name}
            image={category.image}
          />
        ))}
      </div>
    </div>
  )
}

export default TopCategories

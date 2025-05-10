'use client'
import React, { useEffect, useState } from 'react'
import CategoryCard from '@/ui/CategoryCard'
import { getAllCategories } from '@/apis/products'

// const Categories = [
//   {
//     title: 'Madeiras',
//     items: [
//       'Painéis e Placas',
//       'Ripas e Molduras',
//       'Sub-pavimentos',
//       'Cancelas e Escadas',
//     ],
//   },
//   {
//     title: 'Ferragens',
//     items: ['Fechaduras', 'Puxadores', 'Poleias', 'Chapas'],
//   },
//   {
//     title: 'Cimentos',
//     items: [
//       'Cimento e Cal Hidráulica',
//       'Betão seco pré-doseado',
//       'Cimento Cola',
//       'Outros',
//     ],
//   },
//   {
//     title: 'Revestimentos',
//     items: ['Cerâmicos', 'Vinílicos', 'Laminados', 'PVC e Madeira'],
//   },
//   {
//     title: 'Isolamento',
//     items: [
//       'Placas de Gesso',
//       'Espumas Acústicas',
//       'Cortiça',
//       'Impermeabilização',
//     ],
//   },
//   {
//     title: 'Drogaria',
//     items: [
//       'Massa de Recuperação',
//       'Silicones e Espumas PU',
//       'Colas',
//       'Diluentes, Ácidos e Outros',
//     ],
//   },
//   {
//     title: 'Coberturas',
//     items: ['Telhas Cerâmicas', 'Coberturas e Acessórios'],
//   },
//   {
//     title: 'Fixação',
//     items: ['Buchas Metálicas', 'Buchas Nylon', 'Parafusos', 'Pregos e Outros'],
//   },
// ]

const CategoryGrid = () => {
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
    <div className="hidden xl:block container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.results.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.name}
            items={category.sub_categories.map((sub) => sub.name)}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryGrid

'use client'

import { FaBars } from 'react-icons/fa'
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { PTflag, USflag } from '@/assets/icons/index'
import { useEffect, useState } from 'react'
import { getAllCategories } from '@/apis/products'

export default function BottomNavbar() {
  const [categories, setCategories] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [expandedCategory, setExpandedCategory] = useState(null)

  const fetchData = async (page = 1, search = '') => {
    try {
      const response = await getAllCategories(page, search)
      setCategories(response)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubcategoryToggle = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(categoryId)
    }
  }

  return (
    <div className="bg-[var(--primary)] text-[var(--White)] text-sm relative z-50">
      <nav className="Container flex items-center justify-between py-2">
        {/* Left: Category Menu */}
        <div className="relative group">
          <div className="flex items-center gap-2 font-semibold cursor-pointer">
            <FaBars size={25} />
            <Link href="/category">
              <span>Comprar por Categoria</span>
            </Link>
          </div>

          {/* Dropdown on hover */}
          <ul className="absolute top-full left-0 bg-[var(--White)] border border-[var(--darkGray)] text-black rounded w-56 p-2 hidden group-hover:block z-50 shadow-lg">
            {categories.results.map((category) => (
              <li key={category.id} className="relative">
                <div className="flex justify-between items-center hover:bg-[var(--lightGray)] px-3 py-1 cursor-pointer">
                  <Link
                    href={`/category/${category.slug}`}
                    className="flex-grow"
                  >
                    {category.name}
                  </Link>
                  {category.sub_categories?.length > 0 && (
                    <span
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleSubcategoryToggle(category.id)
                      }}
                      className="ml-2"
                    >
                      <MdKeyboardArrowRight
                        size={16}
                        className={`transition-transform ${expandedCategory === category.id ? 'rotate-90' : ''}`}
                      />
                    </span>
                  )}
                </div>

                {/* Subcategories */}
                {expandedCategory === category.id &&
                  category.sub_categories?.length > 0 && (
                    <ul className="absolute left-full top-0 ml-1 bg-[var(--White)] border border-[var(--darkGray)] rounded w-56 p-2 shadow-lg">
                      {category.sub_categories.map((subcategory) => (
                        <li key={subcategory.id}>
                          <Link
                            href={`/category/${category.slug}/${subcategory.id}`}
                            className="block hover:bg-[var(--lightGray)] px-3 py-1"
                          >
                            {subcategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        </div>

        {/* Center: Navigation Links */}
        <ul className="flex items-center gap-6 font-medium">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="">Serviços</a>
          </li>
          <li>
            <a href="#">Contactos</a>
          </li>
        </ul>

        {/* Right: Language and Options */}
        <div className="flex items-center gap-4">
          <Link href="/trackorder" className="whitespace-nowrap">
            Acompanhar Encomenda
          </Link>
          <span className="hidden sm:inline">|</span>
          <span className="whitespace-nowrap">EUR</span>
          <span className="hidden sm:inline">|</span>

          {/* Language Selector (on hover) */}
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-1">
              <Image src={PTflag} alt="PT" width={20} height={15} />
              <span>Português</span>
              <MdKeyboardArrowDown size={16} />
            </div>

            {/* Language Dropdown */}
            <ul className="absolute top-5 right-0 bg-[var(--White)] text-black shadow-lg rounded w-40 p-2 hidden group-hover:block z-50">
              <li className="hover:bg-[var(--lightGray)] px-3 py-1 cursor-pointer flex items-center gap-2">
                <Image src={PTflag} alt="PT" width={20} height={15} />
                Português
              </li>
              <li className="hover:bg-[var(--lightGray)] px-3 py-1 cursor-pointer flex items-center gap-2">
                <Image src={USflag} alt="EN" width={20} height={15} />
                English
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

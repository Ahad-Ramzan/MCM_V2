'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaBars } from 'react-icons/fa'
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md'
import { PTflag, USflag } from '@/assets/icons/index'
import { getAllCategories } from '@/apis/products'

export default function BottomNavbar() {
  const [categories, setCategories] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [expandedSubcategory, setExpandedSubcategory] = useState(null)

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
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId))
    setExpandedSubcategory(null) // Close subcategory children when category changes
  }

  const handleChildToggle = (subcategoryId) => {
    setExpandedSubcategory((prev) =>
      prev === subcategoryId ? null : subcategoryId
    )
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
                  <Link href={`/category`} className="flex-grow">
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
                        className={`transition-transform ${
                          expandedCategory === category.id ? 'rotate-90' : ''
                        }`}
                      />
                    </span>
                  )}
                </div>

                {/* Subcategories */}
                {expandedCategory === category.id &&
                  category.sub_categories?.length > 0 && (
                    <ul className="absolute left-full top-0 ml-1 bg-[var(--White)] border border-[var(--darkGray)] rounded w-56 p-2 shadow-lg">
                      {category.sub_categories.map((subcategory) => (
                        <li key={subcategory.id} className="relative">
                          <div className="flex justify-between items-center hover:bg-[var(--lightGray)] px-3 py-1 cursor-pointer">
                            <Link
                              href={`/category/${category.slug}/${subcategory.id}`}
                              className="flex-grow"
                            >
                              {subcategory.name}
                            </Link>
                            {subcategory.children?.length > 0 && (
                              <span
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  handleChildToggle(subcategory.id)
                                }}
                              >
                                <MdKeyboardArrowRight
                                  size={16}
                                  className={`transition-transform ${
                                    expandedSubcategory === subcategory.id
                                      ? 'rotate-90'
                                      : ''
                                  }`}
                                />
                              </span>
                            )}
                          </div>

                          {/* Children of Sub-category */}
                          {expandedSubcategory === subcategory.id &&
                            subcategory.children?.length > 0 && (
                              <ul className="absolute left-full top-0 ml-1 bg-[var(--White)] border border-[var(--darkGray)] rounded w-56 p-2 shadow-lg">
                                {subcategory.children.map((child) => (
                                  <li key={child.id}>
                                    <Link
                                      href={`/category/${category.slug}/${subcategory.id}/${child.id}`}
                                      className="block hover:bg-[var(--lightGray)] px-3 py-1"
                                    >
                                      {child.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
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
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/category">Category</Link>
          </li>
          <li>
            <Link href="#">Serviços</Link>
          </li>
          <li>
            <Link href="#">Contactos</Link>
          </li>
        </ul>

        {/* Right: Language Selector */}
        <div className="flex items-center gap-4">
          <Link href="/trackorder" className="whitespace-nowrap">
            Acompanhar Encomenda
          </Link>
          <span className="hidden sm:inline">|</span>
          <span className="whitespace-nowrap">EUR</span>
          <span className="hidden sm:inline">|</span>

          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-1">
              <Image src={PTflag} alt="PT" width={20} height={15} />
              <span>Português</span>
              <MdKeyboardArrowDown size={16} />
            </div>
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

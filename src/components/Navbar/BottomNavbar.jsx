'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaBars } from 'react-icons/fa'
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md'
import { PTflag, USflag } from '@/assets/icons/index'
import { getAllCategories, getAllProducts } from '@/apis/products'
import useProductsStore from '@/store/productsStore'
import { useRouter } from 'next/navigation'

export default function BottomNavbar() {
  const router = useRouter()
  const [categories, setCategories] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null)

  // Get the store functions
  const {
    setCategories: setStoreCategories,
    setSelectedCategory,
    fetchFilteredProducts,
  } = useProductsStore()

  const fetchData = async (page = 1, search = '') => {
    try {
      const response = await getAllCategories(page, search)
      setCategories(response)
      setStoreCategories(response.results || []) // Also update the store
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Handle category selection
  // const handleCategorySelect = async (categoryId, e) => {
  //   e.preventDefault()
  //   e.stopPropagation()

  //   // Update the store with the selected category
  //   setSelectedCategory(categoryId)

  //   // Fetch products with the selected category
  //   await fetchFilteredProducts(getAllProducts)

  //   // Navigate to the category page with the category parameter
  //   router.push(`/categoryById?category=${categoryId}`)
  // }

  const handleCategorySelect = async (categoryId, categoryName, e) => {
    e.preventDefault()
    e.stopPropagation()

    // Update the store with the selected category ID and name
    setSelectedCategory(categoryId, categoryName)

    // Fetch products with the selected category
    await fetchFilteredProducts(getAllProducts)

    // Navigate to the category page
    router.push(`/categoryById?category=${categoryId}`)
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
              <li
                key={category.id}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="flex justify-between items-center hover:bg-[var(--lightGray)] px-3 py-1 cursor-pointer">
                  <Link
                    href={`/category?category=${category.id}`}
                    className="flex-grow"
                    onClick={(e) =>
                      handleCategorySelect(category.id, category.name, e)
                    }
                  >
                    {category.name}
                  </Link>
                  {category.sub_categories?.length > 0 && (
                    <span className="ml-2">
                      <MdKeyboardArrowRight size={16} />
                    </span>
                  )}
                </div>

                {/* Subcategories - Show on hover */}
                {hoveredCategory === category.id &&
                  category.sub_categories?.length > 0 && (
                    <ul
                      className="absolute left-full top-0 ml-1 bg-[var(--White)] border border-[var(--darkGray)] rounded w-56 p-2 shadow-lg"
                      onMouseEnter={() => setHoveredCategory(category.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      {category.sub_categories.map((subcategory) => (
                        <li
                          key={subcategory.id}
                          className="relative"
                          onMouseEnter={() =>
                            setHoveredSubcategory(subcategory.id)
                          }
                          onMouseLeave={() => setHoveredSubcategory(null)}
                        >
                          <div className="flex justify-between items-center hover:bg-[var(--lightGray)] px-3 py-1 cursor-pointer">
                            <Link
                              href={`/category?category=${subcategory.id}`}
                              className="flex-grow"
                              onClick={(e) =>
                                handleCategorySelect(subcategory.id, e)
                              }
                            >
                              {subcategory.name}
                            </Link>
                            {subcategory.children?.length > 0 && (
                              <span>
                                <MdKeyboardArrowRight size={16} />
                              </span>
                            )}
                          </div>

                          {/* Children of Sub-category - Show on hover */}
                          {hoveredSubcategory === subcategory.id &&
                            subcategory.children?.length > 0 && (
                              <ul
                                className="absolute left-full top-0 ml-1 bg-[var(--White)] border border-[var(--darkGray)] rounded w-56 p-2 shadow-lg"
                                onMouseEnter={() =>
                                  setHoveredSubcategory(subcategory.id)
                                }
                                onMouseLeave={() => setHoveredSubcategory(null)}
                              >
                                {subcategory.children.map((child) => (
                                  <li key={child.id}>
                                    <Link
                                      href={`/category?category=${child.id}`}
                                      className="block hover:bg-[var(--lightGray)] px-3 py-1"
                                      onClick={(e) =>
                                        handleCategorySelect(child.id, e)
                                      }
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

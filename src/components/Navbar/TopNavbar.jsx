'use client'

import { useState, useEffect } from 'react'
import { LiaChartBarSolid } from 'react-icons/lia'
import { CiHeart } from 'react-icons/ci'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { FaRegUser } from 'react-icons/fa6'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MCMLogoWhite } from '@/assets/icons/index'
import useCartStore from '@/cartstore/estore'

export default function TopNavbar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const cart = useCartStore((state) => state.cart)
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  // Check login status and update state
  const checkLoginStatus = () => {
    const token = localStorage.getItem('access_token')
    console.log(token, 'token------------------------------')
    setIsLoggedIn(!!token)
  }

  useEffect(() => {
    checkLoginStatus()

    // Listen for custom login/logout event
    window.addEventListener('storageChange', checkLoginStatus)

    return () => {
      window.removeEventListener('storageChange', checkLoginStatus)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    setIsLoggedIn(false)
    window.dispatchEvent(new Event('storageChange')) // Notify other components
    router.push('/login')
  }

  return (
    <div className="bg-[var(--primary)] border-b-[0.5px] border-[var(--darkGray)]">
      <nav className="Container text-[var(--White)] py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image src={MCMLogoWhite} height={160} width={160} alt="MCM logo" />
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-6 flex items-center bg-[var(--White)] rounded-r-md">
          <select className="h-10 px-3 text-black border-r border-[var(--darkGray)] rounded-l-md">
            <option value="all">Tudo</option>
          </select>
          <input
            type="text"
            placeholder="Estou à procura de..."
            className="h-10 flex-1 px-4 text-black outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="h-10 px-4 bg-[var(--secondary)] text-[var(--White)] font-semibold rounded-r-md cursor-pointer">
            Pesquisar
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-sm">
          <IconWithBadge icon={<LiaChartBarSolid size={25} />} count={0} />
          <IconWithBadge icon={<CiHeart size={25} />} count={0} />
          <Link href="/checkout">
            <IconWithBadge
              icon={<HiOutlineShoppingBag size={25} />}
              count={totalCount}
            />
          </Link>

          {/* Profile & Auth Links */}
          <div className="flex items-center gap-2">
            <Link href="/profile">
              <FaRegUser size={25} />
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="text-white">
                  Login
                </Link>
                <Link href="/register" className="text-white">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

function IconWithBadge({ icon, count }) {
  return (
    <div className="relative cursor-pointer">
      {icon}
      <span className="absolute -bottom-1 -right-2 bg-[var(--White)] text-[var(--primary)] text-xs font-bold h-4 w-4 flex items-center justify-center rounded-full">
        {count}
      </span>
    </div>
  )
}

'use client'

import { FaBars } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { PTflag, USflag } from '@/assets/icons/index'

export default function BottomNavbar() {
  return (
    <div className="bg-[var(--primary)] text-[var(--White)] text-sm relative z-50">
      <nav className="Container flex items-center justify-between  py-2">
        {/* Left: Category Menu */}
        <div className="relative group">
          <div className="flex items-center gap-2 font-semibold cursor-pointer">
            <FaBars size={25} />
            <Link href="/category">
              <span>Comprar por Categoria</span>
            </Link>
          </div>

          {/* Dropdown on hover */}
          <ul className="absolute top-6 left-0 bg-[var(--White)] boder border-1 border-[var(--darkGray)] text-black  rounded w-56 p-2 hidden group-hover:block z-50">
            <li className="hover:bg-[var(--lightGray)] px-3 py-1 cursor-pointer">
              <Link href="/category">Categoria</Link>
            </li>
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
          <li>
            <a href="/category">Categoria</a>
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

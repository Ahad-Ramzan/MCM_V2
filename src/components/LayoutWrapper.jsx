'use client'

import { usePathname } from 'next/navigation'
import TopNavbar from '@/components/Navbar/TopNavbar'
import BottomNavbar from '@/components/Navbar/BottomNavbar'
import Newsletter from '@/components/Footer/NewsLetter'
import FooterLinks from '@/components/Footer/FooterLinks'
import MobileTopbar from '@/components/Navbar/mobile/MobileTopbar'
import MobileBottombar from '@/components/Navbar/MobileBottombar'

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()

  const isAdminRoute =  pathname.startsWith('/admin') ||
  pathname === '/login' ||
  pathname === '/register'

  return (
    <>
      {!isAdminRoute && (
        <>
          <div className="hidden xl:block">
            <TopNavbar />
            <BottomNavbar />
          </div>
          <div className="xl:hidden">
            <MobileTopbar />
            <MobileBottombar />
          </div>
        </>
      )}

      {children}

      {!isAdminRoute && (
        <>
          <span className="block border-t-1 border-[var(--lightGray6)] w-full my-8" />
          <Newsletter />
          <span className="block border-t-1 border-[var(--lightGray6)] w-full my-8" />
          <FooterLinks />
        </>
      )}
    </>
  )
}

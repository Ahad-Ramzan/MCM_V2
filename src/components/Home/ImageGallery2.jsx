'use client'

import { getbanner } from '@/apis/products'
import React, { useEffect, useState } from 'react'

export default function ImageGallery2() {
  const [banners, setBanners] = useState([])

  // Get footer banners
  const footerBanner1 = banners.find((banner) => banner.position === 'footer_1')
  const footerBanner2 = banners.find((banner) => banner.position === 'footer_2')

  const fetchBanners = async () => {
    try {
      const response = await getbanner()
      setBanners(response.results)
    } catch (error) {
      console.error('Error fetching banners:', error)
    }
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  return (
    <div className="Container mb-6 lg:mb-8 flex flex-col lg:flex-row w-full gap-4">
      {/* Left Section: footer_1 (8/12 on large screens) */}
      {footerBanner1 ? (
        <div className="h-48 w-full lg:w-8/12 relative overflow-hidden rounded-lg shadow hover:shadow-md transition-shadow">
          <img
            src={footerBanner1.image}
            alt="Footer Banner 1"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="bg-gray-100 h-48 w-full lg:w-8/12 rounded-lg"></div>
      )}

      {/* Right Section: footer_2 (4/12 on large screens) */}
      {footerBanner2 ? (
        <div className="h-48 w-full lg:w-4/12 relative overflow-hidden rounded-lg shadow hover:shadow-md transition-shadow">
          <img
            src={footerBanner2.image}
            alt="Footer Banner 2"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="bg-gray-100 h-48 w-full lg:w-4/12 rounded-lg"></div>
      )}
    </div>
  )
}

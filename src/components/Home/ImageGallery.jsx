'use client'

import { getbanner } from '@/apis/products'
import React, { useEffect, useState } from 'react'

export default function ImageGallery() {
  const [banners, setBanners] = useState([])

  // Get home banners
  const homeBanner1 = banners.find((banner) => banner.position === 'home_1')
  const homeBanner2 = banners.find((banner) => banner.position === 'home_2')
  const homeBanner3 = banners.find((banner) => banner.position === 'home_3')

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
    <div className="Container flex flex-col lg:flex-row mb-6 lg:mb-8 lg:space-x-4 space-y-4 lg:space-y-0 w-full">
      {/* Home Banner 1 */}
      {homeBanner1 ? (
        <a
          href={homeBanner1.link || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="h-60 w-full relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow block"
        >
          <img
            src={homeBanner1.image}
            alt="Home Banner 1"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </a>
      ) : (
        <div className="bg-gray-100 h-60 w-full rounded-lg"></div>
      )}

      {/* Home Banner 2 */}
      {homeBanner2 ? (
        <a
          href={homeBanner2.link || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="h-60 w-full relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow block"
        >
          <img
            src={homeBanner2.image}
            alt="Home Banner 2"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </a>
      ) : (
        <div className="bg-gray-100 h-60 w-full rounded-lg"></div>
      )}

      {/* Home Banner 3 */}
      {homeBanner3 ? (
        <a
          href={homeBanner3.link || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="h-60 w-full relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow block"
        >
          <img
            src={homeBanner3.image}
            alt="Home Banner 3"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </a>
      ) : (
        <div className="bg-gray-100 h-60 w-full rounded-lg"></div>
      )}
    </div>
  )
}

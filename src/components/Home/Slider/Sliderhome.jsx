'use client'

import { getbanner } from '@/apis/products'
import React, { useEffect, useState } from 'react'

const Sliderhome = () => {
  const [current, setCurrent] = useState(0)
  const [banners, setBanners] = useState([])
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sliderImages = banners
    .filter((banner) => banner.position.startsWith('slider_'))
    .sort((a, b) => {
      const aNum = parseInt(a.position.split('_')[1]) || 0
      const bNum = parseInt(b.position.split('_')[1]) || 0
      return aNum - bNum
    })

  const topBanner1 = banners.find((banner) => banner.position === 'top_1')
  const topBanner2 = banners.find((banner) => banner.position === 'top_2')

  const totalSlides = sliderImages.length

  const handlePrev = () => {
    if (totalSlides <= 1) return
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const handleNext = () => {
    if (totalSlides <= 1) return
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  const fetchBanners = async () => {
    try {
      setIsLoading(true)
      const response = await getbanner()
      setBanners(response.results || [])
      setCurrent(0)
    } catch (error) {
      console.error('Error fetching banners:', error)
      setBanners([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (mounted) {
      fetchBanners()
    }
  }, [mounted])

  useEffect(() => {
    if (totalSlides > 1 && mounted && !isLoading) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [totalSlides, mounted, isLoading])

  if (!mounted) {
    return null
  }

  return (
    <div className="Container mx-auto my-6 mt-37">
      <div className="flex flex-col xl:flex-row gap-4">
        {/* Main Slider */}
        <div className="w-full xl:w-2/3 bg-gray-100 h-[400px] relative overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : totalSlides === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              No slider images available
            </div>
          ) : (
            <>
              {totalSlides > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black hover:text-white hover:bg-[var(--primary)] text-2xl z-10 h-8 w-7 rounded-full bg-white/80 flex items-center justify-center transition-colors duration-200"
                  aria-label="Previous slide"
                >
                  &#x276E;
                </button>
              )}

              <div className="relative w-full h-full">
                {sliderImages[current]?.image && (
                  <a
                    href={sliderImages[current]?.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <img
                      src={sliderImages[current].image}
                      alt={`Slider ${current + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </a>
                )}
              </div>

              {totalSlides > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:text-white hover:bg-[var(--primary)] text-2xl z-10 h-8 w-7 rounded-full bg-white/80 flex items-center justify-center transition-colors duration-200"
                  aria-label="Next slide"
                >
                  &#x276F;
                </button>
              )}

              {totalSlides > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {sliderImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (index >= 0 && index < totalSlides) {
                          setCurrent(index)
                        }
                      }}
                      className={`h-2 w-2 rounded-full transition-all duration-200 ${
                        current === index
                          ? 'bg-white w-6'
                          : 'bg-white bg-opacity-50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right-side banners */}
        <div className="flex xl:flex-col w-full xl:w-1/3 gap-4">
          {!isLoading && topBanner1?.image && (
            <a
              href={topBanner1?.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[190px] w-full relative overflow-hidden bg-gray-100 block"
            >
              <img
                src={topBanner1.image}
                alt="Top Banner 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.parentElement.style.display = 'none'
                }}
              />
            </a>
          )}

          {!isLoading && topBanner2?.image && (
            <a
              href={topBanner2?.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[190px] w-full relative overflow-hidden bg-gray-100 block"
            >
              <img
                src={topBanner2.image}
                alt="Top Banner 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.parentElement.style.display = 'none'
                }}
              />
            </a>
          )}

          {!isLoading && !topBanner1?.image && !topBanner2?.image && (
            <div className="h-[190px] w-full bg-gray-100 flex items-center justify-center text-gray-500">
              No side banners available
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sliderhome

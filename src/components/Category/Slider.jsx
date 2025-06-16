'use client'

import { getbanner } from '@/apis/products'
import React, { useState, useEffect, useCallback } from 'react'

const Sliderhome = () => {
  const [current, setCurrent] = useState(0)
  const [sliderBanners, setSliderBanners] = useState([])
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const totalSlides = sliderBanners.length

  // Handle mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  const fetchBanners = async () => {
    try {
      setIsLoading(true)
      const response = await getbanner()
      const sliderBannersData = response.results
        .filter((banner) => banner.position.startsWith('slider_'))
        .sort((a, b) => a.position.localeCompare(b.position))

      setSliderBanners(sliderBannersData)
      setCurrent(0)
    } catch (error) {
      console.error('Error fetching banners:', error)
      setSliderBanners([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (mounted) {
      fetchBanners()
    }
  }, [mounted])

  const handlePrev = useCallback(() => {
    if (totalSlides <= 1) return
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }, [totalSlides])

  const handleNext = useCallback(() => {
    if (totalSlides <= 1) return
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }, [totalSlides])

  const goToSlide = useCallback(
    (index) => {
      if (index >= 0 && index < totalSlides) {
        setCurrent(index)
      }
    },
    [totalSlides]
  )

  // Auto-rotate slides
  useEffect(() => {
    if (totalSlides > 1 && mounted && !isLoading) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [totalSlides, mounted, isLoading])

  // Don't render anything until mounted
  if (!mounted) {
    return null
  }

  return (
    <div className="hidden xl:block container mx-auto my-6">
      <div className="w-full bg-gray-100 flex items-center justify-center h-[400px] relative overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : totalSlides === 0 ? (
          <div className="text-gray-500">No banners available</div>
        ) : (
          <>
            {/* Background Image */}
            {sliderBanners[current]?.image && (
              <img
                src={sliderBanners[current].image}
                alt={`Slider ${current + 1}`}
                className="absolute w-full h-full object-cover"
              />
            )}

            {/* Navigation Arrows */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 text-white hover:bg-[var(--primary)] text-2xl z-10 h-10 w-10 rounded-full flex items-center justify-center bg-black bg-opacity-30 transition-colors duration-200"
                  aria-label="Previous slide"
                >
                  &#x276E;
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 text-white hover:bg-[var(--primary)] text-2xl z-10 h-10 w-10 rounded-full flex items-center justify-center bg-black bg-opacity-30 transition-colors duration-200"
                  aria-label="Next slide"
                >
                  &#x276F;
                </button>
              </>
            )}

            {/* Slide Indicators */}
            {totalSlides > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {sliderBanners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
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
    </div>
  )
}

export default Sliderhome

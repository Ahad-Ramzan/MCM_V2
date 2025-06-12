'use client'

import { getbanner } from '@/apis/products'
import React, { useEffect, useState } from 'react'

const slides = [
  {
    title: 'LOREM IPSUM',
    subtitle: 'DOLOR SIT AMET',
    description: 'CONSECTETUR',
    buttonText: 'Saiba Mais',
  },
  {
    title: 'SEGUNDO SLIDE',
    subtitle: 'NOVO CONTEÚDO',
    description: 'MAIS DETALHES',
    buttonText: 'Explorar',
  },
  {
    title: 'ÚLTIMO SLIDE',
    subtitle: 'INFORMAÇÃO FINAL',
    description: 'DESCUBRA MAIS',
    buttonText: 'Começar',
  },
]

const Sliderhome = () => {
  const [current, setCurrent] = useState(0)
  const [banners, setBanners] = useState([])

  // Filter and sort slider images from banners
  const sliderImages = banners
    .filter((banner) => banner.position.startsWith('slider_'))
    .sort((a, b) => {
      const aNum = parseInt(a.position.split('_')[1])
      const bNum = parseInt(b.position.split('_')[1])
      return aNum - bNum
    })

  // Get top banners
  const topBanner1 = banners.find((banner) => banner.position === 'top_1')
  const topBanner2 = banners.find((banner) => banner.position === 'top_2')

  const totalSlides = Math.max(sliderImages.length, slides.length)

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

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
    <div className="Container mx-auto my-6 mt-37">
      <div className="flex flex-col xl:flex-row gap-4">
        {/* Main Slider */}
        <div className="w-full xl:w-2/3 bg-gray-100 h-[400px] relative overflow-hidden">
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black hover:text-white hover:bg-[var(--primary)] text-2xl z-10 h-8 w-7 rounded-full bg-white/80 flex items-center justify-center"
          >
            &#x276E;
          </button>

          {/* Slide Content */}
          {sliderImages.length > 0 && (
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src={sliderImages[current]?.image}
                alt={`Slider ${current + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-left pl-[13%] bg-black/20">
                <div className="text-center text-white max-w-md">
                  <h2 className="text-3xl font-bold leading-tight mb-4">
                    {slides[current]?.title} <br />
                    {slides[current]?.subtitle} <br />
                    {slides[current]?.description}
                  </h2>
                  <button className="bg-[var(--secondary)] text-white py-2 px-6 rounded cursor-pointer hover:bg-[var(--primary)] transition-colors">
                    {slides[current]?.buttonText}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:text-white hover:bg-[var(--primary)] text-2xl z-10 h-8 w-7 rounded-full bg-white/80 flex items-center justify-center"
          >
            &#x276F;
          </button>
        </div>

        {/* Right-side banners */}
        <div className="flex xl:flex-col w-full xl:w-1/3 gap-4">
          {/* Top 1 Banner */}
          {topBanner1 && (
            <div className="h-[190px] w-full relative overflow-hidden">
              <img
                src={topBanner1.image}
                alt="Top Banner 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Top 2 Banner */}
          {topBanner2 && (
            <div className="h-[190px] w-full relative overflow-hidden">
              <img
                src={topBanner2.image}
                alt="Top Banner 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sliderhome

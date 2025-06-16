'use client'

import { getbanner } from '@/apis/products'
import React, { useState, useEffect } from 'react'

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
  const [sliderBanners, setSliderBanners] = useState([])

  const fetchBanners = async () => {
    try {
      const response = await getbanner()
      // Filter and sort slider banners
      const sliderBannersData = response.results
        .filter((banner) => banner.position.startsWith('slider_'))
        .sort((a, b) => a.position.localeCompare(b.position))

      setSliderBanners(sliderBannersData)
    } catch (error) {
      console.error('Error fetching banners:', error)
    }
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  const totalSlides = Math.max(slides.length, sliderBanners.length)

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  return (
    <div className="hidden xl:block container mx-auto my-6">
      <div className="w-full bg-gray-100 flex items-center justify-center h-[400px] relative overflow-hidden">
        {/* Background Image */}
        {sliderBanners[current]?.image && (
          <img
            src={sliderBanners[current].image}
            alt={`Slider ${current + 1}`}
            className="absolute w-full h-full object-cover"
          />
        )}

        {/* Semi-transparent overlay */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}

        {/* Left arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 text-white hover:bg-[var(--primary)] text-2xl z-10 h-8 w-7 rounded"
        >
          &#x276E;
        </button>

        {/* Slide Content - Centered text */}
        <div className="text-center relative z-10 text-white px-4">
          <h2 className="text-4xl font-bold leading-tight mb-4">
            {slides[current]?.title || ''} <br />
            {slides[current]?.subtitle || ''} <br />
            {slides[current]?.description || ''}
          </h2>
          <button className="bg-[var(--secondary)] text-white py-2 px-6 rounded cursor-pointer hover:bg-opacity-90 text-lg">
            {slides[current]?.buttonText || 'Learn More'}
          </button>
        </div>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 text-white hover:bg-[var(--primary)] text-2xl z-10 h-8 w-7 rounded"
        >
          &#x276F;
        </button>
      </div>
    </div>
  )
}

export default Sliderhome

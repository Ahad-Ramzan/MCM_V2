"use client";

import React, { useState } from "react";

const slides = [
  {
    title: "LOREM IPSUM",
    subtitle: "DOLOR SIT AMET",
    description: "CONSECTETUR",
    buttonText: "Saiba Mais",
  },
  {
    title: "SEGUNDO SLIDE",
    subtitle: "NOVO CONTEÚDO",
    description: "MAIS DETALHES",
    buttonText: "Explorar",
  },
  {
    title: "ÚLTIMO SLIDE",
    subtitle: "INFORMAÇÃO FINAL",
    description: "DESCUBRA MAIS",
    buttonText: "Começar",
  },
];

const Sliderhome = () => {
  const [current, setCurrent] = useState(0);
  const totalSlides = slides.length;

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="Container mx-auto my-6">
      <div className="flex flex-col xl:flex-row gap-4">
        {/* Slider */}
        <div className="w-full xl:w-2/3 bg-gray-100 flex items-center justify-left pl-[13%] h-[400px] relative overflow-hidden">
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 text-black hover:text-white hover:bg-[var(--primary)] text-2xl z-10 h-8 w-7 "
          >
            &#x276E;
          </button>

          {/* Slide Content */}
          <div className="text-center transition-all duration-300">
            <h2 className="text-xl font-bold leading-tight mb-4">
              {slides[current].title} <br />
              {slides[current].subtitle} <br />
              {slides[current].description}
            </h2>
            <button className="bg-[var(--secondary)] text-white py-2 px-4 rounded cursor-pointer">
              {slides[current].buttonText}
            </button>
          </div>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 text-black  hover:text-white hover:bg-[var(--primary)] text-2xl z-10 h-8 w-7"
          >
            &#x276F;
          </button>
        </div>

        {/* Right-side blocks */}
        <div className="flex xl:flex-col w-full xl:w-1/3 gap-4">
          <div className="bg-[var(--lightGray)] h-[190px] w-full" />
          <div className="bg-[var(--lightGray)] h-[190px] w-full" />
        </div>
      </div>
    </div>
  );
};

export default Sliderhome;

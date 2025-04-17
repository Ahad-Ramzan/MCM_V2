"use client";

import React, { useRef, useEffect, useState } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import ProductCardStar from "@/ui/ProductCardStar";

const products = Array(12).fill({
  image: "/placeholder.png",
  brand: "Marca Produto",
  price: "10,99€",
  title: "Placas de Gesso",
  rating: 4,
  sold: 73,
  soldRatio: 0.4,
});

const FlooringCoatingSection = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }
  };

  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    if (container) {
      const itemWidth = container.children[0].offsetWidth + 16; // card width + gap
      container.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      });
    }
  };

  // Update active dot on scroll
  useEffect(() => {
    const container = scrollRef.current;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.children[0].offsetWidth + 16;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamically calculate how many cards fit in viewport
  useEffect(() => {
    const container = scrollRef.current;

    const updateVisibleCount = () => {
      if (container && container.children.length > 0) {
        const containerWidth = container.offsetWidth;
        const cardWidth = container.children[0].offsetWidth + 16; // 16px gap
        setVisibleCount(Math.floor(containerWidth / cardWidth));
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  return (
    <div className="Container px-4 py-6 my-8">
      {/* Menu Bar  */}
      <div className="w-full flex justify-between flex-wrap bg-gray-100 p-4 my-12">
        <h2 className="text-lg sm:text-xl font-normal">
          Pavimentos e Revestimentos
        </h2>
        <div className="flex flex-wrap text-nowrap gap-4 items-center text-sm text-[var(--darkGray4)]">
          <Link href="#" className>
            Novos
          </Link>
          <Link href="#" className>
            Mais Vendidos
          </Link>
          <Link href="#" className>
            Populares
          </Link>
          <Link href="#" className>
            Ver todos
          </Link>
        </div>
      </div>

      {/* Scrollable Product List */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll(-300)}
          className="absolute -left-2 top-[35%] z-10  p-2 hidden sm:flex items-center justify-center text-black hover:text-white hover:bg-[var(--primary)] text-2xl h-8 w-7 cursor-pointer"
        >
          <FaChevronLeft size={14} />
        </button>

        {/* Product Scroll Row */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth scroll-pl-4 scroll-pr-4 snap-x snap-mandatory no-scrollbar px-8"
        >
          {products.map((product, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0 w-[200px] sm:w-[220px] md:w-[240px]"
            >
              <ProductCardStar {...product} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll(300)}
          className="absolute right-0 top-[35%] z-10 p-2 hidden sm:flex items-center justify-center text-black hover:text-white hover:bg-[var(--primary)] text-2xl h-8 w-7 cursor-pointer"
        >
          <FaChevronRight size={14} />
        </button>
      </div>

      {/* Dots for small screens */}
      <div className="flex justify-center items-center gap-2 mt-4 lg:hidden ">
        {Array.from({ length: Math.ceil(products.length / visibleCount) }).map(
          (_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx * visibleCount)}
              className={`h-2 w-2 cursor-pointer rounded-full transition-all duration-300 ${
                Math.floor(activeIndex / visibleCount) === idx
                  ? "bg-[var(--primary)] scale-125"
                  : "bg-gray-300"
              }`}
            ></button>
          )
        )}
      </div>
    </div>
  );
};

export default FlooringCoatingSection;

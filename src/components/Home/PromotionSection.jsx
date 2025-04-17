"use client";

import React, { useRef, useEffect, useState } from "react";
import CountdownTimer from "@/ui/CountdownTimer";
import ProductCard from "@/ui/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const products = Array(12).fill({
  image: "/placeholder.png",
  brand: "Marca Produto",
  price: "10,99€",
  title: "Placas de Gesso",
  rating: 4,
  sold: 73,
  soldRatio: 0.4,
});

const PromotionSection = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0); // Start at 0 to delay dot rendering

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
    if (!container) return;

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
        const count = Math.floor(containerWidth / cardWidth);
        setVisibleCount(count);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  return (
    <div className="Container mx-auto  py-6 my-8">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
        <div className="flex items-center flex-wrap  gap-3">
          <h2 className="text-xl font-semibold">Promoções</h2>
          <CountdownTimer targetDate="2025-04-15T23:59:59" />
        </div>
        <button className="text-sm underline text-gray-500 hover:text-gray-700">
          Ver todos
        </button>
      </div>

      {/* Scrollable Product List */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll(-300)}
          className="absolute -left-2 top-[35%] z-10 p-2 hidden sm:flex items-center justify-center text-black hover:text-white hover:bg-[var(--primary)] text-2xl h-8 w-7 cursor-pointer"
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
              <ProductCard {...product} />
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
      {visibleCount > 0 && (
        <div className="flex justify-center items-center gap-2 mt-4 lg:hidden">
          {Array.from({
            length: Math.ceil(products.length / visibleCount),
          }).map((_, idx) => {
            const isActive = Math.floor(activeIndex / visibleCount) === idx;
            return (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx * visibleCount)}
                className={`h-2 w-2 cursor-pointer rounded-full transition-all duration-300 ${
                  isActive ? "bg-[var(--primary)] scale-125" : "bg-gray-300"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PromotionSection;

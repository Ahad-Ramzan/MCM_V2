"use client";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCardStar from "@/ui/ProductCardStar";

const productData = [
  {
    title: "Produto 1",
  },
  {
    title: "Produto 2",
  },
  {
    title: "Produto 3",
  },
  {
    title: "Produto 4",
  },
  {
    title: "Produto 5",
  },
  {
    title: "Produto 6",
  },
  {
    title: "Produto 7",
  },
];

const BestSale = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + itemsPerPage < productData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const visibleProducts = productData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="hidden xl:block w-full ml-4 py-5">
      {/* Header */}
      <div className=" flex justify-between items-center border-b border-[var(--lightGray4)] mb-4">
        <h1 className="text-lg text-[var(--darkGray4)] font-semibold">
          Mais Vendidos
        </h1>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className=" p-2 rounded-full disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= productData.length}
            className=" p-2 rounded-full disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-5 gap-4">
        {visibleProducts.map((product, index) => (
          <ProductCardStar key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default BestSale;

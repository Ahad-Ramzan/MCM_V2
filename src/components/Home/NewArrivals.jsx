"use client";
import Link from "next/link";
import React from "react";
import ProductCardStarHorizontal from "@/ui/ProductCardStarHorizontal";

const NewArrivals = () => {
  return (
    <div className="Container py-6 my-8">
      {/* Menu Bar  */}
      <div className="w-full flex justify-between bg-gray-100 p-4 my-12">
        <h2 className="text-xl font-normal">Novas Chegadas</h2>
        <div className="flex gap-4 items-center text-sm text-[var(--darkGray4)]">
          <Link href="#" className>
            Ver todos
          </Link>
        </div>
      </div>
      {/* New arrivals Map */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((product) => (
          <ProductCardStarHorizontal key={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;

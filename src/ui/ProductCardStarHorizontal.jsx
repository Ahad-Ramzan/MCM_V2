"use client";
import React from "react";
import StarRating from "@/ui/StarRating";

const ProductCardStarHorizontal = ({
  title = "Placas de Gesso",
  price = "10,99€",
  rating = 4,
}) => {
  return (
    <div className="ml-5 border-[var(--lightGray4)] w-[160px] sm:w-[180px] flex gap-3">
      {/* Product Image */}
      <div className="aspect-square w-full bg-gray-100">
        {/* <Image src={image} alt={title} fill className="object-cover rounded" /> */}
      </div>

      <div className="flex flex-col gap-2">
        {/* Title */}
        <h3 className="text-[13px] font-semibold text-[var(--primary)] leading-snug whitespace-nowrap">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-[2px]">
          <StarRating rating={rating} />
        </div>

        {/* Price */}
        <div className="mt-[2px] font-semibold text-[13px] text-gray-900">
          {price}
        </div>
      </div>
    </div>
  );
};

export default ProductCardStarHorizontal;

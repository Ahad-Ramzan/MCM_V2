import React from "react";
import Image from "next/image";
import StarRating from "./StarRating";

const ProductCard = ({
  image = "/placeholder.png",
  brand = "MARCA PRODUTO",
  price = "10,99€",
  title = "Placas de Gesso",
  rating = 4,
  sold = 73,
  soldRatio = 0.5, // ratio between 0 and 1
}) => {
  return (
    <div className="w-[200px] text-sm">
      {/* Image */}
      <div className="bg-gray-100 w-full h-[150px] mb-3 flex items-center justify-center">
        {/* <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="object-contain"
        /> */}
      </div>

      {/* Brand */}
      <p className="uppercase text-xs text-gray-400 border-b pb-1">{brand}</p>

      {/* Price */}
      <p className="text-[var(--secondary)] font-bold text-lg mt-2">{price}</p>

      {/* Title */}
      <p className="text-sm font-medium text-[var(--primary)]">{title}</p>

      {/* Stars */}
      <div className="flex items-center gap-1 mt-1">
        <StarRating rating={rating} />
        <span className="text-[var(--lightGray6)] text-xs">({rating})</span>
      </div>

      {/* Progress bar */}
      <div className="mt-2 w-full h-2 bg-gray-200 ">
        <div
          className="bg-[var(--secondary)] h-full "
          style={{ width: `${soldRatio * 100}%` }}
        />
      </div>

      {/* Sold */}
      <p className="text-xs text-gray-500 mt-1">Vendidos: {sold}</p>
    </div>
  );
};

export default ProductCard;

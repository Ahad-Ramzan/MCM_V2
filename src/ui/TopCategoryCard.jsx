"use client";
import React from "react";

const CategoryCard = ({ title }) => {
  const hasValidImage = typeof image === "string" && image.trim() !== "";

  return (
    <div className="w-[160px] h-52 border border-[var(--lightGray4)] overflow-hidden flex flex-col justify-between hover:shadow-md transition">
      {hasValidImage ? (
        <img src={image} alt={title} className="h-full w-full object-cover" />
      ) : (
        <div className="flex-1" />
      )}
      <div className="p-2 pb-10 text-center text-sm font-medium bg-white">
        {title}
      </div>
    </div>
  );
};

export default CategoryCard;

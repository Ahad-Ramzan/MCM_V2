'use client'
import React from "react";

const CategoryCard = ({
  title = "Category",
  items = ["Item 1", "Item 2", "Item 3"],
}) => {
  return (
    <div className="border border-[var(--lightGray4)] flex gap-3 p-3 w-full items-start max-w-md">
      {/* Square Gray Placeholder */}
      <div className="bg-gray-100 aspect-square w-[50%] h-full rounded" />

      {/* Title & Items */}
      <div className="">
        <h3 className="font-semibold mb-2 text-sm text-gray-900">{title}</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          {items.map((item, index) => (
            <li key={index} className="leading-tight">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryCard;

// components/TopCategories.jsx
"use client";
import React from "react";
import CategoryCard from "@/ui/TopCategoryCard";

const categories = [
  {
    title: "Madeiras",
  },
  {
    title: "Construção",
  },
  {
    title: "Ferragens",
  },
  {
    title: "Ferramentas",
  },
  {
    title: "Pavimentos",
  },
  {
    title: "Revestimentos",
  },
  {
    title: "Acrílicos",
  },
  {
    title: "Cimentos",
  },
];

const TopCategories = () => {
  return (
    <div className="Container my-10 ">
      <h2 className="text-lg font-semibold mb-4">Top Categorias</h2>
      <div className="flex gap-4 flex-wrap">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
    </div>
  );
};

export default TopCategories;

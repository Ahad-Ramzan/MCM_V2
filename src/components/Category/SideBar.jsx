"use client";
import React, { useState } from "react";

const categories = [
  "Madeiras",
  "Acrílicos",
  "Construção",
  "Ferragens",
  "Ferramentas",
  "Pavimentos",
  "Revestimentos",
  "Cimentos",
  "Isolamentos",
];

const brands = [
  "Marca 1",
  "Marca 2",
  "Marca 3",
  "Marca 4",
  "Marca 5",
  "Marca 6",
  "Marca 7",
  "Marca 8",
  "Marca 9",
  "Marca 10",
];

const SidebarFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [price, setPrice] = useState([0, 2000]);

  const handlePriceChange = (index, value) => {
    const newPrice = [...price];
    newPrice[index] = Number(value);
    setPrice(newPrice);
  };

  return (
    <div className="hidden  max-w-[250px] xl:flex xl:flex-col gap-6 p-2">
      {/* Categories */}
      <div className="bg-gray-100 p-4">
        <h3 className="font-semibold mb-6 text-md uppercase">Categorias</h3>
        <ul className="space-y-2 text-sm text-[var(--darkGray4)]">
          {categories.map((cat, i) => (
            <li
              key={i}
              className={`cursor-pointer hover:underline ${
                selectedCategory === cat ? "font-bold text-black" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Brands */}
      <div className="bg-gray-100 p-4">
        <h3 className="font-semibold mb-3 text-md uppercase">Marcas</h3>
        <ul className="space-y-2 text-sm text-[var(--darkGray4)]">
          {brands.map((brand, i) => (
            <li
              key={i}
              className={`cursor-pointer hover:underline ${
                selectedBrand === brand ? "font-bold text-black" : ""
              }`}
              onClick={() => setSelectedBrand(brand)}
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="bg-gray-100 p-4">
        <h3 className="font-semibold mb-4 text-md uppercase">Preço</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between ">
            <input
              type="range"
              min="0"
              max="2000"
              value={price[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              className="w-full accent-[var(--secondary)]"
            />
            <input
              type="range"
              min="0"
              max="2000"
              value={price[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="w-full accent-red-500"
            />
          </div>
          <p className="text-xs text-gray-700 text-center">
            Preço: {price[0]}€ - {price[1]}€
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;

"use client";
import React, { useState } from "react";
import ProductCardStar from "@/ui/ProductCardStar";
import { FaTh, FaBars } from "react-icons/fa";

const productData = Array.from({ length: 81 }, (_, i) => ({
  title: `Produto ${i + 1}`,
  brand: "Marca X",
  price: `${(Math.random() * 100).toFixed(2).replace(".", ",")}€`,
  rating: Math.floor(Math.random() * 5) + 1,
  sold: Math.floor(Math.random() * 100),
  discount: i % 3 === 0 ? 20 : undefined,
}));

const itemsPerPage = 15;

const ProductListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(productData.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const visibleProducts = productData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full  lg:px-4 py-6 bg-white">
      {/* Top bar */}
      <div className="flex flex-wrap w-full justify-between items-center border border-gray-100 p-3 bg-gray-50 mb-6">
        <p className="text-sm text-gray-700">
          <strong>{productData.length}</strong> Produtos encontrados
        </p>

        <div className="flex gap-4 flex-wrap items-center justify-between">
          {/* Ordenar por */}
          <select className="text-sm border border-gray-300 rounded px-2 py-1 mt-2">
            <option>Ordenar por</option>
            <option>Preço: menor para maior</option>
            <option>Preço: maior para menor</option>
          </select>

          {/* Mostrar view type */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>Mostrar</span>
            <FaTh className="cursor-pointer text-gray-500 hover:text-black" />
            <FaBars className="cursor-pointer text-gray-500 hover:text-black" />
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {visibleProducts.map((product, index) => (
          <ProductCardStar key={index} {...product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm  disabled:opacity-50"
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 text-sm  ${
              currentPage === i + 1
                ? " text-black"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm  disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ProductListPage;

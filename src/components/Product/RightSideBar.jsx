'use client'
import ProductCardStar from "@/ui/ProductCardStar";
import React from "react";
import { ProductInfoTabs } from "./product-info-tabs";
import ProductDetails from "./ProductDetails";

const RightSideBar = () => {
  return (
    <aside className="hidden xl:block w-full lg:w-[280px] p-4  bg-white space-y-6">
      {/* Features List */}
      <div className="space-y-4 bg-gray-50 p-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          🌐 Envíos Rápidos
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          💸 Reembolsos até 7 dias
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          💰 Grandes Poupanças
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          💳 Pagamento Seguro
        </div>
      </div>

      {/* Placeholder Banner */}
      <div className="bg-gray-100 aspect-square p-4 w-full rounded" />

      {/* Brand Section */}
      <div className="border border-[var(--lightGray4)] ">
        <div className="bg-gray-100   w-full h-9 rounded flex items-center ">
          <h3 className="text-sm font-semibold pl-4">Marca 1</h3>
        </div>

        {/* Product Card */}
        <div className="p-4">
          <ProductCardStar />
          <ProductCardStar />
          <ProductCardStar />
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;

"use client";
import Breadcrumb from "@/components/Breadcrumb";
import { ProductInfoTabs } from "@/components/Product/product-info-tabs";
import ProductDetails from "@/components/Product/ProductDetails";
import RightSideBar from "@/components/Product/RightSideBar";
import React from "react";

export default function Product() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categorea", href: "/" },
          { label: "Placa de Gesso" }, // No href means current page
        ]}
      />

      <div className="Container flex  flex-col lg:flex-row w-full">
        {/* Main Content Area */}
        <div className="flex-1 p-4">
          {/* Your product list, filter, header etc. goes here */}
          <ProductDetails />
          <ProductInfoTabs />
        </div>
        <RightSideBar />
      </div>
      <div className="Container mx-auto">
        <h2 className="text-2xl font-semibold pb-4 border-b border-[var(--lightGray4)]">
          Produtos Semelhantes
        </h2>
        <p className="text-[var(--darkGray4)] my-6">Produto nao encontrado</p>
      </div>
    </div>
  );
}

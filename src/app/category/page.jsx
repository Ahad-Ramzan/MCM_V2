"use client";
import Breadcrumb from "@/components/Breadcrumb";
import BrandsLogoBar from "@/components/Category/BrandsLogoBar";
import SliderCategory from "@/components/Category/Slider";
import Categories from "@/components/Category/Categories";
import React from "react";
import SidebarFilter from "@/components/Category/SideBar";
import BestSale from "@/components/Category/BestSale";

import ProductListPage from "@/components/Category/ProductList";
import Recomended from "@/components/Category/Recomended";

export default function Category() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Categoria" }]}
      />
      <div className="Container ">
        <SliderCategory />

        <BrandsLogoBar />
        <Categories />
        <div className="flex ">
          <SidebarFilter />
          <div className="flex-1 px-4 py-6 bg-white">
            <BestSale />
            <Recomended />
            <ProductListPage />
          </div>
        </div>
      </div>
    </>
  );
}

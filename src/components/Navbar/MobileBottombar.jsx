"use client";
import React, { useState } from "react";
import { FaBars, FaThList, FaSearch, FaShoppingCart } from "react-icons/fa";
import MobileDrawer from "./mobile/MobileDrawer";

const MobileBottombar = () => {
  const [drawerType, setDrawerType] = useState(null);

  const handleOpen = (type) => {
    setDrawerType(type);
  };

  const handleClose = () => {
    setDrawerType(null);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 xl:hidden">
        <div className="flex justify-center gap-4 sm:gap-10 items-center py-2">
          <button
            onClick={() => handleOpen("menu")}
            className="flex flex-col items-center text-md text-gray-600"
          >
            <FaBars className="text-xl mb-1" />
            Menu
          </button>
          <button
            onClick={() => handleOpen("categories")}
            className="flex flex-col items-center text-md text-gray-600"
          >
            <FaThList className="text-xl mb-1" />
            Categorias
          </button>
          <button
            onClick={() => handleOpen("search")}
            className="flex flex-col items-center text-md text-gray-600"
          >
            <FaSearch className="text-xl mb-1" />
            Pesquisa
          </button>
          <button
            onClick={() => handleOpen("cart")}
            className="flex flex-col items-center text-md text-gray-600"
          >
            <FaShoppingCart className="text-xl mb-1" />
            Carrinho
          </button>
        </div>
      </div>

      <MobileDrawer
        isOpen={!!drawerType}
        onClose={handleClose}
        drawerType={drawerType}
      />
    </>
  );
};

export default MobileBottombar;

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const drawerVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

const drawerTitles = {
  menu: "Menu",
  categories: "Categorias",
  search: "Pesquisa",
  cart: "Carrinho",
};

const MobileDrawer = ({ isOpen, onClose, drawerType }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 right-0 bottom-0 w-full sm:w-1/2 md:w-1/2  bg-gray-50 shadow-lg z-50 "
          variants={drawerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl text-black cursor-pointer"
          >
            ✕
          </button>

          {/* Header with bg-red */}
          <div className="bg-[var(--primary)] text-white text-lg font-semibold p-4 flex items-center justify-center">
            {drawerTitles[drawerType] || "Menu"}
          </div>

          {/* Content area */}
          <div className="py-4 Container">
            {drawerType === "menu" && (
              <ul className="space-y-2">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/">Serviços</Link>
                </li>
                <li>
                  <Link href="/">Contactos</Link>
                </li>
              </ul>
            )}

            {drawerType === "categories" && (
              <ul className="space-y-2">
                <li>
                  <Link href="/category">Categorias</Link>
                </li>
              </ul>
            )}

            {drawerType === "search" && (
              <div className="flex items-center bg-[var(--White)] ">
                <input
                  type="text"
                  placeholder="Estou à procura de..."
                  className="h-10  flex-1 px-2 sm:px-4  text-black outline-none"

                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="h-10 px-4 bg-[var(--secondary)] hover:bg-[var(--secondary2)] text-[var(--White)] font-semibold  cursor-pointer">
                  Pesquisar
                </button>
              </div>
            )}

            {drawerType === "cart" && (
              <div>
                <p>O seu carrinho está vazio.</p>
                <button className="bg-[var(--secondary)] hover:bg-[var(--secondary2)] text-[var(--White)] py-2  absolute bottom-4 w-full">
                  Shop Now
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;

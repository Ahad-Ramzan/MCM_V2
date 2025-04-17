"use client";
import React from "react";
import StarRating from "@/ui/StarRating"; // make sure this component exists
import { FaRegHeart, FaChartBar } from "react-icons/fa";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedinIn,
} from "react-icons/fa";

const ProductDetails = ({
  title = "Placa de Gesso",
  brand = "Marca 1",
  price = "21,99€",
  rating = 4,
  reviews = 1,
  features = [
    "Placa de gesso cartonado standard de tipo A",
    "Composta por um núcleo de gesso não combustível",
    "Integralmente envolvido em revestimento de papel na co marfim",
    "Está preparada para uma grande variedade de tratamentos e acabamentos",
    "Pode ser usada em aplicações que requerem fixação mecânica direta",
  ],
  sku = "SF1133569600-1",
  tags = ["placas", "gesso"],
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Image Gallery */}
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="bg-gray-100 w-12 h-12 rounded" />
          ))}
        </div>
        <div className="bg-gray-100 rounded w-[400px] h-auto sm:h-[400px]" />
      </div>

      {/* Right: Product Info */}
      <div className="flex-1">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="text-sm text-gray-500 mt-1 border-b border-[var(--lightGray4)] pb-2">
          Marca: <span className="text-blue-600">{brand}</span> |{" "}
          <span className="inline-flex items-center gap-1">
            <StarRating rating={rating} /> ({reviews} Avaliação
            {reviews > 1 && "s"})
          </span>
        </div>

        <div className="text-2xl font-bold text-black mt-4 mb-8">{price}</div>

        {/* Features */}
        <ul className="text-sm text-[var(--lightGray8)] mt-4 space-y-3 border-b border-[var(--lightGray4)] pb-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className=" font-bold">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Quantity & Buttons */}

        <div className="mt-6 flex flex-wrap gap-4 border-b border-[var(--lightGray4)] pb-4">
          {/* Quantity Selector */}
          <div className="flex flex-col">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantidade
            </label>
            <div className="flex items-center border border-[var(--lightGray4)] overflow-hidden">
              <button className="px-3 py-1 text-lg">−</button>
              <input
                type="text"
                value="1"
                className="w-10 text-center outline-none"
                readOnly
              />
              <button className="px-3 py-1 text-lg">+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap mt-3">
            <button className="bg-[var(--primary)] text-white px-6 py-2 rounded font-medium">
              Adicionar
            </button>
            <button className="bg-[var(--secondary)] text-white px-6 py-2 rounded font-medium">
              Comprar Agora
            </button>

            {/* React Icon Buttons */}
            <button className="text-[var(--darkGray)] text-xl">
              <FaRegHeart />
            </button>
            <button className="text-gray-500 text-xl">
              <FaChartBar />
            </button>
          </div>
        </div>

        {/* Meta Info */}
        <div className="text-sm text-gray-600 mt-6 space-y-2">
          <p>
            <span className="font-semibold text-black">Reportar</span>
          </p>
          <p>
            <span className="font-semibold">SKU:</span> {sku}
          </p>
          <p>
            <span className="font-semibold">Categorias:</span>
          </p>
          <p>
            <span className="font-semibold">Tags:</span>{" "}
            {tags.map((tag, i) => (
              <span key={i} className="mr-1">
                {tag}
              </span>
            ))}
          </p>
        </div>

        {/* Social Share */}
        <div className="flex gap-3 mt-4">
          <a className="bg-blue-600 text-white p-2 rounded">
            <FaFacebookF size={16} />
          </a>
          <a className="bg-sky-400 text-white p-2 rounded">
            <FaTwitter size={16} />
          </a>
          <a className="bg-red-600 text-white p-2 rounded">
            <FaGooglePlusG size={16} />
          </a>
          <a className="bg-blue-700 text-white p-2 rounded">
            <FaLinkedinIn size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

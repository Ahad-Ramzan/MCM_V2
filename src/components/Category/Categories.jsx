"use client";
import React from "react";
import CategoryCard from "@/ui/CategoryCard";

const categories = [
  {
    title: "Madeiras",
    items: [
      "Painéis e Placas",
      "Ripas e Molduras",
      "Sub-pavimentos",
      "Cancelas e Escadas",
    ],
  },
  {
    title: "Ferragens",
    items: ["Fechaduras", "Puxadores", "Poleias", "Chapas"],
  },
  {
    title: "Cimentos",
    items: [
      "Cimento e Cal Hidráulica",
      "Betão seco pré-doseado",
      "Cimento Cola",
      "Outros",
    ],
  },
  {
    title: "Revestimentos",
    items: ["Cerâmicos", "Vinílicos", "Laminados", "PVC e Madeira"],
  },
  {
    title: "Isolamento",
    items: [
      "Placas de Gesso",
      "Espumas Acústicas",
      "Cortiça",
      "Impermeabilização",
    ],
  },
  {
    title: "Drogaria",
    items: [
      "Massa de Recuperação",
      "Silicones e Espumas PU",
      "Colas",
      "Diluentes, Ácidos e Outros",
    ],
  },
  {
    title: "Coberturas",
    items: ["Telhas Cerâmicas", "Coberturas e Acessórios"],
  },
  {
    title: "Fixação",
    items: ["Buchas Metálicas", "Buchas Nylon", "Parafusos", "Pregos e Outros"],
  },
];

const CategoryGrid = () => {
  return (
    <div className="hidden xl:block container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            items={category.items}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;

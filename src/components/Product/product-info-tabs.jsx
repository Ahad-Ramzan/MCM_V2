"use client";

import { useState } from "react";

export function ProductInfoTabs() {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Descrição" },
    { id: "details", label: "Detalhes" },
    { id: "reviews", label: "Avaliações (1)" },
    { id: "faq", label: "Perguntas Frequentes" },
  ];

  const tabContent = {
    description: (
      <div className="py-4">
        <p className="mb-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
        <p className="mb-4 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <div className="w-full h-64 my-4 bg-gray-100"></div>
        <p className="mb-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
        <p className="mb-4 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <ul>
          <li className="flex items-start gap-2">
            <span className=" font-bold">•</span>
            <span>Lorem ipsum</span>
          </li>
          <li className="flex items-start gap-2">
            <span className=" font-bold">•</span>
            <span>Lorem ipsum</span>
          </li>
          <li className="flex items-start gap-2">
            <span className=" font-bold">•</span>
            <span>Lorem ipsum</span>
          </li>
        </ul>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
    ),
    details: (
      <div className="py-4">
        <h3 className="font-medium mb-2">Especificações do Produto</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>Material: Algodão Premium</li>
          <li>Dimensões: 30 x 40 cm</li>
          <li>Peso: 250g</li>
          <li>Cor: Disponível em múltiplas opções</li>
          <li>Garantia: 12 meses</li>
        </ul>
      </div>
    ),
    reviews: (
      <div className="py-4">
        <div className="border-b pb-4 mb-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <span className="font-medium text-gray-600">JD</span>
            </div>
            <div>
              <p className="font-medium">João da Silva</p>
              <div className="flex text-yellow-400">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span className="text-gray-300">★</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            Produto excelente! Superou minhas expectativas em qualidade e
            durabilidade. Recomendo fortemente.
          </p>
        </div>
        <button className="text-blue-600 font-medium">
          Escrever uma avaliação
        </button>
      </div>
    ),
    faq: (
      <div className="py-4 space-y-4">
        <div>
          <h3 className="font-medium mb-1">Qual é o prazo de entrega?</h3>
          <p className="text-gray-600">
            O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua
            localização.
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-1">Como posso rastrear meu pedido?</h3>
          <p className="text-gray-600">
            Após a confirmação do envio, você receberá um e-mail com o código de
            rastreamento.
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-1">Qual é a política de devolução?</h3>
          <p className="text-gray-600">
            Aceitamos devoluções em até 30 dias após a compra, desde que o
            produto esteja em perfeitas condições.
          </p>
        </div>
      </div>
    ),
  };

  return (
    <div className="  p-4">
      <div className="border-b border-[var(--lightGray4)] mb-4">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {tabContent[activeTab]}
    </div>
  );
}

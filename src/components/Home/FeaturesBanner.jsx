"use client";
import React from "react";
import {
  FaRocket,
  FaSyncAlt,
  FaCreditCard,
  FaHeadset,
  FaGift,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRocket className="text-[var(--primary)] text-4xl" />,
    title: "Portes Grátis",
    subtitle: "Em encomendas superiores a 99€",
  },
  {
    icon: <FaSyncAlt className="text-[var(--primary)] text-4xl" />,
    title: "Reembolso",
    subtitle: "Até 14 dias",
  },
  {
    icon: <FaCreditCard className="text-[var(--primary)] text-4xl" />,
    title: "Pagamentos",
    subtitle: "100% Seguro",
  },
  {
    icon: <FaHeadset className="text-[var(--primary)] text-4xl" />,
    title: "Suporte 24x7",
    subtitle: "Suporte dedicado",
  },
  {
    icon: <FaGift className="text-[var(--primary)] text-4xl" />,
    title: "Grandes Poupanças",
    subtitle: "Os melhores preços",
  },
];

const FeatureBar = () => {
  return (
    <div className="Container mx-auto border border-[var(--lightGray4)] p-4 md:p-6 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`xl:flex-row flex flex-col items-center lg:items-start text-center lg:text-left gap-3 
              ${index !== 0 ? "lg:border-l lg:border-gray-300" : ""} lg:pl-6`}
          >
            <div>{feature.icon}</div>
            <div className="text-sm">
              <p className="font-semibold text-gray-800">{feature.title}</p>
              <p className="text-xs text-gray-500">{feature.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureBar;

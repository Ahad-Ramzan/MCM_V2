"use client";

import { useState } from "react";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form logic (API call, validation, etc.)
    console.log("Tracking:", { orderNumber, email });
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className=" w-full text-center space-y-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold my-5">
          Acompanhar Encomenda
        </h1>
        <p className="text-sm text-gray-600">
          Para acompanhar a encomenda é necessário introduzir o número da
          encomenda e pressionar o botão. Este número pode ser{" "}
          <br className="hidden md:inline" /> encontrado em conjunto com o
          recibo e no email de confirmação que lhe foi enviado.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto text-left space-y-4 "
        >
          <div>
            <label className="block text-sm font-medium text-[var(--darkGray4)] mb-1">
              Número da Encomenda
            </label>
            <input
              type="text"
              className="w-full border border-gray-300  px-3 py-2 outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Encontre no email de confirmação"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300  px-3 py-2 outline-none focus:ring-1 focus:ring-red-500"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--secondary)] hover:bg-[var(--secondary2)] text-white cursor-pointer font-medium py-2  transition-all"
          >
            Acompanhar Encomenda
          </button>
        </form>
      </div>
    </div>
  );
}

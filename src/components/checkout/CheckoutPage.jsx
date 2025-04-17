"use client";
import { useState } from "react";

function Input({ type = "text", placeholder, className = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border border-[var(--lightGray4)] px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[var(--secondary)] ${className}`}
    />
  );
}

function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`bg-[var(--secondary)] text-white px-6 py-2 cursor-pointer hover:bg-[var(--secondary2)] transition ${className}`}
    >
      {children}
    </button>
  );
}

function Checkbox({ id }) {
  return (
    <input
      id={id}
      type="checkbox"
      className="h-4 w-4 text-[var(--secondary)] border-[var(--lightGray4)] rounded focus:ring-[var(--secondary)]"
    />
  );
}

export default function Checkout() {
  const [formData, setFormData] = useState({});

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-16 ">
      <h1 className="text-2xl md:text-3xl mx-auto font-bold mb-2 sm:mb-6 text-center">
        Finalizar Compra
      </h1>
      <div className="max-w-6xl mx-auto p-6 pt-0 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Email Section */}
          <div className="space-y-4">
            <label className="block text-lg font-normal pt-4">
              Endereço de e-mail
            </label>
            <Input
              type="email"
              placeholder="Email ou telefone"
              className="w-full"
            />

            <div className="flex items-center space-x-2">
              <Checkbox id="updates" />
              <label htmlFor="updates" className="text-sm">
                Receber atualizações sobre notícias e ofertas?
              </label>
            </div>

            {/* Address Section */}
            <h2 className="text-lg font-semibold pt-4">Endereço</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Nome" />
              <Input placeholder="Apelido" />
              <Input placeholder="Morada" className="md:col-span-2" />
              <Input
                placeholder="Rua, número, etc (opcional)"
                className="md:col-span-2"
              />
              <Input placeholder="Cidade" />
              <Input placeholder="Código Postal" />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="save" />
              <label htmlFor="save" className="text-sm text-[var(--darkGray)]">
                Guardar para compras futuras
              </label>
            </div>
            <div className="flex items-center justify-between space-x-2 pt-2">
              <div className="pt-4">
                <a
                  href="/cart"
                  className="text-sm text-[var(--darkGray4)] hover:text-black"
                >
                  ← Voltar para o Carrinho
                </a>
              </div>
              <div className="pt-6">
                <Button className="w-full lg:w-auto">Continuar</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-4">A tua Encomenda</h2>
          <div className="border border-[var(--lightGray4)] p-6  bg-white">
            <div className="border-b border-[var(--lightGray4)] pb-2 mb-2 text-sm font-semibold flex justify-between">
              <span>PRODUTO</span>
              <span>TOTAL</span>
            </div>
            <div className="text-sm text-[var(--darkGray4)] mb-4">
              Sem Produtos
            </div>
            <div className="flex justify-between text-sm font-medium border-t border-[var(--lightGray4)] pt-2">
              <span>SUBTOTAL</span>
              <span>0€</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2">
              <span>Total</span>
              <span>0,00€</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client'
import React from 'react'
import Image from 'next/image'
import FooterBottom from './FooterBottom'
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
} from 'react-icons/fa'
import { FaI } from 'react-icons/fa6'
import { MCMLogoBlue } from '@/assets/icons/index'

const FooterLinks = () => {
  return (
    <footer className="bg-white pt-10">
      <div className=" Container  flex flex-col lg:flex-row justify-between gap-10 mb-8">
        {/* Logo */}
        <div className="flex-1">
          <Image
            src={MCMLogoBlue}
            alt="MCM Logo"
            width={200}
            height={160}
            className=""
          />
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1  sm:grid-cols-3 lg:grid-cols-4 gap-6 text-sm text-gray-600 flex-[3]">
          {/* Contact Section */}
          <div>
            <h4 className="font-semibold text-black mb-7">Contactos</h4>
            <ul className="space-y-1 ">
              <li className="text-[var(--primary)] font-bold text-lg whitespace-nowrap">
                (+351) 224 151 808
              </li>
              <li className="text-xs mb-3">
                (chamada para a rede fixa nacional)
              </li>
              <li>Rua Nova do Cerno, 85</li>
              <li>4585 – 861 Rebordosa</li>
              <li>geral@mariaclaramarques.pt</li>
            </ul>

            {/* Social Share */}
            <div className="flex gap-3 mt-4">
              <a className=" text-blue-700 p-2 rounded">
                <FaFacebookF size={16} />
              </a>
              <a className=" text-sky-600 p-2 rounded">
                <FaTwitter size={16} />
              </a>
              <a className=" text-red-600 p-2 rounded">
                <FaGooglePlusG size={16} />
              </a>
              <a className=" text-pink-700 p-2 rounded">
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Informação */}
          <div>
            <h4 className="font-semibold text-black mb-7">Informação</h4>
            <ul className="space-y-1">
              <li>
                <a href="#">Política de Serviços</a>
              </li>
              <li>
                <a href="#">Termos & Condições</a>
              </li>
              <li>
                <a href="#">Envios</a>
              </li>
              <li>
                <a href="#">Promoções</a>
              </li>
              <li>
                <a href="#">Perguntas Frequentes</a>
              </li>
            </ul>
          </div>

          {/* Sobre */}
          <div>
            <h4 className="font-semibold text-black mb-7">Sobre</h4>
            <ul className="space-y-1">
              <li>
                <a href="#">Sobre nós</a>
              </li>
              <li>
                <a href="#">Recrutamento</a>
              </li>
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h4 className="font-semibold text-black mb-2">Blog</h4>
            <ul className="space-y-1">
              <li>
                <a href="#">Notícias</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <FooterBottom />
    </footer>
  )
}

export default FooterLinks

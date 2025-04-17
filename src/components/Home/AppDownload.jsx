'use client'
import React from 'react'
import Image from 'next/image'
import { AppStore, GooglePlay, Phone_banner } from '@/assets/images/index'

const AppDownload = () => {
  return (
    <div className="Container bg-gray-100 py-12 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 w-full relative">
      {/* Left Side - Phone Image */}
      <div>
        <div className="w-full md:w-1/2 flex justify-center md:absolute  md:bottom-0">
          <Image
            src={Phone_banner}
            alt="App Preview"
            className="object-contain"
            width={300}
            height={400}
            priority
          />
        </div>
      </div>

      {/* Right Side - Text & Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-2xl font-light mb-2">
          Faça Download da nossa App!
        </h2>
        <p className="text-sm text-[var(--darkGray)] mb-4">
          Descarregue a nossa aplicação para Android e iOS!
        </p>

        <form className="flex max-w-md mb-4">
          <input
            type="email"
            placeholder="Email"
            className="flex-1 border border-[var(--lightGray6)] rounded-l px-2 sm:px-4 py-2 outline-none"
          />
          <button
            type="submit"
            className="bg-[var(--secondary)] text-white px-2 sm:px-4 py-2 rounded-r cursor-pointer"
          >
            Subscrever
          </button>
        </form>

        {/* App Store Buttons */}
        <div className="flex gap-2 sm:gap-4">
          <Image
            src={GooglePlay}
            alt="Google Play"
            width={135}
            height={40}
            className="h-10 w-auto"
          />
          <Image
            src={AppStore}
            alt="App Store"
            width={135}
            height={40}
            className="h-10 w-auto"
          />
        </div>
      </div>
    </div>
  )
}

export default AppDownload

import React from 'react'

const FooterCopyright = () => {
  return (
    <div className="p-4">
      <div className="flex justify-center mb-3">
        <img
          src="/img/admin/Bitrix.png"
          alt="Bitrix Logo"
          className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>

      <div className="flex flex-col items-center text-center">
        <img
          src="/img/logo.png"
          alt="MCM Logo"
          className="h-6 mb-2 object-contain"
        />
        <p className="text-xs text-gray-500">
          &copy;2025 MCM Construções.
          <br />
          Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}

export default FooterCopyright

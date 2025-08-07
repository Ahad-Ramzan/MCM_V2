import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { text: 'Dashboard', url: '/admin/', icon: 'icon-home' },
  { text: 'Produtos', url: '/admin/products', icon: 'icon-database' },
  { text: 'Encomendas', url: '/admin/orders', icon: 'icon-bag2' },
  { text: 'Clientes', url: '/admin/customers', icon: 'icon-users2' },
  { text: 'Categorias', url: '/admin/categories', icon: 'icon-layers' },
  { text: 'SubCategories', url: '/admin/subcategories', icon: 'icon-grid' },
  { text: 'Marcas', url: '/admin/brand', icon: 'icon-tag' },
  { text: 'Banners', url: '/admin/banners', icon: 'icon-cog' },
  { text: 'Settings', url: '/admin/settings', icon: 'icon-cog' },
]

function normalizePath(path) {
  if (!path) return '/'
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
}

const MenuSidebar = () => {
  const pathname = usePathname()
  const normalizedPath = normalizePath(pathname)

  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item, idx) => {
            const isActive = normalizePath(item.url) === normalizedPath

            return (
              <li key={idx}>
                <Link
                  href={item.url}
                  className={`flex items-center px-3 py-2.5 text-sm rounded transition-all font-medium ${
                    isActive
                      ? 'bg-yellow-100 text-yellow-600' // Changed text color to yellow
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span
                    className={`mr-3 text-lg ${
                      isActive ? 'text-yellow-600' : 'text-gray-500'
                    }`}
                  >
                    <i className={item.icon}></i>
                  </span>
                  <span
                    className={`text-[15px] ${isActive ? 'text-yellow-600' : ''}`}
                  >
                    {item.text}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Fixed bottom section with Bitrix image and footer */}
      <div className="mt-auto">
        {/* Bitrix image positioned above footer */}
        <div className="px-3 py-4 border-t border-gray-200">
          <img
            src="/img/admin/Bitrix.png"
            alt="Bitrix Logo"
            className="h-24 mx-auto"
          />
        </div>

        {/* Footer copyright */}
        <div className="p-3 border-t border-gray-200">
          <img
            src="/img/logo.png"
            alt="MCM Logo"
            className="h-6 mx-auto mb-2"
          />
          <p className="text-xs text-center text-gray-500">
            ©2025 MCM Construções.
            <br />
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MenuSidebar

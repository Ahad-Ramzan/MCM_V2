import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { text: 'Dashboard', url: '/admin/', icon: 'icon-home' },
  { text: 'Produtos', url: '/admin/products', icon: 'icon-database' },
  { text: 'Encomendas', url: '/admin/orders', icon: 'icon-bag2' },
  { text: 'Clientes', url: '/admin/customers', icon: 'icon-users2' },
  { text: 'Categorias', url: '/admin/categories', icon: 'icon-users2' },
  { text: 'SubCategories', url: '/admin/subcategories', icon: 'icon-cog' },
  { text: 'Marcas', url: '/admin/brand', icon: 'icon-cog' },
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
    <ul className="menu">
      {menuItems.map((item, idx) => {
        const isActive = normalizePath(item.url) === normalizedPath
        return (
          <li key={idx} className={`menu-item${isActive ? ' active' : ''}`}>
            <Link href={item.url} className="flex items-center gap-2">
              <i className={item.icon}></i>
              {item.text}
            </Link>
          </li>
        )
      })}
      <div
        style={{
          padding: '1rem',
          textAlign: 'left',
          marginTop: '0.5rem',
          marginLeft: '1rem',
        }}
      >
        <img
          src="/img/admin/Bitrix.png"
          alt="Bitrix Logo"
          style={{
            maxWidth: '120px',
            height: 'auto',
          }}
        />
      </div>
    </ul>
  )
}

export default MenuSidebar

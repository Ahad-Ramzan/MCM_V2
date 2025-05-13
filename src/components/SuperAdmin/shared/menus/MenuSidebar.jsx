import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const MenuSidebar = () => {
  const router = useRouter()
  const menuItems = [
    {
      text: 'Dashboard',
      url: '/admin/',
      icon: 'icon-home',
    },
    {
      text: 'Produtos',
      url: '/admin/products',
      icon: 'icon-database',
    },
    {
      text: 'Encomendas',
      url: '/admin/orders',
      icon: 'icon-bag2',
    },
    {
      text: 'Clientes',
      url: '/admin/customers',
      icon: 'icon-users2',
    },
    {
      text: 'Categorias',
      url: '/admin/categories',
      icon: 'icon-users2',
    },
    {
      text: 'Settings',
      url: '/admin/settings',
      icon: 'icon-cog',
    },
    {
      text: 'Brand',
      url: '/admin/brand',
      icon: 'icon-cog',
    },
  ]

  return (
    <>
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={router.pathname === item.url ? 'active' : ''}
          >
            <Link href={item.url}>
              <i className={item.icon}></i>
              {item.text}
            </Link>
          </li>
        ))}
        <div
          style={{
            padding: '1rem',
            textAlign: 'left',
            marginTop: '0.5rem',
            marginLeft: '1rem', // 👈 optional: gives spacing from left edge
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
      {/* <div style={{ padding: '1rem', textAlign: 'center' }}>
        <img
          src="/img/admin/Bitrix.png"
          alt="Bitrix Logo"
          style={{
            maxWidth: '120px',
            height: 'auto',
            margin: '0 auto',
          }}
        />
      </div> */}
      {/* <div style={{ padding: '1rem' }}>
        <img
          src="/img/admin/Bitrix.png" // ✅ correct
          alt="Admin Logo"
          style={{ width: '100%', height: 'auto' }}
        />
        test
      </div> */}
    </>
  )
}

export default MenuSidebar

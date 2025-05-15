import React from 'react'
import FormHeaderSearch from '@/components/SuperAdmin/shared/forms/FormHeaderSearch'

const HeaderDashboard = ({
  title = 'Dashboard',
  description = 'Tudo aqui',
}) => {
  return (
    <header className="header--dashboard">
      <div className="header__left">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="header__center">
        <FormHeaderSearch />
      </div>
      <div className="header__right">
        <button
          className="header__site-link flex items-center gap-2"
          onClick={() => {
            localStorage.removeItem('access_token')
            window.location.href = '/'
          }}
        >
          <span>VER LOJA</span>
          <i className="icon-exit-right"></i>
        </button>
      </div>
    </header>
  )
}

export default HeaderDashboard

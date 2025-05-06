import React from 'react';
import FormHeaderSearch from '@/components/SuperAdmin/shared/forms/FormHeaderSearch';

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
                <a className="header__site-link" href="#">
                    <span>VER LOJA</span>
                    <i className="icon-exit-right"></i>
                </a>
            </div>
        </header>
    );
};

export default HeaderDashboard;

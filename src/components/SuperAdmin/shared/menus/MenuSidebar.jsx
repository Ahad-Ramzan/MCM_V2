import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const MenuSidebar = () => {
    const router = useRouter();
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
    ];

    return (
        <ul className="menu">
            {menuItems.map((item, index) => (
                <li
                    key={index}
                    className={router.pathname === item.url ? 'active' : ''}>
                    <Link href={item.url}>
                        <i className={item.icon}></i>
                        {item.text}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default MenuSidebar;

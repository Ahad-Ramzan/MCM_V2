'use client';
import React, { useEffect } from 'react';
import "../../../public/fonts/Linearicons/Font/demo-files/demo.css"
import '../../../public/fonts/font-awesome/css/font-awesome.css';
import '../../../public/css/bootstrap.min.css';
import '@/styles/style.scss';


export const metadata = {
    title: 'Martfury - Multipurpose Marketplace React Ecommerce Template',
    description: '',
}

export default function Template({ children }) {
    useEffect(() => {
        setTimeout(() => {
            document.getElementById('__next')?.classList.add('loaded');
        }, 100);
    }, []);

    return <>{children}</>;
}

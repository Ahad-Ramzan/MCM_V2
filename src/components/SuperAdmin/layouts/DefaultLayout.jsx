import React from 'react';
import Head from './modules/Head';
import HeaderMobile from '@/components/SuperAdmin/shared/headers/HeaderMobile';
import DrawerMenu from '@/components/SuperAdmin/shared/drawers/DrawerMenu';

const DefaultLayout = ({ children }) => {
    return (
        <div id="martfury">
            <Head />
            <HeaderMobile />
            {children}
            <DrawerMenu />
            <div id="loader-wrapper">
                <div className="loader-section section-left"></div>
                <div className="loader-section section-right"></div>
            </div>
        </div>
    );
};

export default DefaultLayout;

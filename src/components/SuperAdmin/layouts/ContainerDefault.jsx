import React from 'react';
import Head from 'next/head';
import FooterCopyright from '@/components/SuperAdmin/shared/footers/FooterCopyright';
import MenuSidebar from '@/components/SuperAdmin/shared/menus/MenuSidebar';
import WidgetEarningSidebar from '@/components/SuperAdmin//shared/widgets/WidgetEarningSidebar';
import WidgetUserWelcome from '@/components/SuperAdmin/shared/widgets/WidgetUserWelcome';
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard';

const ContainerDefault = ({ children, title }) => {
    let titleView;
    if (title !== undefined) {
        titleView = process.env.title + ' | ' + title;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

    return (
        <div className="martfury-admin">
            <Head>
                <title>{titleView}</title>
            </Head>
            <main className="ps-main">
                <div className="ps-main__sidebar">
                    <div className="ps-sidebar">
                        <div className="ps-sidebar__top">
                            <WidgetUserWelcome />
                            <WidgetEarningSidebar />
                        </div>
                        <div className="ps-sidebar__content">
                            <div className="ps-sidebar__center">
                                <MenuSidebar />
                            </div>
                        </div>
                        <div className="ps-sidebar__footer">
                            <FooterCopyright />
                        </div>
                    </div>
                </div>
                <div className="ps-main__wrapper">{children}</div>
            </main>
        </div>
    );
};

export default ContainerDefault;

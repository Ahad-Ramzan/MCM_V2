'use client'
import React, { useEffect } from 'react'
import FooterCopyright from '@/components/SuperAdmin/shared/footers/FooterCopyright'
import MenuSidebar from '@/components/SuperAdmin/shared/menus/MenuSidebar'
import WidgetEarningSidebar from '@/components/SuperAdmin/shared/widgets/WidgetEarningSidebar'
import WidgetUserWelcome from '@/components/SuperAdmin/shared/widgets/WidgetUserWelcome'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
// import { useDispatch } from 'react-redux';
// import { toggleDrawerMenu } from '~/redux/features/appSlide';

const ContainerDashboard = ({ children }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(toggleDrawerMenu(false));
  // }, []);

  return (
    <div className="martfury-admin">
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
                {/* <div
                  style={{
                    padding: '1rem',
                    // textAlign: 'center',
                    //   position: 'sticky',
                    // marginBottom: '100px',
                    display: 'flex',
                    justifyItems: 'flex-start',
                  }}
                >
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
              </div>
            </div>
            <div className="ps-sidebar__footer">
              <FooterCopyright />
            </div>
          </div>
        </div>
        <div className="ps-main__wrapper">
          <HeaderDashboard />
          {children}
        </div>
      </main>
    </div>
  )
}

export default ContainerDashboard

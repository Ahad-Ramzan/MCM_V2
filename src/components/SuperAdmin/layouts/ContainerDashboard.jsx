import React from 'react'
import Head from 'next/head'
import FooterCopyright from '@/components/SuperAdmin/shared/footers/FooterCopyright'
import MenuSidebar from '@/components/SuperAdmin/shared/menus/MenuSidebar'
import WidgetEarningSidebar from '@/components/SuperAdmin/shared/widgets/WidgetEarningSidebar'
import WidgetUserWelcome from '@/components/SuperAdmin/shared/widgets/WidgetUserWelcome'

const ContainerDefault = ({ children, title }) => {
  let titleView
  if (title !== undefined) {
    titleView = process.env.title + ' | ' + title
  } else {
    titleView = process.env.title + ' | ' + process.env.titleDescription
  }

  return (
    <div className="martfury-admin bg-gray-50">
      <Head>
        <title>{titleView}</title>
      </Head>
      <div className="flex min-h-screen">
        {/* Sidebar - Fixed width */}
        <div className="w-[280px] fixed h-full bg-white shadow-md z-10 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <WidgetUserWelcome />
            <WidgetEarningSidebar />
          </div>

          <div className="flex-1 overflow-y-auto">
            <MenuSidebar />
          </div>

          {/* <div className="mt-auto">
            <FooterCopyright />
          </div> */}
        </div>

        {/* Main Content - Consistent across all pages */}
        <div className="flex-1 ml-[280px] p-6 bg-white">{children}</div>
      </div>
    </div>
  )
}

export default ContainerDefault

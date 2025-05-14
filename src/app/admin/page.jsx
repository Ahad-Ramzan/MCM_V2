'use client'
import React, { useEffect, useState } from 'react'
import CardRecentOrders from '@/components/SuperAdmin/shared/cards/CardRecentOrders'
import CardSaleReport from '@/components/SuperAdmin/shared/cards/CardSaleReport'
import CardEarning from '@/components/SuperAdmin/shared/cards/CardEarning'
import CardStatics from '@/components/SuperAdmin/shared/cards/CardStatics'
import ContainerDashboard from '@/components/SuperAdmin/layouts/ContainerDashboard'
import CardTopCountries from '@/components/SuperAdmin/shared/cards/CardTopCountries'
import { getDashboardAnalytics } from '@/apis/userApi'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function Page() {
  const [analytics, setAnalyticsData] = useState({
    active_clients: 0,
    daily_sales: 7,
    daily_orders: [],
    last_30_days: {
      total_sales: 0,
      orders: [],
    },
    weekly_sales: [],
    top_4_brands: [],
  })
  console.log(
    analytics.active_clients,
    'main data data  newwwww -------------------'
  )

  const fetchAnalyticsData = async () => {
    try {
      const response = await getDashboardAnalytics() // API call
      setAnalyticsData(response) // State update
    } catch (error) {
      // toast.error('Failed to fetch analytics data')
    }
  }

  useEffect(() => {
    fetchAnalyticsData()
  }, [])
  return (
    <ProtectedRoute adminOnly={true}>
      <ContainerDashboard title="Dashboard">
        <section className="ps-dashboard" id="homepage">
          <div className="ps-section__left">
            <div className="row">
              <div className="col-xl-8 col-12">
                <CardSaleReport weekly_sales={analytics.weekly_sales} />
              </div>
              <div className="col-xl-4 col-12">
                <CardEarning daily_sales={analytics.daily_sales} />
              </div>
            </div>
            <CardRecentOrders analytics={analytics.daily_orders} />
          </div>
          <div className="ps-section__right">
            {analytics && (
              <CardStatics
                active_clients={analytics.active_clients}
                daily_sales={analytics.daily_sales}
              />
            )}
            <CardTopCountries top_4_brands={analytics.top_4_brands} />
          </div>
        </section>
      </ContainerDashboard>
    </ProtectedRoute>
  )
}

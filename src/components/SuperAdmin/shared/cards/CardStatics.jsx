import { getDashboardAnalytics } from '@/apis/userApi'
import React, { useEffect, useState } from 'react'

const CardStatics = () => {
  const [analytics, setAnalyticsData] = useState(null)
  console.log(analytics, 'analytics')

  const fetchAnalyticsData = async () => {
    try {
      const response = await getDashboardAnalytics()
      console.log('response', response)
      setAnalyticsData(response) 
    } catch (error) {
      toast.error('Failed to fetch analytics data')
    }
  }

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  return (
    <section className="ps-card ps-card--statics">
      <div className="ps-card__header">
        <h4>Estatisticas</h4>
        <div className="ps-card__sortby">
          <i className="icon-calendar-empty"></i>
          <div className="form-group--select">
            <select className="form-control">
              <option value="1">Ultimos 30 dias</option>
              <option value="2">Ultimos 90 dias</option>
              <option value="3">Ultimos 180 dias</option>
            </select>
            <i className="icon-chevron-down"></i>
          </div>
        </div>
      </div>
      <div className="ps-card__content">
        <div className="ps-block--stat yellow">
          <div className="ps-block__left">
            <span>
              <i className="icon-cart"></i>
            </span>
          </div>
          <div className="ps-block__content">
            <p>Active Clients</p>
            <h4>
              {analytics?.active_clients} {/* Default to 0 if undefined */}
              <small className="asc">
                <i className="icon-arrow-up"></i>
                <span>12,5%</span>
              </small>
            </h4>
          </div>
        </div>
        <div className="ps-block--stat pink">
          <div className="ps-block__left">
            <span>
              <i className="icon-cart"></i>
            </span>
          </div>
          <div className="ps-block__content">
            <p>Daily Sales</p>
            <h4>
              {analytics?.daily_sales} €
              <small className="asc">
                <i className="icon-arrow-up"></i>
                <span>7.1%</span>
              </small>
            </h4>
          </div>
        </div>
        <div className="ps-block--stat green">
          <div className="ps-block__left">
            <span>
              <i className="icon-cart"></i>
            </span>
          </div>
          <div className="ps-block__content">
            <p>Total Sales</p>
            <h4>
              {analytics?.last_30_days.total_sales} €
              <small className="desc">
                <i className="icon-arrow-down"></i>
                <span>0.5%</span>
              </small>
            </h4>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardStatics

import React from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const CardSaleReport = ({ weekly_sales = [] }) => {
  const categories = weekly_sales.map((item) => item.date)
  const data = weekly_sales.map((item) => item.sales)
  console.log(categories, 'categoriess date------')
  console.log(data, 'categoriess salesss------')

  const chartOptions = {
    series: [{ name: 'Vendas', data }],
    options: {
      chart: {
        height: 350,
        type: 'area',
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      colors: ['#fcb800'],
      stroke: { curve: 'smooth' },
      xaxis: {
        type: 'datetime',
        categories,
      },
      tooltip: {
        x: { format: 'dd/MM/yyyy' },
      },
      responsive: [
        {
          breakpoint: 1680,
          options: { chart: { width: '100%' } },
        },
        {
          breakpoint: 480,
          options: {
            chart: { width: '100%' },
            legend: { position: 'bottom' },
          },
        },
      ],
    },
  }

  return (
    <div className="ps-card ps-card--sale-report">
      <div className="ps-card__header">
        <h4>Relatório de Vendas</h4>
      </div>
      <div className="ps-card__content">
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="area"
          height={320}
        />
      </div>
      <div className="ps-card__footer">
        <div className="row">
          <div className="col-md-8">
            <p>Total de vendas (€)</p>
          </div>
          <div className="col-md-4">
            <a href="#">
              Exportar Relatório
              <i className="icon icon-cloud-download ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardSaleReport

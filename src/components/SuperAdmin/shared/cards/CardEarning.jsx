import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CardEarning = () => {
    const state = {
        series: [44, 55, 41],
        options: {
            chart: {
                height: 500,
                type: 'donut',
            },
            dataLabels: {
                enabled: false,
            },

            legend: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: '100%',
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    };

    return (
        <div className="ps-card ps-card--earning">
            <div className="ps-card__header">
                <h4>Ganhos</h4>
            </div>
            <div className="ps-card__content">
                <div className="ps-card__chart">
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="donut"
                    />
                    <div className="ps-card__information">
                        <i className="icon icon-wallet"></i>
                        <strong>12.345€</strong>
                        <small>Total</small>
                    </div>
                </div>
                <div className="ps-card__status">
                    <p className="yellow">
                        <strong> 12.345€</strong>
                        <span>Ganhos</span>
                    </p>
                    <p className="red">
                        <strong> 1.234€</strong>
                        <span>Taxas</span>
                    </p>
                    <p className="green">
                        <strong> 123.45€</strong>
                        <span>Tarifas</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardEarning;

'use client';
import React from 'react';
import CardRecentOrders from '@/components/SuperAdmin/shared/cards/CardRecentOrders';
import CardSaleReport from '@/components/SuperAdmin/shared/cards/CardSaleReport';
import CardEarning from '@/components/SuperAdmin/shared/cards/CardEarning';
import CardStatics from '@/components/SuperAdmin/shared/cards/CardStatics';
import ContainerDashboard from '@/components/SuperAdmin/layouts/ContainerDashboard';
import CardTopCountries from '@/components/SuperAdmin/shared/cards/CardTopCountries';

export default  function Page() {
    return (
        <ContainerDashboard title="Dashboard">
            <section className="ps-dashboard" id="homepage">
                <div className="ps-section__left">
                    <div className="row">
                        <div className="col-xl-8 col-12">
                            <CardSaleReport />
                        </div>
                        <div className="col-xl-4 col-12">
                            <CardEarning />
                        </div>
                    </div>
                    <CardRecentOrders />
                </div>
                <div className="ps-section__right">
                    <CardStatics />
                    <CardTopCountries />
                </div>
            </section>
        </ContainerDashboard>
    );
}

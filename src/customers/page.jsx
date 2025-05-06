'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import Pagination from '~/components/elements/basic/Pagination';
import TableCustomerItems from '~/components/shared/tables/TableCustomerItems';
import FormSearchSimple from '~/components/shared/forms/FormSearchSimple';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';

const CustomersPage = () => {
    return (
        <ContainerDefault title="Clientes">
            <HeaderDashboard title="Clientes" description="Lista de Clientes" />
            <section className="ps-items-listing">
                <div className="ps-section__header simple">
                    <div className="ps-section__filter">
                        <FormSearchSimple />
                    </div>
                    <div className="ps-section__actions">
                        <a className="ps-btn " href="#">
                            <i className="icon icon-plus mr-2"></i>Adicionar
                            cliente
                        </a>
                    </div>
                </div>
                <div className="ps-section__content">
                    <TableCustomerItems />
                </div>
                <div className="ps-section__footer">
                    <p>Mostrar 10 de 30 produtos..</p>
                    <Pagination />
                </div>
            </section>
        </ContainerDefault>
    );
};
export default CustomersPage;

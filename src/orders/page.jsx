'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import TableOrdersItems from '~/components/shared/tables/TableOrdersItems';
import Pagination from '~/components/elements/basic/Pagination';
import { Select } from 'antd';
import Link from 'next/link';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';

const { Option } = Select;
const OrdersPage = () => {
    return (
        <ContainerDefault>
            <HeaderDashboard
                title="Enconmendas"
                description="Lista de Encomendas"
            />
            <section className="ps-items-listing">
                <div className="ps-section__header simple">
                    <div className="ps-section__filter">
                        <form
                            className="ps-form--filter"
                            action="index.html"
                            method="get">
                            <div className="ps-form__left">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Pesquisar"
                                    />
                                </div>
                                <div className="form-group">
                                    <Select
                                        placeholder="Estado"
                                        className="ps-ant-dropdown"
                                        listItemHeight={20}>
                                        <Option value="active">Active</Option>
                                        <Option value="in-active">
                                            InActive
                                        </Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="ps-form__right">
                                <button className="ps-btn ps-btn--gray">
                                    <i className="icon icon-funnel mr-2"></i>
                                    Filtros
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="ps-section__actions">
                        <Link
                            href="/products/create-product"
                            className="ps-btn ">
                            <i className="icon icon-plus mr-2"></i>Nova
                            Encomenda
                        </Link>
                        <a
                            className="ps-btn ps-btn--gray"
                            href="new-order.html">
                            <i className="icon icon-download2 mr-2"></i>Exportar
                        </a>
                    </div>
                </div>
                <div className="ps-section__content">
                    <TableOrdersItems />
                </div>
                <div className="ps-section__footer">
                    <p>Mostrar 10 de 30 produtos.</p>
                    <Pagination />
                </div>
            </section>
        </ContainerDefault>
    );
};
export default OrdersPage;

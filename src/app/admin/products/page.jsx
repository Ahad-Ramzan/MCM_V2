'use client';
import React from 'react';
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault';
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination';
import TableProjectItems from '@/components/SuperAdmin/shared/tables/TableProjectItems';
import { Select } from 'antd';
import Link from 'next/link';
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard';
import { getAllProducts } from '@/apis/products';

const { Option } = Select;
const ProductPage = () => {

    const products=getAllProducts()
    console.log(products,"data")
    return (
        <ContainerDefault title="Products">
            <HeaderDashboard
                title="Produtos"
                description="Lista de Protudos "
            />
            <section className="ps-items-listing">
                <div className="ps-section__actions">
                    <Link href="/admin/products/create-product" className="ps-btn ">
                        <i className="icon icon-plus mr-2" />
                        NOVO PRODUTO
                    </Link>
                </div>
                <div className="ps-section__header">
                    <div className="ps-section__filter">
                        <form
                            className="ps-form--filter"
                            action="index.html"
                            method="get">
                            <div className="ps-form__left">
                                <div className="form-group">
                                    <Select
                                        placeholder="Selecionar Categoria"
                                        className="ps-ant-dropdown"
                                        listItemHeight={20}>
                                        <Option value="clothing-and-apparel">
                                            Clothing & Apparel
                                        </Option>
                                        <Option value="garden-and-kitchen">
                                            Garden & Kitchen
                                        </Option>
                                    </Select>
                                </div>
                                <div className="form-group">
                                    <Select
                                        placeholder="Selecionar Categoria"
                                        className="ps-ant-dropdown"
                                        listItemHeight={20}>
                                        <Option value="simple-product">
                                            Simple Product
                                        </Option>
                                        <Option value="groupped-product">
                                            Groupped product
                                        </Option>
                                    </Select>
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
                    <div className="ps-section__search">
                        <form
                            className="ps-form--search-simple"
                            action="index.html"
                            method="get">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search product"
                            />
                            <button>
                                <i className="icon icon-magnifier"></i>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="ps-section__content">
                    <TableProjectItems />
                </div>
                <div className="ps-section__footer">
                    <p>Mostrar 10 de 30 Produtos.</p>
                    <Pagination />
                </div>
            </section>
        </ContainerDefault>
    );
};
export default ProductPage;

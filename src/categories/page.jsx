'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import TableCategoryItems from '~/components/shared/tables/TableCategoryItems';
import Pagination from '~/components/elements/basic/Pagination';
import FormCreateCategory from '~/components/shared/forms/FormCreateCategory';
import FormSearchSimple from '~/components/shared/forms/FormSearchSimple';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';

const CategoriesPage = () => {
    return (
        <ContainerDefault>
            <HeaderDashboard
                title="Categorias"
                description="Lista de Categorias"
            />
            <section className="ps-dashboard ps-items-listing">
                <div className="ps-section__left">
                    <div className="ps-section__header">
                        <FormSearchSimple />
                    </div>
                    <div className="ps-section__content">
                        <TableCategoryItems />
                        <div className="ps-section__footer">
                            <p>Mortar 5 de 30 items.</p>
                            <Pagination />
                        </div>
                    </div>
                </div>
                <div className="ps-section__right">
                    <FormCreateCategory />
                </div>
            </section>
        </ContainerDefault>
    );
};

export default CategoriesPage;

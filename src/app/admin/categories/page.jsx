'use client';
import React from 'react';
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault';
import TableCategoryItems from '@/components/SuperAdmin/shared/tables/TableCategoryItems';
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination';
import FormCreateCategory from '@/components/SuperAdmin/shared/forms/FormCreateCategory';
import FormSearchSimple from '@/components/SuperAdmin/shared/forms/FormSearchSimple';
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard';

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

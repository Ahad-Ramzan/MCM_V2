'use client';
import React, { useEffect, useState } from 'react';
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault';
import TableCategoryItems from '@/components/SuperAdmin/shared/tables/TableCategoryItems';
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination';
import FormCreateCategory from '@/components/SuperAdmin/shared/forms/FormCreateCategory';
import FormSearchSimple from '@/components/SuperAdmin/shared/forms/FormSearchSimple';
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard';
import { getAllCategories } from '@/apis/products';

const CategoriesPage = () => {

    const [categories,setCategories] = useState([])
    console.log(categories ,"cat-----")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response); // Store in state
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
    
        fetchData();
    }, []);

    // const data=
    // console.log(data,"categories data")
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
                        <TableCategoryItems categories={categories} />
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

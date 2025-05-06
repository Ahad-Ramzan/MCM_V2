'use client';
import React from 'react';
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault';
import FormAccountSettings from '@/components/SuperAdmin/shared/forms/FormAccountSettings';
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard';

const SettingsPage = () => {
    return (
        <ContainerDefault title="Settings">
            <HeaderDashboard title="Settings" description="Lista de Settings" />
            <section className="ps-dashboard ps-items-listing">
                <div className="ps-section__left">
                    <section className="ps-card">
                        <div className="ps-card__header">
                            <h4 >Account Settings</h4>
                        </div>
                        <div className="ps-card__content">
                            <FormAccountSettings />
                        </div>
                    </section>
                </div>
                <div className="ps-section__right"></div>
            </section>
        </ContainerDefault>
    );
};
export default SettingsPage;

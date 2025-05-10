'use client';

import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '@/apis/userApi';

const FormAccountSettings = () => {
    const [userData, setUserData] = useState({
        full_name: '',
        email: '',
        role: '',
        address: '',
        bio: '',
        display_name: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCurrentUser();
                setUserData({
                    full_name: response.full_name || '',
                    email: response.email || '',
                    role: response.role || '',
                    address: response.address || '',
                    bio: response.bio || '',
                    display_name: response.display_name || '',
                });
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <form className="ps-form--account-settings" action="#" method="get">
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            className="form-control"
                            type="text"
                            value={userData.full_name}
                            readOnly
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Display Name</label>
                        <input
                            className="form-control"
                            type="text"
                            value={userData.display_name}
                            readOnly
                        />
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="form-control"
                            type="text"
                            value={userData.email}
                            readOnly
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Role</label>
                        <input
                            className="form-control"
                            type="text"
                            value={userData.role}
                            readOnly
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            className="form-control"
                            type="text"
                            value={userData.address}
                            readOnly
                        />
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Bio</label>
                        <textarea
                            className="form-control"
                            rows="6"
                            value={userData.bio}
                            readOnly
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="ps-form__submit text-center">
                <button className="ps-btn ps-btn--gray mr-3" type="button">
                    Cancel
                </button>
                <button className="ps-btn success" type="submit">
                    Update Profile
                </button>
            </div>
        </form>
    );
};

export default FormAccountSettings;

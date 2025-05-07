'use client';

import React, { useState } from 'react';
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault';
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard';

const initialFormState = {
    name: '',
    reference: '',
    summary: '',
    regularPrice: '',
    salePrice: '',
    saleQuantity: '',
    soldItems: '',
    description: '',
    thumbnail: '',
    gallery1: '',
    gallery2: '',
    video: '',
    sku: '',
    status: '',
    brand: '',
    tags: '',
};

const CreateProductPage = () => {
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Data:', formData);
        // Add API call here to send formData to backend
    };

    return (
        <ContainerDefault title="Create new product">
            <HeaderDashboard
                title="Create Product"
                description="Martfury Create New Product"
            />
            <section className="ps-new-item">
                <form
                    className="ps-form ps-form--new-product"
                    onSubmit={handleSubmit}
                >
                    <div className="ps-form__content">
                        <div className="row">
                            {/* Left Column */}
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <figure className="ps-block--form-box">
                                    <figcaption>General</figcaption>
                                    <div className="ps-block__content">
                                        <div className="form-group">
                                            <label>Product Name *</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="name"
                                                placeholder="Enter product name..."
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Reference *</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="reference"
                                                placeholder="Enter reference..."
                                                value={formData.reference}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Product Summary *</label>
                                            <textarea
                                                className="form-control"
                                                name="summary"
                                                rows="3"
                                                placeholder="Enter summary..."
                                                value={formData.summary}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Regular Price *</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="regularPrice"
                                                value={formData.regularPrice}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Sale Price *</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="salePrice"
                                                value={formData.salePrice}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Sale Quantity *</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="saleQuantity"
                                                value={formData.saleQuantity}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Sold Items *</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="soldItems"
                                                value={formData.soldItems}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Product Description *</label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                rows="6"
                                                placeholder="Enter detailed description..."
                                                value={formData.description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </figure>
                            </div>

                            {/* Right Column */}
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <figure className="ps-block--form-box">
                                    <figcaption>Product Images</figcaption>
                                    <div className="ps-block__content">
                                        <div className="form-group">
                                            <label>Product Thumbnail</label>
                                            <input
                                                className="form-control mb-1"
                                                type="text"
                                                name="thumbnail"
                                                value={formData.thumbnail}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Product Gallery</label>
                                            <input
                                                className="form-control mb-1"
                                                type="text"
                                                name="gallery1"
                                                value={formData.gallery1}
                                                onChange={handleChange}
                                            />
                                            <input
                                                className="form-control mb-1"
                                                type="text"
                                                name="gallery2"
                                                value={formData.gallery2}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Video (optional)</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="video"
                                                placeholder="Enter video URL"
                                                value={formData.video}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </figure>

                                <figure className="ps-block--form-box">
                                    <figcaption>Inventory</figcaption>
                                    <div className="ps-block__content">
                                        <div className="form-group">
                                            <label>SKU *</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="sku"
                                                value={formData.sku}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select
                                                className="form-control"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select status</option>
                                                <option value="1">Status 1</option>
                                                <option value="2">Status 2</option>
                                                <option value="3">Status 3</option>
                                                <option value="4">Status 4</option>
                                            </select>
                                        </div>
                                    </div>
                                </figure>

                                <figure className="ps-block--form-box">
                                    <figcaption>Meta</figcaption>
                                    <div className="ps-block__content">
                                        <div className="form-group">
                                            <label>Brand</label>
                                            <select
                                                className="form-control"
                                                name="brand"
                                                value={formData.brand}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select brand</option>
                                                <option value="1">Brand 1</option>
                                                <option value="2">Brand 2</option>
                                                <option value="3">Brand 3</option>
                                                <option value="4">Brand 4</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Tags</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="tags"
                                                value={formData.tags}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>

                    <div className="ps-form__bottom mt-4">
                        <a className="ps-btn ps-btn--black" href="/products">
                            Back
                        </a>
                        <button type="button" className="ps-btn ps-btn--gray">
                            Cancel
                        </button>
                        <button type="submit" className="ps-btn">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </ContainerDefault>
    );
};

export default CreateProductPage;

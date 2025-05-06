import React from 'react';
import DropdownAction from '@/components/SuperAdmin/elements/basic/DropdownAction';

const TableProjectItems = () => {
    const productItems = [
        {
            name: 'Placas de gesso',
            sku: 'AB123456789-1',
            stock: 'true',
            price: '123.00€',
            date: '01/03/2025',
            categories: [
                {
                    name: 'Divisorrias',
                },
                {
                    name: 'tetos e isolamento',
                },
            ],
        },
        {
            name: 'Placas de gesso',
            sku: 'SP123456789-1',
            stock: 'true',
            price: '123.00€',
            date: '01/03/2025',
            categories: [
                {
                    name: 'Divisorrias',
                },
                {
                    name: 'tetos e isolamento',
                },
            ],
        },
        {
            name: 'Placas de gesso',
            sku: 'CD123456789-1',
            stock: 'true',
            price: '123.00€',
            date: '01/03/2025',
            categories: [
                {
                    name: 'Divisorrias',
                },
                {
                    name: 'tetos e isolamento',
                },
            ],
        },
        {
            name: 'Placas de gesso',
            sku: 'AB123456789-1',
            stock: 'true',
            price: '123.00€',
            date: '01/03/2025',
            categories: [
                {
                    name: 'Divisorrias',
                },
                {
                    name: 'tetos e isolamento',
                },
            ],
        },
        {
            name: 'Placas de gesso',
            sku: 'AB123456789-1',
            stock: 'true',
            price: '123.00€',
            date: '01/03/2025',
            categories: [
                {
                    name: 'Divisorrias',
                },
                {
                    name: 'tetos e isolamento',
                },
            ],
        },
        {
            name: 'Placas de gesso',
            sku: 'AB123456789-1',
            stock: 'true',
            price: '123.00€',
            date: '01/03/2025',
            categories: [
                {
                    name: 'Divisorrias',
                },
                {
                    name: 'tetos e isolamento',
                },
            ],
        },
    ];
    const tableItems = productItems.map((item, index) => {
        let badgeView;
        if (item.stock) {
            badgeView = <span className="ps-badge success">Stock</span>;
        } else {
            badgeView = <span className="ps-badge gray">Out of stock</span>;
        }
        return (
            <tr key={item.sku}>
                <td>{index + 1}</td>
                <td>
                    <a href="#">
                        <strong>{item.name}</strong>
                    </a>
                </td>
                <td>{item.sku}</td>
                <td>{badgeView}</td>
                <td>
                    <strong>{item.price}</strong>
                </td>
                <td>
                    <p className="ps-item-categories">
                        {item.categories.map((cat) => (
                            <a href="#" key={cat.name}>
                                {cat.name}
                            </a>
                        ))}
                    </p>
                </td>
                <td>{item.date}</td>
                <td>
                    <DropdownAction />
                </td>
            </tr>
        );
    });
    return (
        <div className="table-responsive">
            <table className="table ps-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Stock</th>
                        <th>Preço</th>
                        <th>Categorias</th>
                        <th>Data</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tableItems}</tbody>
            </table>
        </div>
    );
};

export default TableProjectItems;

import React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import DropdownAction from '@/components/SuperAdmin/elements/basic/DropdownAction';

const TableOrdersItems = () => {
    const orderItems = [
        {
            id: '#A580',
            date: 'Ago 15, 2024',
            product: 'Placas de gesso',
            payment: true,
            fullfillment: 'delivered',
            total: '123.00€',
        },
        {
            id: '#B260',
            date: 'Ago 15, 2024',
            product: 'Placas de gesso',
            payment: false,
            fullfillment: 'delivered',
            total: '123.00€',
        },
        {
            id: '#A583',
            date: 'Ago 15, 2024',
            product: 'Placas de gesso',
            payment: true,
            fullfillment: 'In Progress',
            total: '123.00€',
        },
        {
            id: '#A523',
            date: 'Ago 15, 2024',
            product: 'Placas de gesso',
            payment: false,
            fullfillment: 'delivered',
            total: '123.00€',
        },
        {
            id: '#A112',
            date: 'Ago 15, 2024',
            product: 'Placas de gesso',
            payment: true,
            fullfillment: 'Cancel',
            total: '123.00€',
        },
    ];

    const tableItemsView = orderItems.map((item) => {
        let badgeView, fullfillmentView;
        const menuView = (
            <Menu>
                <Menu.Item key={0}>
                    <a className="dropdown-item" href="#">
                        Edit
                    </a>
                </Menu.Item>
                <Menu.Item key={0}>
                    <a className="dropdown-item" href="#">
                        <i className="icon-t"></i>
                        Delete
                    </a>
                </Menu.Item>
            </Menu>
        );
        if (item.payment) {
            badgeView = <span className="ps-badge success">Pago</span>;
        } else {
            badgeView = <span className="ps-badge gray">Pendente</span>;
        }
        switch (item.fullfillment) {
            case 'In Progress':
                fullfillmentView = (
                    <span className="ps-fullfillment warning">Pendente</span>
                );
                break;
            case 'Cancel':
                fullfillmentView = (
                    <span className="ps-fullfillment danger">cancelado</span>
                );
                break;
            default:
                fullfillmentView = (
                    <span className="ps-fullfillment success">Entregue</span>
                );
                break;
        }
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                    <Link href="/orders/order-detail">
                        <strong>{item.product}</strong>
                    </Link>
                </td>
                <td>
                    <strong> Aug 15, 2024</strong>
                </td>
                <td>{badgeView}</td>
                <td>{fullfillmentView}</td>
                <td>
                    <strong>{item.total}</strong>
                </td>
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
                        <th>Data</th>
                        <th>Produto</th>
                        <th>Pagamento</th>
                        <th>Estado</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tableItemsView}</tbody>
            </table>
        </div>
    );
};

export default TableOrdersItems;

import React from 'react';
import DropdownAction from '@/components/SuperAdmin/elements/basic/DropdownAction';

const TableCustomerItems = () => {
    const customers = [
        {
            name: 'Joao Ferreira',
            phone: '(+351) 123-456-789',
            balance: '123.00€',
            orders: '10',
            status: 'true',
        },
        {
            name: 'Maria Costa',
            phone: '(+351) 123-456-789',
            balance: '123.00€',
            orders: '10',
            status: 'true',
        },
        {
            name: 'Tiago Moreira',
            phone: '(+351) 123-456-789',
            balance: '123.00€',
            orders: '10',
            status: 'true',
        },
        {
            name: 'Pedro Rocha',
            phone: '(+351) 123-456-789',
            balance: '123.00€',
            orders: '10',
            status: 'true',
        },
        {
            name: 'Ines Matos',
            phone: '(+351) 123-456-789',
            balance: '123.00€',
            orders: '10',
            status: 'true',
        },
        {
            name: 'Luis Carvalho',
            phone: '(+351) 123-456-789',
            balance: '123.00€',
            orders: '10',
            status: 'true',
        },
        {
            name: 'Catarina Ramos',
            phone: '(+351) 123-456-789',
            balance: '123.00€',
            orders: '10',
            status: 'true',
        },
        {
            name: 'Ana Ribeiro',
            phone: '(+351) 123-456-789',
            balance: '123.00€',
            orders: '10',
            status: 'true',
        },
    ];
    const tableItemsView = customers.map((item, index) => {
        let badgeView;

        if (item.status) {
            badgeView = <span className="ps-badge success">Ativo</span>;
        } else {
            badgeView = <span className="ps-badge gray">desativado</span>;
        }

        return (
            <tr key={index}>
                <td>{index}</td>
                <td>
                    <strong>{item.name}</strong>
                </td>
                <td>{item.phone}</td>
                <td>{item.balance}</td>
                <td>{item.orders}</td>
                <td>{badgeView}</td>
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
                        <th>Contacto</th>
                        <th>Montante</th>
                        <th>Encomendas</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tableItemsView}</tbody>
            </table>
        </div>
    );
};

export default TableCustomerItems;

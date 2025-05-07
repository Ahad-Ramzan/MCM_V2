import React from 'react';

const TableCategoryItems = ({ categories }) => {
    console.log(categories, "new categories");

    return (
        <div className="table-responsive">
            <table className="table ps-table">
                <thead>
                    <tr>
                        <th>Name da Categoria</th>
                        <th>Slug</th>
                        <th>Data de Criação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <tr key={category.id}>
                                <td>
                                    <strong>{category.name}</strong>
                                </td>
                                <td>{category.slug}</td>
                                <td>
                                    {category.created_at
                                        ? new Date(category.created_at).toLocaleDateString()
                                        : '—'}
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <a
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false">
                                            <i className="icon-ellipsis"></i>
                                        </a>
                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" href="#">
                                                editar
                                            </a>
                                            <a className="dropdown-item" href="#">
                                                Excluir
                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No categories found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableCategoryItems;

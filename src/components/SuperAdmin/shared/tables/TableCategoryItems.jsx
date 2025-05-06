import React from 'react';

const TableCategoryItems = () => {
    return (
        <div className="table-responsive">
            <table className="table ps-table">
                <thead>
                    <tr>
                        <th>Name da Categoria</th>
                        <th>Slug</th>
                        <th>Data de Criação</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>Pavimentos e Revestimentos Moms</strong>
                        </td>
                        <td>pavimentos-e-revestimentos Moms</td>
                        <td>Jul 21, 2024</td>
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
                    <tr>
                        <td>
                            <strong>Madeiras e Acrilicos</strong>
                        </td>
                        <td>madeiras-e-acrilicos</td>
                        <td>Jul 21, 2024</td>
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
                    <tr>
                        <td>
                            <strong>Construçã</strong>
                        </td>
                        <td>Construção</td>
                        <td>Jul 21, 2024</td>
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
                    <tr>
                        <td>
                            <strong>Ferragens</strong>
                        </td>
                        <td>ferragens</td>
                        <td>Jul 21, 2024</td>
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
                    <tr>
                        <td>
                            <strong>Ferramentas</strong>
                        </td>
                        <td>ferramentas</td>
                        <td>Jul 21, 2024</td>
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
                </tbody>
            </table>
        </div>
    );
};

export default TableCategoryItems;

import React, { useEffect, useState } from 'react'
import DropdownAction from '@/components/SuperAdmin/elements/basic/DropdownAction'
// import { getUserdata } from '@/apis/userApi'
import Link from 'next/link'

const TableCustomerItems = ({ userData, onDelete }) => {
  const tableItemsView = userData.results.map((item, index) => {
    let badgeView

    if (item.status) {
      badgeView = <span className="ps-badge success">Ativo</span>
    } else {
      badgeView = <span className="ps-badge gray">desativado</span>
    }

    return (
      <tr key={index}>
        <td>{index}</td>
        <td>
          <strong>{item.full_name}</strong>
        </td>
        <td>{item.contact_number ? item.contact_number : 'null'}</td>
        <td>{item.total_order_amount}</td>
        <td>{item.total_orders}</td>
        <td>{item.is_active ? 'Active' : 'Inactive'}</td>
        <td>
          {/* <DropdownAction /> */}
          {/* <Link href="#" className="ps-btn ps-btn--sm">
            Edit
          </Link> */}
          <button
            className="ps-btn ps-btn--sm ps-btn--danger ml-2"
            onClick={() => onDelete(item.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    )
  })
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
  )
}

export default TableCustomerItems

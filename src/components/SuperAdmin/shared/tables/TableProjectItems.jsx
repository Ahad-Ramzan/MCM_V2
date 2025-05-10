import React from 'react'
// import DropdownAction from '@/components/SuperAdmin/elements/basic/DropdownAction';
import Link from 'next/link'

const TableProjectItems = ({ productsData, onDelete }) => {
  const tableItems = Array.isArray(productsData)
    ? productsData.map((item, index) => {
        const badgeView =
          item.stock > 0 ? (
            <span className="ps-badge success">Stock</span>
          ) : (
            <span className="ps-badge gray">Out of stock</span>
          )

        console.log(productsData, 'production data')

        return (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>
              <a href="#">
                <strong>{item.product_name}</strong>
              </a>
            </td>
            <td>{item.SKU}</td>
            {/* <td>{badgeView}</td> */}
            <td>{item.stock}</td>
            <td>
              <strong>{item.regular_price}€</strong>
            </td>
            <td>
              {/* Optional: show category name if you fetch it */}
              <p className="ps-item-categories">
                <a href="#">Categoria ID: {item.category}</a>
              </p>
            </td>
            <td>{new Date(item.date).toLocaleDateString()}</td>
            <td>
              {/* <DropdownAction /> */}
              <Link
                href={`/admin/products/${item.id}`}
                className="ps-btn ps-btn--sm"
              >
                Edit
              </Link>
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
    : []

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
  )
}

export default TableProjectItems

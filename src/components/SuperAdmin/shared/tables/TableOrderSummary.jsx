import React from 'react'

const TableOrderSummary = ({ analytics }) => {
  return (
    <div className="table-responsive">
      <table className="table ps-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Produtos</th>
            <th>Pagamento</th>
            <th>Estado</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {analytics.map((order, index) => (
            <tr key={index}>
              <td>{order.id}</td>
              <td>
                <strong>{new Date(order.date).toLocaleDateString()}</strong>
              </td>
              <td>
                <a href="order-detail.html">
                  <strong>
                    {order.products && order.products.length > 0
                      ? order.products.map((product, index) => (
                          <span key={index}>
                            {product.product_name}
                            {index !== order.products.length - 1 && ', '}
                          </span>
                        ))
                      : 'No Products'}
                  </strong>
                </a>
              </td>
              <td>
                <span
                  className={`ps-badge ${
                    order.payment === 'pending' ? 'gray' : 'success'
                  }`}
                >
                  {order.payment}
                </span>
              </td>
              <td>
                <span
                  className={`ps-fullfillment ${
                    order.status === 'processing' ? 'warning' : 'success'
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td>
                <strong>{order.amount}</strong>
              </td>
              <td>
                <div className="dropdown">
                  <a
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="icon-ellipsis"></i>
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      className="dropdown-item"
                      href="#"
                      style={{ backgroundColor: '#fcb800', color: '#000' }}
                    >
                      Edit
                    </a>
                    <a className="dropdown-item" href="#">
                      Delete
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableOrderSummary

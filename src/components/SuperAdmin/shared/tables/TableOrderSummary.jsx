import React from 'react'

const orders = [
  {
    id: '#A580',
    date: 'Aug 15, 2024',
    product: 'Placas de gesso',
    payment: 'Pago',
    paymentStatus: 'success',
    status: 'Entregue',
    statusClass: 'success',
    total: '12.00€',
  },
  {
    id: '#B260',
    date: 'Aug 15, 2024',
    product: 'Placas de gesso',
    payment: 'Pendente',
    paymentStatus: 'gray',
    status: 'Entregue',
    statusClass: 'success',
    total: '12.00€',
  },
  // Add more objects
]

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
                <strong> {new Date(order.date).toLocaleDateString()}</strong>
              </td>
              <td>
                <a href="order-detail.html">
                  <strong>
                    {order.products && order.products.length > 0
                      ? item.products.map((product, index) => (
                          <span key={product.id || index}>
                            {product.products}
                            {index !== item.products.length - 1 && ', '}
                          </span>
                        ))
                      : 'No Products'}
                  </strong>
                </a>
              </td>
              <td>
                <span className={`ps-badge ${order.paymentStatus}`}>
                  {order.payment}
                </span>
              </td>
              <td>
                <span className={`ps-fullfillment ${order.statusClass}`}>
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
                    <a className="dropdown-item" href="#">
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

import React from 'react'
import { OrderT } from "../../utils/types.ts"

const statusColors: Record<string, string> = {
  PENDING: 'warning',
  PAID: 'success',
  CANCELLED: 'danger',
}

const OrderCard = ({ order }: { order: OrderT }) => {
  const total = order.orderItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  )

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <strong>Order #{order.orderId}</strong> —{' '}
          <span className={`badge bg-${statusColors[order.status!]}`}>
            {order.status}
          </span>
        </div>
        <small className="text-muted">
          {new Date(order.dateCreated!).toLocaleString()}
        </small>
      </div>
      <div className="card-body">
        <p className="card-text"><strong>Address:</strong>   {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>

        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
            <tr>
              <th>#</th>
              <th>Product ID</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Subtotal</th>
            </tr>
            </thead>
            <tbody>
            {order.orderItems.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.productId}</td>
                <td>{item.quantity}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td>${(item.quantity * item.unitPrice).toFixed(2)}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="text-end mt-2">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  )
}

export default OrderCard

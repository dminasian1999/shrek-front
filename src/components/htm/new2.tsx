import React from "react";
import { OrderT } from "../../utils/types";
import { OrderItemsTable } from "./new3.tsx"

const statusMap: Record<string, string> = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
};

interface OrderListItemProps {
  order: OrderT;
  index: number;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const OrderListItem: React.FC<OrderListItemProps> = ({ order }) => {
  const total = order.orderItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const collapseId = `collapse-${order.orderId}`;
  const headingId = `heading-${order.orderId}`;

  return (
    <div className="accordion-item mb-3 border rounded shadow-sm">
      <h2 className="accordion-header" id={headingId}>
        <button
          className="accordion-button collapsed p-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-expanded="false"
          aria-controls={collapseId}
        >
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex flex-column">
              <span className="fw-bold">Order #{order.orderId}</span>
              {/*<small className="text-muted">{formatDate(order.dateCreated)}</small>*/}
            </div>
            <div className="d-flex flex-column align-items-end">
              <span className={`badge bg-${statusMap[order.status!]}`}>
                {order.status}
              </span>
              <span className="fw-bold mt-1">${total.toFixed(2)}</span>
            </div>
          </div>
        </button>
      </h2>
      <div
        id={collapseId}
        className="accordion-collapse collapse"
        aria-labelledby={headingId}
        data-bs-parent="#accordionOrders"
      >
        <div className="accordion-body border-top">
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Shipping Address:</strong>
              <p className="mb-0 text-muted">{`${order.shippingAddress.street}, ${order.shippingAddress.city}`}</p>
            </div>
            <div className="col-md-6">
              <strong>Payment Method:</strong>
              <p className="mb-0 text-muted">{order.paymentMethod}</p>
            </div>
          </div>
          <OrderItemsTable items={order.orderItems} />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { OrderItemT } from "../../utils/types";

interface OrderItemsTableProps {
  items: OrderItemT[];
}

export const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ items }) => (
  <div className="table-responsive">
    <table className="table table-sm table-bordered align-middle text-center mb-0">
      <thead className="table-light">
      <tr>
        <th scope="col">Product</th>
        <th scope="col">Quantity</th>
        <th scope="col">Unit Price</th>
        <th scope="col">Subtotal</th>
      </tr>
      </thead>
      <tbody>
      {items.map((item) => (
        <tr key={item.productId}>
          <td>Product #{item.productId}</td>
          <td>{item.quantity}</td>
          <td>${item.unitPrice.toFixed(2)}</td>
          <td className="fw-bold">${(item.quantity * item.unitPrice).toFixed(2)}</td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>
);

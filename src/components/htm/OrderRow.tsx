// src/components/orders/OrderRow.tsx
import React from "react";
import type { OrderItemT } from "../../utils/types";

const statusMap: Record<string, string> = {
  Paid: "success",
  Pending: "warning text-dark",
  Overdue: "danger",
};

interface Props {
  orderId: string;
  orderStatus?: string; // use order-level status for the row badge
  item: OrderItemT;
}

const OrderRow: React.FC<Props> = ({ item, orderStatus }) => {
  const qty = item.quantity ?? 0;
  const price = item.unitPrice ?? 0;
  const badgeClass = statusMap[orderStatus ?? ""] ?? "secondary";

  return (
    <tr>
      <td className="fw-semibold text-nowrap">#{item.productId}</td>

      <td className="text-center" style={{ minWidth: 120 }}>
        <span className="text-muted">{qty}</span>
      </td>

      <td className="text-end" style={{ minWidth: 140 }}>
        <span>${price.toFixed(2)}</span>
      </td>

      <td>
        <span className={`badge bg-${badgeClass}`}>
          {orderStatus ?? "—"}
        </span>
      </td>

      <td className="text-end text-nowrap">
        <span className="text-muted small">View</span>
      </td>
    </tr>
  );
};

export default OrderRow;

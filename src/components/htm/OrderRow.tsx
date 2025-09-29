import React from "react";
import { OrderItemT } from "../../utils/types.ts";

const statusMap: Record<string, string> = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
};

interface OrderRowProps {
  orderId: string;
  orderStatus: string | undefined;
  item: OrderItemT;
  isEditing: boolean;
  formData: OrderItemT | null;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (updatedItem: OrderItemT) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OrderRow: React.FC<OrderRowProps> = ({
                                             orderId,
                                             orderStatus,
                                             item,
                                             isEditing,
                                             formData,
                                             onEdit,
                                             onCancel,
                                             onSave,
                                             onChange,
                                           }) => {
  return (
    <tr key={`${orderId}-${item.productId}`}>
      {/* Product ID */}
      <td className="fw-bold text-nowrap">#{item.productId}</td>

      {/* Quantity */}
      <td>
        {isEditing ? (
          <input
            type="number"
            name="quantity"
            min={1}
            className="form-control form-control-sm"
            value={formData?.quantity || 1}
            onChange={onChange}
          />
        ) : (
          <span className="text-muted">{item.quantity}</span>
        )}
      </td>

      {/* Unit Price */}
      <td>
        {isEditing ? (
          <input
            type="number"
            name="unitPrice"
            step="0.01"
            className="form-control form-control-sm"
            value={formData?.unitPrice || 0}
            onChange={onChange}
          />
        ) : (
          <span>${item.unitPrice.toFixed(2)}</span>
        )}
      </td>

      {/* Order Status */}
      <td>
        <span
          className={`badge rounded-pill bg-${
            statusMap[orderStatus ?? "Paid"] ?? "secondary"
          }`}
        >
          {orderStatus}
        </span>
      </td>

      {/* Action Buttons */}
      <td className="text-nowrap">
        {isEditing ? (
          <>
            <button
              className="btn btn-sm btn-outline-secondary me-2"
              onClick={onCancel}
            >
              ✖ Cancel
            </button>
            <button
              className="btn btn-sm btn-success"
              onClick={() => formData && onSave(formData)}
            >
              💾 Save
            </button>
          </>
        ) : (
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={onEdit}
          >
            ✏️ Edit
          </button>
        )}
      </td>
    </tr>
  );
};

export default OrderRow;

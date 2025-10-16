import React, { useState } from "react";
import type { OrderItemT } from "../../utils/types";

const statusMap: Record<string, string> = {
  Paid: "success",
  Pending: "warning text-dark",
  Overdue: "danger",
};

interface Props {
  orderId: string;
  orderStatus?: string;
  item: OrderItemT;
  isEditing: boolean;
  saving?: boolean;
  formData: OrderItemT | null;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (updatedItem: OrderItemT) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OrderRow: React.FC<Props> = ({ item, isEditing, formData, onEdit, onCancel, onSave, onChange, saving }) => {
  const [localErr, setLocalErr] = useState<string | null>(null);

  function handleSave() {
    setLocalErr(null);
    const payload = formData ?? item;
    if ((payload.quantity ?? 0) < 1) {
      setLocalErr("Quantity must be at least 1");
      return;
    }
    if ((payload.unitPrice ?? 0) < 0) {
      setLocalErr("Unit price must be >= 0");
      return;
    }
    onSave(payload);
  }

  return (
    <tr>
      <td className="fw-semibold text-nowrap">#{item.productId}</td>

      <td style={{ minWidth: 120 }}>
        {isEditing ? (
          <input
            type="number"
            name="quantity"
            min={1}
            className="form-control form-control-sm"
            value={formData?.quantity ?? item.quantity}
            onChange={onChange}
            disabled={saving}
            aria-label="Quantity"
          />
        ) : (
          <span className="text-muted">{item.quantity}</span>
        )}
      </td>

      <td style={{ minWidth: 140 }}>
        {isEditing ? (
          <input
            type="number"
            name="unitPrice"
            step="0.01"
            className="form-control form-control-sm"
            value={formData?.unitPrice ?? item.unitPrice}
            onChange={onChange}
            disabled={saving}
            aria-label="Unit price"
          />
        ) : (
          <span>${(item.unitPrice ?? 0).toFixed(2)}</span>
        )}
      </td>

      <td>
        {/*<span className={`badge bg-${statusMap[item. ?? "Paid"] ?? "secondary"}`}>{item.state ?? "Unknown"}</span>*/}
      </td>

      <td className="text-nowrap">
        {isEditing ? (
          <>
            <button className="btn btn-sm btn-outline-secondary me-2" onClick={onCancel} disabled={saving}>✖ Cancel</button>
            <button className="btn btn-sm btn-success" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "💾 Save"}</button>
            {localErr && <div className="text-danger small mt-1">{localErr}</div>}
          </>
        ) : (
          <button className="btn btn-sm btn-outline-primary" onClick={onEdit}>✏️ Edit</button>
        )}
      </td>
    </tr>
  );
};

export default OrderRow;

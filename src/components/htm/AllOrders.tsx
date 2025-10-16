// src/components/orders/AllOrders.tsx
import React, { useEffect, useState } from "react";
import { OrderItemT, OrderT } from "../../utils/types.ts";
import { baseUrl } from "../../utils/constants.ts";
import { useAppSelector } from "../../app/hooks.ts";
import { Link } from "react-router-dom";
import OrderRow from "./OrderRow";
import { useToasts } from "../ToastProvider"; // adjust path if needed

const AllOrders: React.FC = () => {
  const user = useAppSelector((state) => state.user.profile);

  // Safe usage of useToasts: if it throws (old provider that throws), fallback to noop
  let pushFn: (t: { message: string; type?: "success" | "danger" | "info" }) => void = (t) =>
    console.warn("toast fallback:", t);
  try {
    // call hook at top-level (allowed). If provider throws, we'll catch below.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const toastCtx = useToasts();
    pushFn = toastCtx.push;
  } catch (err) {
    console.warn("useToasts not available. Toasts will be no-ops until ToastProvider is mounted.", err);
  }

  const [orders, setOrders] = useState<OrderT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editIndex, setEditIndex] = useState<{ orderId: string; itemId: string | null } | null>(null);
  const [formData, setFormData] = useState<OrderItemT | null>(null);
  const [editingOrderStatus, setEditingOrderStatus] = useState<string | null>(null);

  // ──────────────── Fetch Orders ────────────────
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/ordersByUser/${user.login}`);
        if (!res.ok) throw new Error(`Failed to fetch orders (${res.status})`);
        const data: OrderT[] = await res.json();
        setOrders(data);
        if (!data || data.length === 0) {
          pushFn({ type: "info", message: "No orders found for this account." });
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setError(msg);
        pushFn({ type: "danger", message: `Error loading orders: ${msg}` });
      } finally {
        setLoading(false);
      }
    };

    if (user?.login) fetchOrders();
    else {
      setOrders([]);
      setLoading(false);
    }
  }, [user?.login]);

  // ──────────────── Edit Handlers ────────────────
  const handleEditItem = (orderId: string, item: OrderItemT) => {
    setEditIndex({ orderId, itemId: item.productId! });
    setFormData({ ...item });
    setEditingOrderStatus(null);
  };

  const handleEditStatus = (orderId: string, currentStatus: string) => {
    setEditIndex({ orderId, itemId: null });
    setFormData(null);
    setEditingOrderStatus(currentStatus);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setFormData(null);
    setEditingOrderStatus(null);
  };

  // ──────────────── Form Change ────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!formData) return;

    setFormData((prev) => {
      if (!prev) return null;
      const updated = { ...prev };

      if (name === "quantity") updated.quantity = Number(value);
      else if (name === "unitPrice") updated.unitPrice = Number(value);
      else if (name === "productName") updated.productId = value;

      return updated;
    });
  };

  // ──────────────── Save Changes ────────────────
  const handleSave = (updatedItem: OrderItemT) => {
    if (!editIndex) return;

    try {
      const updatedOrders = orders.map((order) => {
        if (order.orderId !== editIndex.orderId) return order;
        return {
          ...order,
          orderItems: order.orderItems.map((item) =>
            item.productId === editIndex.itemId ? updatedItem : item
          ),
        };
      });

      setOrders(updatedOrders);
      pushFn({ type: "success", message: "Order item updated." });
    } catch (err) {
      pushFn({ type: "danger", message: "Failed to save changes locally." });
    } finally {
      setEditIndex(null);
      setFormData(null);
    }
  };

  const handleSaveStatus = () => {
    if (!editIndex || editingOrderStatus === null) return;

    try {
      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === editIndex.orderId ? { ...o, status: editingOrderStatus } : o
        )
      );
      pushFn({ type: "success", message: "Order status updated." });
    } catch (err) {
      pushFn({ type: "danger", message: "Failed to update order status." });
    } finally {
      setEditIndex(null);
      setEditingOrderStatus(null);
    }
  };

  // ──────────────── Loading & Error States ────────────────
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Error: {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setError(null);
            }}
            aria-label="Close"
          ></button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mt-4 text-center text-muted">
        No orders found.
      </div>
    );
  }

  // ──────────────── Render Orders (Bootstrap Accordion) ────────────────
  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">All Orders</h2>

      <div className="accordion" id="accordionOrders">
        {orders.map((order) => {
          const headingId = `heading-${order.orderId}`;
          const collapseId = `collapse-${order.orderId}`;
          const isEditingStatus =
            editIndex?.orderId === order.orderId && editIndex?.itemId === null;

          return (
            <div className="accordion-item mb-3 shadow-sm" key={order.orderId}>
              <h2 className="accordion-header" id={headingId}>
                <button
                  className="accordion-button d-flex justify-content-between align-items-center"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${collapseId}`}
                  aria-expanded="false"
                  aria-controls={collapseId}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div>
                      Order #
                      <Link
                        className="text-decoration-underline text-primary ms-1"
                        to={`/order/${order.orderId}`}
                      >
                        {order.orderId}
                      </Link>
                    </div>
                    <span
                      className={`badge ${
                        order.status === "Paid"
                          ? "bg-success"
                          : order.status === "Pending"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                      }`}
                    >
                      {order.status ?? "Unknown"}
                    </span>
                  </div>

                  {/* Small chevron can be kept by the accordion-button default indicator */}
                </button>
              </h2>

              <div
                id={collapseId}
                className="accordion-collapse collapse"
                aria-labelledby={headingId}
                data-bs-parent={undefined} // allow multiple open if you prefer; set to "#accordionOrders" to make single-open behavior
              >
                {/* Edit Status */}
                {isEditingStatus && (
                  <div className="card-body bg-light">
                    <div className="d-flex align-items-center flex-wrap gap-3">
                      <span className="fw-medium">Edit status:</span>

                      <select
                        className="form-select form-select-sm w-auto"
                        value={editingOrderStatus || order.status}
                        onChange={(e) => setEditingOrderStatus(e.target.value)}
                      >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Overdue">Overdue</option>
                      </select>

                      <button
                        className="btn btn-sm btn-success"
                        onClick={handleSaveStatus}
                        disabled={editingOrderStatus === null}
                      >
                        Save
                      </button>

                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Items Table */}
                <div className="accordion-body">
                  <div className="mb-3 d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEditStatus(order.orderId!, order.status ?? "Paid")}
                      disabled={!!editIndex}
                    >
                      ✏️ Edit Status
                    </button>

                    <Link
                      to={`/orders/${order.orderId}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      🔍 View Order
                    </Link>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle mb-0">
                      <thead className="table-dark">
                      <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">State</th>
                        <th scope="col">Actions</th>
                      </tr>
                      </thead>

                      <tbody>
                      {order.orderItems.map((item) => {
                        const isEditing =
                          editIndex?.orderId === order.orderId &&
                          editIndex?.itemId === item.productId;

                        return (
                          <OrderRow
                            key={`${order.orderId}-${item.productId}`}
                            orderId={order.orderId!}
                            orderStatus={order.status}
                            item={item}
                            isEditing={isEditing}
                            formData={formData}
                            onEdit={() => handleEditItem(order.orderId!, item)}
                            onCancel={handleCancel}
                            onSave={handleSave}
                            onChange={handleChange}
                          />
                        );
                      })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllOrders;

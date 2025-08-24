import React, { useEffect, useState } from "react";
import { OrderItemT, OrderT } from "../../utils/types.ts";
import { baseUrlBlog } from "../../utils/constants.ts";
import { useAppSelector } from "../../app/hooks.ts";
import OrderRow from "./OrderRow";
import { Link } from "react-router-dom"

const AllOrders = () => {
  const [orders, setOrders] = useState<OrderT[]>([]);
  const user = useAppSelector((state) => state.user.profile);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState<{ orderId: string; itemId: string | null } | null>(null);
  const [formData, setFormData] = useState<OrderItemT | null>(null);
  const [editingOrderStatus, setEditingOrderStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${baseUrlBlog}/ordersByUser/${user.login}`);
        if (!res.ok) throw new Error(`Failed to fetch orders (${res.status})`);
        const data: OrderT[] = await res.json();
        setOrders(data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (user.login) fetchOrders();
  }, [user.login]);

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

  const handleCancel = () => {
    setEditIndex(null);
    setFormData(null);
    setEditingOrderStatus(null);
  };

  const handleSave = (updatedItem: OrderItemT) => {
    if (!editIndex) return;

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
    setEditIndex(null);
    setFormData(null);
  };

  const handleSaveStatus = () => {
    if (!editIndex || editingOrderStatus === null) return;
    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === editIndex.orderId ? { ...o, status: editingOrderStatus } : o
      )
    );
    setEditIndex(null);
    setEditingOrderStatus(null);
  };

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
            onClick={() => setError(null)}
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

  return (
    <div className="container-fluid mt-4">


      <h2 className="mb-4">All Orders</h2>
      {orders.map((order) => {
        const isEditingStatus = editIndex?.orderId === order.orderId && editIndex?.itemId === null;

        return (
          <div key={order.orderId} className="card p-4 order-card">
            <div className="order-header">
              <div className="mb-0 fw-semibold ">Order#
                <Link className="text-decoration-underline text-primary" to={'/order/'+order.orderId}> {order.orderId}</Link>
            </div>
              <span
                className={`order-status badge ${
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

            <div className="card-body">
              <div className="mb-3 d-flex flex-wrap gap-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() =>
                    handleEditStatus(order.orderId!, order.status ?? "Paid")
                  }
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

              <div className="table-responsive ">
                <table className="table table-striped table-bordered align-middle">
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

        );
      })}
    </div>
  );
};

export default AllOrders;

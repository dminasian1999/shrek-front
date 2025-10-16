import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { OrderT, OrderItemT } from "../../utils/types";
import { useAppSelector } from "../../app/hooks";
import OrderRow from "./OrderRow";
import { useToasts } from "../ToastProvider.tsx"
import { fetchOrdersByUser, updateOrderItemOnServer, updateOrderStatusOnServer } from "../../features/api/ordersApi.ts"
import SearchBar from "../SearchBar.tsx"
import ConfirmModal from "../ConfirmModal.tsx"
import Pagination from "../Pagination.tsx"

const PAGE_SIZE = 6;

type EditIndex = { orderId: string; itemId: string | null } | null;

const StatusBadge: React.FC<{ status?: string }> = ({ status }) => {
  const cls = status === "Paid" ? "success" : status === "Pending" ? "warning text-dark" : "danger";
  return <span className={`badge bg-${cls}`}>{status ?? "Unknown"}</span>;
};

export default function AllOrders2() {
  const profile = useAppSelector((s) => s.user.profile);
  const { push } = useToasts();
  const [orders, setOrders] = useState<OrderT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [page, setPage] = useState(1);

  // editing
  const [editIndex, setEditIndex] = useState<EditIndex>(null);
  const [formData, setFormData] = useState<OrderItemT | null>(null);
  const [editingOrderStatus, setEditingOrderStatus] = useState<string | null>(null);

  // per-item saving/state
  const [savingItemKey, setSavingItemKey] = useState<string | null>(null);
  const [savingStatusKey, setSavingStatusKey] = useState<string | null>(null);

  // confirm modal
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (!profile?.login) {
      setOrders([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchOrdersByUser(profile.login)
      .then((res) => setOrders(res || []))
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  }, [profile?.login]);

  // Derived: filtered + searched orders
  const filtered = useMemo(() => {
    const lowered = search.trim().toLowerCase();
    const byStatus = statusFilter === "All" ? orders : orders.filter((o) => (o.status ?? "").toLowerCase() === statusFilter.toLowerCase());
    if (!lowered) return byStatus;
    return byStatus.filter((o) => {
      if ((o.orderId ?? "").toLowerCase().includes(lowered)) return true;
      // search in items productId
      if (o.orderItems?.some((it) => (it.productId ?? "").toLowerCase().includes(lowered))) return true;
      return false;
    });
  }, [orders, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => { if (page > totalPages) setPage(1); }, [totalPages]);

  // accordion control
  function toggleAccordion(orderId: string) {
    setOpenAccordions((s) => ({ ...s, [orderId]: !s[orderId] }));
  }

  // editing handlers
  const handleEditItem = (orderId: string, item: OrderItemT) => {
    setEditIndex({ orderId, itemId: item.productId ?? null });
    setFormData({ ...item });
    setEditingOrderStatus(null);
  };

  const handleEditStatus = (orderId: string, currentStatus?: string) => {
    setEditIndex({ orderId, itemId: null });
    setEditingOrderStatus(currentStatus ?? "Paid");
    setFormData(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setFormData(null);
    setEditingOrderStatus(null);
  };

  // optimistic item save with rollback
  const handleSaveItem = async (updatedItem: OrderItemT) => {
    if (!editIndex) return;
    const orderId = editIndex.orderId;
    const itemKey = `${orderId}:${updatedItem.productId}`;
    setSavingItemKey(itemKey);

    // keep snapshot
    const snapshot = JSON.parse(JSON.stringify(orders)) as OrderT[];

    // apply optimistic
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, orderItems: o.orderItems.map((it) => (it.productId === updatedItem.productId ? updatedItem : it)) } : o))
    );

    try {
      await updateOrderItemOnServer(orderId, updatedItem);
      push({ type: "success", message: "Item saved" });
    } catch (err) {
      // rollback
      setOrders(snapshot);
      push({ type: "danger", message: `Failed to save item: ${err instanceof Error ? err.message : String(err)}` });
    } finally {
      setSavingItemKey(null);
      handleCancel();
    }
  };

  // optimistic status save with rollback
  const handleSaveStatus = async () => {
    if (!editIndex || editingOrderStatus == null) return;
    const orderId = editIndex.orderId;
    const key = `status:${orderId}`;
    setSavingStatusKey(key);

    const snapshot = JSON.parse(JSON.stringify(orders)) as OrderT[];
    setOrders((prev) => prev.map((o) => (o.orderId === orderId ? { ...o, status: editingOrderStatus } : o)));

    try {
      await updateOrderStatusOnServer(orderId, editingOrderStatus);
      push({ type: "success", message: "Order status updated" });
    } catch (err) {
      setOrders(snapshot);
      push({ type: "danger", message: `Failed to update status: ${err instanceof Error ? err.message : String(err)}` });
    } finally {
      setSavingStatusKey(null);
      handleCancel();
    }
  };

  // CSV export
  function exportCSV() {
    const rows = [["OrderId", "Status", "ProductId", "Quantity", "UnitPrice", "LineTotal"]];
    filtered.forEach((o) => {
      o.orderItems.forEach((it) => {
        rows.push([o.orderId ?? "", o.status ?? "", it.productId ?? "", String(it.quantity ?? 0), String(it.unitPrice ?? 0), String((it.quantity ?? 0) * (it.unitPrice ?? 0))]);
      });
    });
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_export_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // pagination slice
  const pageSlice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }
  if (!orders.length) {
    return <div className="container mt-4 text-muted">No orders yet.</div>;
  }

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-start mb-3">
        <div className="d-flex gap-2 w-100">
          <SearchBar value={search} onChange={setSearch} placeholder="Search order id or product id..." />
          <select className="form-select form-select-sm w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Overdue</option>
          </select>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => { setSearch(""); setStatusFilter("All"); }}>Reset</button>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-primary" onClick={exportCSV}>Export CSV</button>
          <div className="text-muted align-self-center">Showing {filtered.length} results</div>
        </div>
      </div>

      <div className="accordion" id="ordersAccordion">
        {pageSlice.map((order) => {
          const isStatusEditing = editIndex?.orderId === order.orderId && editIndex?.itemId === null;
          return (
            <div key={order.orderId} className="accordion-item mb-3 shadow-sm">
              <h2 className="accordion-header">
                <button
                  className="accordion-button d-flex justify-content-between align-items-center"
                  type="button"
                  aria-expanded={openAccordions[order.orderId]}
                  onClick={() => toggleAccordion(order.orderId!)}
                >
                  <div>
                    <div className="fw-semibold">
                      Order # <Link to={`/order/${order.orderId}`} className="ms-2 text-decoration-underline">{order.orderId}</Link>
                    </div>
                    <small className="text-muted">{order.dateCreated ? new Date(order.dateCreated as string).toLocaleDateString() : "-"}</small>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <StatusBadge status={order.status} />
                    <small className="text-muted">{order.orderItems.length} items</small>
                  </div>
                </button>
              </h2>

              {openAccordions[order.orderId!] && (
                <div className="accordion-body">
                  <div className="d-flex gap-2 mb-3">
                    <button className="btn btn-sm btn-outline-warning" onClick={() => handleEditStatus(order.orderId!, order.status)} disabled={!!editIndex}>✏️ Edit status</button>
                    <Link className="btn btn-sm btn-outline-primary" to={`/orders/${order.orderId}`}>🔍 View Order</Link>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => { window.print(); }}>🖨 Print</button>
                  </div>

                  {isStatusEditing && (
                    <div className="card card-body bg-light mb-3">
                      <div className="d-flex gap-2 align-items-center flex-wrap">
                        <label className="mb-0">Status</label>
                        <select className="form-select form-select-sm w-auto" value={editingOrderStatus ?? order.status} onChange={(e) => setEditingOrderStatus(e.target.value)}>
                          <option>Paid</option>
                          <option>Pending</option>
                          <option>Overdue</option>
                        </select>
                        <div className="ms-auto d-flex gap-2">
                          <button className="btn btn-sm btn-success" onClick={() => {
                            // confirm before saving status
                            setPendingAction(() => handleSaveStatus);
                            setConfirmVisible(true);
                          }} disabled={savingStatusKey === `status:${order.orderId}`}>{savingStatusKey === `status:${order.orderId}` ? "Saving..." : "Save"}</button>
                          <button className="btn btn-sm btn-outline-secondary" onClick={handleCancel}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle mb-0">
                      <thead className="table-dark">
                      <tr>
                        <th>Product ID</th><th>Quantity</th><th>Unit Price</th><th>State</th><th>Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {order.orderItems.map((item) => {
                        const isEditing = editIndex?.orderId === order.orderId && editIndex?.itemId === item.productId;
                        const saving = savingItemKey === `${order.orderId}:${item.productId}`;
                        return (
                          <OrderRow
                            key={`${order.orderId}-${item.productId}`}
                            orderId={order.orderId!}
                            orderStatus={order.status}
                            item={item}
                            isEditing={isEditing}
                            formData={isEditing ? formData : null}
                            onEdit={() => handleEditItem(order.orderId!, item)}
                            onCancel={handleCancel}
                            onSave={(it) => {
                              setPendingAction(() => () => handleSaveItem(it));
                              setConfirmVisible(true);
                            }}
                            onChange={(e) => {
                              const { name, value } = e.target;
                              setFormData((prev) => {
                                if (!prev) return prev;
                                return { ...prev, [name]: name === "quantity" ? Math.max(1, Number(value || 0)) : Number(value) };
                              });
                            }}
                            saving={saving}
                          />
                        );
                      })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        <small className="text-muted">Page {page} / {totalPages}</small>
      </div>

      <ConfirmModal
        show={confirmVisible}
        title="Confirm action"
        onCancel={() => { setConfirmVisible(false); setPendingAction(null); }}
        onConfirm={() => {
          setConfirmVisible(false);
          const action = pendingAction;
          setPendingAction(null);
          action && action();
        }}
      >
        <p>Are you sure? This will update the server.</p>
      </ConfirmModal>
    </div>
  );
}

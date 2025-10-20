// src/components/orders/OrderDetails.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { OrderT, ProductT } from "../../utils/types";
import { getPostById } from "../../features/api/postActions";
import { useAppSelector } from "../../app/hooks";
import { fetchOrderById } from "../../features/api/ordersApi";
import MyOrdersPage from "./MyOrdersPage.tsx"

export default function OrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState({} as OrderT);
  const [products, setProducts] = useState<Record<string, ProductT>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const profile = useAppSelector((s) => s.user.profile);

  // Helpers
  const fmt = (n: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n || 0);

  const created = useMemo(
    () => (order?.dateCreated ? new Date(order.dateCreated).toLocaleString() : "-"),
    [order?.dateCreated]
  );

  const subTotal =
    order?.orderItems?.reduce(
      (s, it) => s + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0),
      0
    ) || 0;

  const shippingRaw = (profile?.cart?.shippingPrice as number) ?? 0;
  const shipping = shippingRaw / 3.5;
  const total = subTotal + shipping;

  const statusBadge = (status?: string) => {
    if (status === "Paid") return "bg-success";
    if (status === "Pending") return "bg-warning text-dark";
    if (status === "Overdue") return "bg-danger";
    return "bg-secondary";
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (!orderId) throw new Error("No order id");
        const data = await fetchOrderById(orderId);
        setOrder(data);

        const ids = Array.from(
          new Set(data.orderItems?.map((i) => i.productId).filter(Boolean))
        );
        const entries = await Promise.all(
          ids.map(async (id) => {
            try {
              const p = await getPostById(id!);
              return [id, p] as const;
            } catch {
              return [id, null] as const;
            }
          })
        );
        const map: Record<string, ProductT> = {};
        for (const [id, p] of entries) if (p && id) map[id] = p;
        setProducts(map);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [orderId]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );

  if (error)
    return <div className="alert alert-danger mt-4">Failed to load: {error}</div>;

  if (!order?.orderId)
    return <div className="alert alert-warning mt-4">No order found.</div>;

  return (
    <div className="container-fluid my-4">
      {/* Header */}
      <div className="d-flex flex-wrap gap-3 justify-content-between align-items-start mb-3">
        <div>
          <h3 className="mb-1 d-flex align-items-center gap-2">
            Invoice
            <span className={`badge ${statusBadge(order.status)}`}>{order.status ?? "Unknown"}</span>
          </h3>
          <div className="text-muted">
            <span className="me-3">Order&nbsp;<strong>#{order.orderId}</strong></span>
            <span>Created: {created}</span>
          </div>
        </div>

        <div className="d-flex gap-2">
          <Link to={`/orders`} className="btn btn-outline-secondary btn-sm">← Back to orders</Link>
          <button className="btn btn-outline-primary btn-sm" onClick={() => window.print()}>
            🖨️ Print / Save PDF
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Left column */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              {/* Shipping & summary */}
              <div className="row">
                <div className="col-md-7 mb-4 mb-md-0">
                  <h6 className="text-uppercase text-muted mb-2">Shipping to</h6>
                  <div className="small">
                    <div className="fw-semibold">{order.userId || "-"}</div>
                    <div>{order.shippingAddress?.fullName || "-"}</div>
                    <div>{order.shippingAddress?.street || "-"}</div>
                    <div>
                      {order.shippingAddress?.city || "-"}
                      {order.shippingAddress?.state ? `, ${order.shippingAddress.state}` : ""}{" "}
                      {order.shippingAddress?.zipCode || ""}
                    </div>
                    <div>{order.shippingAddress?.country || "-"}</div>
                    <div className="mt-1">Phone: {order.shippingAddress?.phone || "-"}</div>
                  </div>
                </div>

                <div className="col-md-5">
                  <h6 className="text-uppercase text-muted mb-2">Order summary</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0 d-flex justify-content-between">
                      <span className="text-muted">Order ID</span>
                      <span className="fw-semibold">#{order.orderId}</span>
                    </li>
                    <li className="list-group-item px-0 d-flex justify-content-between">
                      <span className="text-muted">Items</span>
                      <span className="fw-semibold">{order.orderItems?.length || 0}</span>
                    </li>
                    <li className="list-group-item px-0 d-flex justify-content-between">
                      <span className="text-muted">Created</span>
                      <span className="fw-semibold">{created}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <hr className="my-4" />

              {/* Items table */}
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-light">
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col" className="text-center">Qty</th>
                    <th scope="col" className="text-end">Unit</th>
                    <th scope="col" className="text-end">Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  {order.orderItems.map((it, idx) => {
                    const p = it.productId ? products[it.productId] : undefined;
                    const img = p?.imageUrls?.[0];
                    const amount = (Number(it.unitPrice) || 0) * (Number(it.quantity) || 0);

                    return (
                      <tr key={`${it.productId}-${idx}`}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="ratio ratio-1x1 rounded border overflow-hidden"
                              style={{ width: 56 }}
                            >
                              {img ? (
                                <img
                                  src={img}
                                  alt={p?.name}
                                  style={{ objectFit: "cover" }}
                                />
                              ) : (
                                <div className="d-flex align-items-center justify-content-center bg-light text-muted small">
                                  No image
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="fw-semibold">{p?.name ?? "Unknown product"}</div>
                              <div className="small text-muted">
                                {p?.material && <span className="me-2">Material: {p.material}</span>}
                                {p?.sizeQuantities?.[0]?.size && (
                                  <span className="me-2">Size: {p.sizeQuantities[0].size}</span>
                                )}
                                {p?.color && <span>Color: {p.color}</span>}
                              </div>
                              {it.productId && (
                                <div className="small text-muted">ID: #{it.productId}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="text-center">{it.quantity}</td>
                        <td className="text-end">{fmt(Number(it.unitPrice) || 0)}</td>
                        <td className="text-end fw-semibold">{fmt(amount)}</td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>

              <div className="small text-muted mt-3">
                Notes: You can add payment references or extra details here.
              </div>
            </div>
          </div>
        </div>
        {/* Right column (totals) */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm position-lg-sticky" style={{ top: 16 }}>
            <div className="card-body">
              <h6 className="text-uppercase text-muted mb-3">Totals</h6>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>{fmt(subTotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping</span>
                <span>{fmt(shipping)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fs-5 fw-bold">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>

              <div className="mt-3">
                <span className={`badge ${statusBadge(order.status)}`}>
                  {order.status ?? "Unknown"}
                </span>
                <div className="small text-muted mt-2">Order #{order.orderId}</div>
                <div className="small text-muted">Created: {created}</div>
              </div>

              <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary" onClick={() => window.print()}>
                  Download / Print Invoice
                </button>
                <Link to={`/order/${order.orderId}`} className="btn btn-outline-secondary">
                  View All Orders
                </Link>
              </div>
            </div>
          </div>

          {/* Helpful info */}
        </div>
      </div>
    </div>
  );
}

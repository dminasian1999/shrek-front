import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { OrderT, ProductT } from "../../utils/types";
import { getPostById } from "../../features/api/postActions";
import { useAppSelector } from "../../app/hooks";
import { fetchOrderById } from "../../features/api/ordersApi.ts"

export default function OrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState({} as OrderT);
  const [products, setProducts] = useState<Record<string, ProductT>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const profile = useAppSelector((s) => s.user.profile);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (!orderId) throw new Error("No order id");
        const data = await fetchOrderById(orderId);
        setOrder(data);

        const ids = Array.from(new Set(data.orderItems?.map((i) => i.productId).filter(Boolean)));
        const entries = await Promise.all(ids.map(async (id) => {
          try { const p = await getPostById(id!); return [id, p] as const; } catch { return [id, null] as const; }
        }));
        const map: Record<string, ProductT> = {};
        for (const [id, p] of entries) if (p && id) map[id] = p;
        setProducts(map);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally { setLoading(false); }
    }
    load();
  }, [orderId]);

  if (loading) return <div className="text-center mt-5">Loading order...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;
  if (!order) return <div className="alert alert-warning mt-4">No order found.</div>;

  const subTotal = order.orderItems?.reduce((s, it) => s + (it.quantity ?? 0) * (it.unitPrice ?? 0), 0) || 0;
  const shipping = (profile?.cart?.shippingPrice as number) ?? 0;
  const total = subTotal + shipping;
  const created = order.dateCreated ? new Date(order.dateCreated ).toLocaleString() : "-";

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="mb-0">Invoice</h4>
              <small className="text-muted">ID: #{order.orderId}</small>
            </div>
            <div className="text-end">
              <small className="text-muted">Created: {created}</small>
              <div className="mt-2"><span className={`badge bg-${order.status === "Paid" ? "success" : order.status === "Pending" ? "warning text-dark" : "danger"}`}>{order.status}</span></div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-7">
              <h6>Shipping To</h6>
              <div className="small text-muted">
                <div>{order.shippingAddress?.fullName}</div>
                <div>{order.shippingAddress?.street}</div>
                <div>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</div>
                <div>{order.shippingAddress?.country}</div>
                <div>Phone: {order.shippingAddress?.phone}</div>
              </div>
            </div>
            <div className="col-md-5">
              <h6>Order Summary</h6>
              <ul className="list-unstyled small text-muted">
                <li><strong>Order ID:</strong> #{order.orderId}</li>
                <li><strong>Items:</strong> {order.orderItems.length}</li>
                <li><strong>Created:</strong> {created}</li>
              </ul>
            </div>
          </div>

          {order.orderItems.map((it, idx) => {
            const p = it.productId ? products[it.productId] : undefined;
            const img = p?.imageUrls?.[0];
            return (
              <div key={`${it.productId}-${idx}`} className="row align-items-center mb-3">
                <div className="col-md-2">
                  <div className="border rounded overflow-hidden" style={{ height: 90, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {img ? <img alt={p?.name} src={img} style={{ maxHeight: "100%", width: "100%", objectFit: "cover" }} /> : <div className="text-muted">No image</div>}
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="fw-semibold">{p?.name ?? "Unknown product"}</div>
                  <div className="small text-muted">
                    {p?.material && <span className="me-2">Material: {p.material}</span>}
                    {p?.sizeQuantities[0]?.size && <span className="me-2">Size: {p.sizeQuantities[0]?.size }</span>}
                    {p?.color && <span>Color: {p.color}</span>}
                  </div>
                </div>
                <div className="col-md-3 text-end">
                  <div className="small text-muted">Unit: ${Number(it.unitPrice ?? 0).toFixed(2)}</div>
                  <div className="small text-muted">Qty: {it.quantity}</div>
                  <div className="fw-bold">${((it.unitPrice ?? 0) * (it.quantity ?? 0)).toFixed(2)}</div>
                </div>
              </div>
            );
          })}

          <hr />

          <div className="row">
            <div className="col-md-8">
              <p className="small text-muted">Add notes or payment info here.</p>
            </div>
            <div className="col-md-4">
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between small text-muted mb-2"><span>Subtotal</span><span>${subTotal.toFixed(2)}</span></li>
                <li className="d-flex justify-content-between small text-muted mb-2"><span>Shipping</span><span>${shipping.toFixed(2)}</span></li>
                <li className="d-flex justify-content-between fw-bold fs-5"><span>Total</span><span>${total.toFixed(2)}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

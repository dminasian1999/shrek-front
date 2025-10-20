// src/components/orders/MyOrdersPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import type { OrderT } from "../../utils/types";
import { baseUrl } from "../../utils/constants";

type SortKey = "date" | "total" | "status";
type StatusFilter = "All" | "Pending" | "Paid" | "Processing" | "Shipped" | "Completed" | "Cancelled" | "Overdue" | "Failed";

const PAGE_SIZE = 10;

export default function MyOrdersPage() {
  const token = useAppSelector((s) => s.token);
  const profile = useAppSelector((s) => s.user.profile);

  const [orders, setOrders] = useState<OrderT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [sortBy, setSortBy] = useState<SortKey>("date");
  const [desc, setDesc] = useState(true);
  const [page, setPage] = useState(1);

  // Helpers
  const statusBadge = (s?: string) => {
    switch (s) {
      case "Paid":
      case "Completed":
        return "bg-success";
      case "Processing":
      case "Pending":
        return "bg-warning text-dark";
      case "Cancelled":
      case "Overdue":
      case "Failed":
        return "bg-danger";
      case "Shipped":
        return "bg-info text-dark";
      default:
        return "bg-secondary";
    }
  };
  const currencyOf = (o: any) => o?.currency || "USD";
  const fmt = (n: number, cur: string) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: cur }).format(Number.isFinite(n) ? n : 0);

  // Derive totals per order safely
  const orderTotal = (o: any) => {
    const sub = (o?.orderItems || []).reduce(
      (s: number, it: any) => s + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0),
      0
    );
    const shipping = o?.shippingPrice ?? o?.shipping?.price ?? 0;
    const tax = o?.taxTotal ?? 0;
    const discount = o?.discountTotal ?? 0;
    return Math.max(sub + shipping + tax - discount, 0);
  };

  const copy = async (text: string, label = "Copied!") => {
    try {
      await navigator.clipboard.writeText(text);
      const el = document.createElement("div");
      el.className =
        "position-fixed top-0 start-50 translate-middle-x mt-3 px-3 py-2 rounded shadow bg-dark text-white";
      el.style.zIndex = "1080";
      el.textContent = label;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    } catch {}
  };

  // Fetch orders
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        // Try a “my orders” endpoint; fall back to a query by user if needed.
        const urls = [
          `${baseUrl}/orders/my`,
          `${baseUrl}/orders/me`,
          `${baseUrl}/orders?userId=${encodeURIComponent(profile?.login || profile?.login || "")}`,
        ];
        let data: any[] | null = null;

        for (const u of urls) {
          const res = await fetch(u, {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          });
          if (res.ok) {
            data = await res.json();
            if (Array.isArray(data)) break;
          }
        }

        if (!data) throw new Error("Failed to load orders.");
        setOrders(data as OrderT[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [baseUrl, token, profile?.login, profile?.login]);

  // Filter, search, sort
  const filtered = useMemo(() => {
    let arr = [...orders];

    // Status filter
    if (status !== "All") {
      arr = arr.filter((o: any) => (o?.status || "").toLowerCase() === status.toLowerCase());
    }

    // Query over orderId, city/country, and maybe payment method
    const q = query.trim().toLowerCase();
    if (q) {
      arr = arr.filter((o: any) => {
        const hay = [
          o?.orderId,
          o?.status,
          o?.shippingAddress?.city,
          o?.shippingAddress?.country,
          o?.paymentMethod,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }

    // Sort
    arr.sort((a: any, b: any) => {
      let res = 0;
      if (sortBy === "date") {
        res = (new Date(a?.dateCreated || 0).getTime() - new Date(b?.dateCreated || 0).getTime());
      } else if (sortBy === "total") {
        res = orderTotal(a) - orderTotal(b);
      } else if (sortBy === "status") {
        res = String(a?.status || "").localeCompare(String(b?.status || ""));
      }
      return desc ? -res : res;
    });

    return arr;
  }, [orders, query, status, sortBy, desc]);

  // Pagination
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const curPage = Math.min(page, pageCount);
  const pageSlice = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);

  useEffect(() => {
    // Reset to first page on filter/search/sort change
    setPage(1);
  }, [query, status, sortBy, desc]);

  // UI states
  if (loading) {
    return (
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">My Orders</h3>
          <div className="placeholder col-2" style={{ height: 32 }} />
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="placeholder-wave">
              <div className="placeholder col-12 mb-2" style={{ height: 14 }} />
              <div className="placeholder col-11 mb-2" style={{ height: 14 }} />
              <div className="placeholder col-10 mb-2" style={{ height: 14 }} />
              <div className="placeholder col-12 mb-2" style={{ height: 14 }} />
              <div className="placeholder col-8 mb-2" style={{ height: 14 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <div>Failed to load your orders: {error}</div>
          <Link to="/" className="btn btn-sm btn-outline-light">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      {/* Header / Controls */}
      <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-3">
        <h3 className="mb-0">My Orders</h3>
        <div className="d-flex flex-wrap gap-2">
          <div className="input-group">
            <span className="input-group-text">🔎</span>
            <input
              className="form-control"
              placeholder="Search by ID, city, country, payment..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)}>
            {["All", "Pending", "Paid", "Processing", "Shipped", "Completed", "Cancelled", "Overdue", "Failed"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <div className="input-group">
            <label className="input-group-text">Sort</label>
            <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)}>
              <option value="date">Date</option>
              <option value="total">Total</option>
              <option value="status">Status</option>
            </select>
            <button className="btn btn-outline-secondary" onClick={() => setDesc((v) => !v)}>
              {desc ? "↓" : "↑"}
            </button>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <div style={{ fontSize: 48 }}>🧾</div>
            <h5 className="mt-3">No orders found</h5>
            <p className="text-muted mb-4">Try adjusting filters or search.</p>
            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      ) : (
        <>
          {/* Table (md+) */}
          <div className="d-none d-md-block">
            <div className="card border-0 shadow-sm">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                  <tr>
                    <th style={{ minWidth: 130 }}>Order</th>
                    <th>Status</th>
                    <th>Items</th>
                    <th>Created</th>
                    <th className="text-end">Total</th>
                    <th className="text-end">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {pageSlice.map((o) => {
                    const cur = currencyOf(o as any);
                    const total = orderTotal(o as any);
                    const created = o?.dateCreated ? new Date(o.dateCreated).toLocaleString() : "-";
                    return (
                      <tr key={o.orderId} className="order-row">
                        <td>
                          <div className="d-flex flex-column">
                            <div className="fw-semibold">#{o.orderId}</div>
                            <div className="small text-muted">{o?.shippingAddress?.country || "-"}</div>
                          </div>
                        </td>
                        <td><span className={`badge ${statusBadge(o.status)}`}>{o.status ?? "Unknown"}</span></td>
                        <td>{o?.orderItems?.length || 0}</td>
                        <td>{created}</td>
                        <td className="text-end fw-semibold">{fmt(total, cur)}</td>
                        <td className="text-end">
                          <div className="btn-group">
                            <Link to={`/order/${o.orderId}`} className="btn btn-sm btn-outline-primary">View</Link>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => copy(String(o.orderId), "Order ID copied")}>
                              Copy ID
                            </button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => window.print()}>
                              Print
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Cards (mobile) */}
          <div className="d-md-none vstack gap-3">
            {pageSlice.map((o) => {
              const cur = currencyOf(o as any);
              const total = orderTotal(o as any);
              const created = o?.dateCreated ? new Date(o.dateCreated).toLocaleString() : "-";
              return (
                <div key={o.orderId} className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div className="small text-muted">Order</div>
                        <div className="h5 mb-1">#{o.orderId}</div>
                        <span className={`badge ${statusBadge(o.status)}`}>{o.status ?? "Unknown"}</span>
                      </div>
                      <div className="text-end">
                        <div className="small text-muted">Total</div>
                        <div className="fw-bold">{fmt(total, cur)}</div>
                      </div>
                    </div>

                    <div className="row mt-3 small">
                      <div className="col-6">
                        <div className="text-muted">Items</div>
                        <div className="fw-semibold">{o?.orderItems?.length || 0}</div>
                      </div>
                      <div className="col-6">
                        <div className="text-muted">Created</div>
                        <div className="fw-semibold">{created}</div>
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                      <Link to={`/order/${o.orderId}`} className="btn btn-sm btn-primary flex-grow-1">View</Link>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => copy(String(o.orderId), "Order ID copied")}>
                        Copy
                      </button>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => window.print()}>
                        Print
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="small text-muted">
              Showing {(curPage - 1) * PAGE_SIZE + 1}–
              {Math.min(filtered.length, curPage * PAGE_SIZE)} of {filtered.length}
            </div>

            <nav>
              <ul className="pagination mb-0">
                <li className={`page-item ${curPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage((p) => Math.max(1, p - 1))}>
                    ‹
                  </button>
                </li>
                {Array.from({ length: pageCount }).map((_, i) => (
                  <li key={i} className={`page-item ${curPage === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${curPage === pageCount ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage((p) => Math.min(pageCount, p + 1))}>
                    ›
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}

      {/* Local styles */}
      <style>{`
        .order-row:hover { background: #fafafa; transition: background .2s ease; }
      `}</style>
    </div>
  );
}

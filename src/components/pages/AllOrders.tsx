// src/components/orders/AllOrders.tsx
import React, { useEffect, useState } from "react"
import { OrderItemT, OrderT } from "../../utils/types.ts"
import { baseUrl } from "../../utils/constants.ts"
import { useAppSelector } from "../../app/hooks.ts"
import { Link } from "react-router-dom"
import OrderRow from "../htm/OrderRow.tsx"
import { useToasts } from "../ToastProvider.tsx" // adjust path if needed

const AllOrders: React.FC = () => {
  const profile = useAppSelector(state => state.user.profile)

  // Safe toast fallback (unchanged)
  let pushFn: (t: {
    message: string
    type?: "success" | "danger" | "info"
  }) => void = t => console.warn("toast fallback:", t)
  try {
    const toastCtx = useToasts()
    // @ts-ignore
    pushFn = toastCtx.push
  } catch (err) {
    console.warn(
      "useToasts not available. Toasts will be no-ops until ToastProvider is mounted.",
      err,
    )
  }

  const [orders, setOrders] = useState<OrderT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Status editing (unchanged)
  const [editIndex, setEditIndex] = useState<{
    orderId: string
    itemId: string | null
  } | null>(null)
  const [editingOrderStatus, setEditingOrderStatus] = useState<string | null>(
    null,
  )

  // ──────────────── Fetch Orders (unchanged) ────────────────
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${baseUrl}/ordersByUser/${profile.login}`)
        if (!res.ok) throw new Error(`Failed to fetch orders (${res.status})`)
        const data: OrderT[] = await res.json()
        setOrders(data)
        if (!data || data.length === 0) {
          pushFn({ type: "info", message: "No orders found for this account." })
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error"
        setError(msg)
        pushFn({ type: "danger", message: `Error loading orders: ${msg}` })
      } finally {
        setLoading(false)
      }
    }

    if (profile?.login) fetchOrders()
    else {
      setOrders([])
      setLoading(false)
    }
  }, [profile?.login])

  // ──────────────── Status Edit Handlers (unchanged) ────────────────
  const handleEditStatus = (orderId: string, currentStatus: string) => {
    setEditIndex({ orderId, itemId: null })
    setEditingOrderStatus(currentStatus)
  }

  const handleSaveStatus = () => {
    if (!editIndex || editingOrderStatus === null) return
    try {
      setOrders(prev =>
        prev.map(o =>
          o.orderId === editIndex.orderId
            ? { ...o, status: editingOrderStatus }
            : o,
        ),
      )
      pushFn({ type: "success", message: "Order status updated." })
    } catch {
      pushFn({ type: "danger", message: "Failed to update order status." })
    } finally {
      setEditIndex(null)
      setEditingOrderStatus(null)
    }
  }

  const handleCancelStatus = () => {
    setEditIndex(null)
    setEditingOrderStatus(null)
  }

  // ──────────────── Loading & Error States (unchanged) ────────────────
  if (loading) {
    return (
      <div className="container my-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="placeholder-wave">
              <div className="placeholder col-3 mb-2" style={{ height: 20 }} />
              <div className="placeholder col-8 mb-2" style={{ height: 14 }} />
              <div className="placeholder col-6 mb-2" style={{ height: 14 }} />
              <hr />
              <div className="placeholder col-12 mb-2" style={{ height: 10 }} />
              <div className="placeholder col-10 mb-2" style={{ height: 10 }} />
              <div className="placeholder col-8 mb-2" style={{ height: 10 }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Error: {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
            aria-label="Close"
          ></button>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="container mt-4 text-center text-muted">
        No orders found.
      </div>
    )
  }

  // ──────────────── Render ────────────────
  return (
    <div className="container-fluid mt-4">
      <div className="orders-hero rounded-3 p-3 p-md-4 mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h2 className="mb-0 ">All Orders</h2>
        </div>
      </div>

      <div className="accordion" id="accordionOrders">
        {orders.map(order => {
          const headingId = `heading-${order.orderId}`
          const collapseId = `collapse-${order.orderId}`
          const isEditingStatus =
            editIndex?.orderId === order.orderId && editIndex?.itemId === null

          // Keep original total math
          const subTotal =
            order.orderItems?.reduce(
              (s, it) => s + (it.quantity ?? 0) * (it.unitPrice ?? 0),
              0,
            ) || 0
          const shipping = (profile?.cart?.shippingPrice as number) ?? 0
          const total = subTotal + shipping / 3.5

          const created = order?.dateCreated
            ? new Date(order.dateCreated).toLocaleString()
            : "-"

          return (
            <div
              className="accordion-item mb-3 shadow-sm rounded-3 overflow-hidden"
              key={order.orderId}
            >
              <h2 className="accordion-header" id={headingId}>
                <button
                  className="accordion-button d-flex justify-content-between align-items-center bg-white"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${collapseId}`}
                  aria-expanded="false"
                  aria-controls={collapseId}
                >
                  <div className="d-flex align-items-center gap-3 w-100 justify-content-between">
                    {/* Left cluster */}
                    <div className="d-flex align-items-center gap-3">
                      <div className="chip shadow-sm">
                        <span className="text-muted">Order</span>
                        <Link
                          to={`/order/${order.orderId}`}
                          className="text-decoration-none ms-2 fw-semibold"
                        >
                          #{order.orderId}
                        </Link>
                      </div>

                      <span
                        className={`badge ${
                          order.status === "Paid"
                            ? "bg-success"
                            : order.status === "Pending"
                              ? "bg-warning text-dark"
                              : order.status === "Shipped"
                                ? "bg-info text-dark"
                                : order.status === "Completed"
                                  ? "bg-success"
                                  : order.status === "Cancelled" ||
                                  order.status === "Overdue" ||
                                  order.status === "Failed"
                                    ? "bg-danger"
                                    : "bg-secondary"
                        }`}
                      >
                        {order.status ?? "Unknown"}
                      </span>

                      <div className="d-none d-sm-flex align-items-center small text-muted">
                        <span className="me-2">Created:</span> {created}
                      </div>
                    </div>

                    {/* Right cluster */}
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-none d-md-flex align-items-center small text-muted">
                        <span className="me-2">Items:</span>{" "}
                        {order.orderItems.length}
                      </div>
                      <div className="price-box">
                        <div className="small text-muted">Total</div>
                        <div className="fs-6 fw-bold">${total.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </button>
              </h2>

              <div
                id={collapseId}
                className="accordion-collapse collapse"
                aria-labelledby={headingId}
                data-bs-parent={undefined}
              >
                {/* Inline status editor (unchanged logic) */}
                {isEditingStatus && (
                  <div className="card-body bg-light border-bottom">
                    <div className="d-flex align-items-center flex-wrap gap-3">
                      <span className="fw-medium">Edit status:</span>

                      <select
                        className="form-select form-select-sm w-auto"
                        value={editingOrderStatus || order.status}
                        onChange={e => setEditingOrderStatus(e.target.value)}
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
                        onClick={handleCancelStatus}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Items + actions (simplified; removed Edit Items feature) */}
                <div className="accordion-body">
                  {/* Summary chips */}
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <div className="chip">
                      <span className="text-muted">Subtotal</span>
                      <strong className="ms-2">${subTotal.toFixed(2)}</strong>
                    </div>
                    <div className="chip">
                      <span className="text-muted">Shipping</span>
                      <strong className="ms-2">
                        ${(shipping / 3.5).toFixed(2)}
                      </strong>
                    </div>
                  </div>

                  {/* Actions (no Edit Items, no Save All/Cancel) */}
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
                      className="btn btn-sm btn-outline-secondary"
                    >
                      🔍 View Order
                    </Link>
                  </div>

                  {/* Items table (view-only) */}
                  <div className="table-responsive">
                    <table className="table align-middle mb-0">
                      <thead className="table-light">
                      <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col" className="text-center">
                          Qty
                        </th>
                        <th scope="col" className="text-end">
                          Unit Price
                        </th>
                        <th scope="col">State</th>
                        <th scope="col" className="text-end">
                          Actions
                        </th>
                      </tr>
                      </thead>

                      <tbody>
                      {order.orderItems.map(item => {
                        const productId = item.productId!
                        return (
                          <OrderRow
                            key={`${order.orderId}-${productId}`}
                            orderId={order.orderId!}
                            orderStatus={order.status}
                            item={item}
                            // Editing props removed; row is view-only
                          />
                        )
                      })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer bar inside collapse */}
                <div className="border-top bg-white px-3 py-2 d-flex justify-content-between align-items-center">
                  <div className="small text-muted">Created: {created}</div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="small">
                      <span className="text-muted me-2">Total:</span>
                      <strong>${total.toFixed(2)}</strong>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => window.print()}
                    >
                      🖨️ Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllOrders

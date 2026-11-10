import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { baseUrlBlog } from "../../utils/constants"
import type { Order } from "../../utils/types"
import { money } from "../../utils/commerce"

const OrderHistory = () => {
  const token = useAppSelector(state => state.token)
  const login = useAppSelector(state => state.user.profile.login)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [retry, setRetry] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    let active = true
    setLoading(true)
    setError("")
    if (!login || !token) {
      setLoading(false)
      return
    }
    fetch(`${baseUrlBlog}/ordersByUser/${encodeURIComponent(login)}`, {
      headers: { Authorization: token },
      signal: controller.signal,
    })
      .then(async response => {
        if (!response.ok)
          throw new Error(
            "Your order history could not be loaded. Please try again.",
          )
        const data: unknown = await response.json()
        if (!Array.isArray(data))
          throw new Error("Order history is temporarily unavailable.")
        if (active) setOrders(data)
      })
      .catch(cause => {
        if (active && !controller.signal.aborted)
          setError(
            cause instanceof Error
              ? cause.message
              : "Order history is temporarily unavailable.",
          )
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
      controller.abort()
    }
  }, [login, token, retry])
  if (!token || !login) return null
  return (
    <section className="my-5" aria-labelledby="order-history-title">
      <h2 id="order-history-title" className="h3">
        Your orders
      </h2>
      {loading ? (
        <p role="status">Loading orders…</p>
      ) : error ? (
        <>
          <p role="alert">{error}</p>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setRetry(value => value + 1)}
          >
            Retry order history
          </button>
        </>
      ) : !orders.length ? (
        <p>You haven’t placed an order yet.</p>
      ) : (
        <div className="d-grid gap-3">
          {orders.map(order => (
            <details className="border rounded p-3" key={order.orderId}>
              <summary>
                <span className="me-3">Order {order.orderId}</span>{" "}
                <span className="me-3 text-capitalize">
                  {order.status === "PENDING"
                    ? "Awaiting payment"
                    : order.status.toLowerCase()}
                </span>{" "}
                <strong>
                  {money(order.totalAmount || 0, order.currencyCode || "USD")}
                </strong>
              </summary>
              <p className="small text-muted mt-3">
                {order.dateCreated
                  ? new Date(order.dateCreated).toLocaleDateString()
                  : ""}
              </p>
              <ul>
                {order.orderItems?.map((item, index) => (
                  <li key={item.cartItemId || `${item.productId}:${index}`}>
                    {item.product?.name || "Item"}
                    {item.selectedSize ? ` (${item.selectedSize})` : ""} ×{" "}
                    {item.quantity} —{" "}
                    {money(
                      item.unitPrice * item.quantity,
                      order.currencyCode || "USD",
                    )}
                  </li>
                ))}
              </ul>
              {order.status === "PENDING" && (
                <p>
                  <Link
                    className="btn btn-outline-secondary"
                    to={`/checkout?order=${encodeURIComponent(order.orderId)}`}
                  >
                    Complete payment
                  </Link>
                </p>
              )}
              <p className="mb-0">
                Shipping:{" "}
                {money(order.shippingCost || 0, order.currencyCode || "USD")}
              </p>
            </details>
          ))}
        </div>
      )}
    </section>
  )
}
export default OrderHistory

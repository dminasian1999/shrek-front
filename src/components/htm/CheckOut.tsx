import { useEffect, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { baseUrlBlog } from "../../utils/constants"
import {
  cartSubtotal,
  commerceRequest,
  completeAddress,
  money,
  validCheckoutOrder,
} from "../../utils/commerce"
import type { CheckoutOrder } from "../../utils/commerce"
import Address from "./Address"
import PayPalCheckout from "../../paymant/PayPalCheckout"

const CheckOut = () => {
  const [searchParams] = useSearchParams()
  const resumeId = searchParams.get("order")
  const [resuming, setResuming] = useState(Boolean(resumeId))
  const [resumeError, setResumeError] = useState("")
  const token = useAppSelector(state => state.token)
  const { profile, loading } = useAppSelector(state => state.user)
  const items = profile.cart?.items ?? []
  const [order, setOrder] = useState<CheckoutOrder | null>(null)
  const [paidOrder, setPaidOrder] = useState<CheckoutOrder | null>(null)
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const submitting = useRef(false)
  const [confirmed, setConfirmed] = useState(false)
  const fingerprint = JSON.stringify([profile.address, items])
  const latestFingerprint = useRef(fingerprint)
  latestFingerprint.current = fingerprint
  useEffect(() => {
    if (resumeId) return
    setOrder(null)
    setConfirmed(false)
    setError("")
  }, [fingerprint, resumeId])

  useEffect(() => {
    if (!resumeId || !token) return
    const controller = new AbortController()
    let active = true
    setResuming(true)
    setResumeError("")
    fetch(`${baseUrlBlog}/order/${encodeURIComponent(resumeId)}`, {
      headers: { Authorization: token },
      signal: controller.signal,
    })
      .then(async response => {
        if (!response.ok)
          throw new Error(
            "This order could not be loaded. Open your account to review your orders.",
          )
        const saved = (await response.json()) as CheckoutOrder
        if (
          !validCheckoutOrder(saved) ||
          !completeAddress(saved.shippingAddress)
        )
          throw new Error(
            "This order needs assistance from the shop before payment.",
          )
        if (!active) return
        if (saved.status === "PAID") setPaidOrder(saved)
        else if (saved.status === "PENDING") setOrder(saved)
        else
          throw new Error(
            "This order has already been processed. Review its status in your account.",
          )
      })
      .catch(cause => {
        if (active && !controller.signal.aborted)
          setResumeError(
            cause instanceof Error
              ? cause.message
              : "Unable to load this order.",
          )
      })
      .finally(() => {
        if (active) setResuming(false)
      })
    return () => {
      active = false
      controller.abort()
    }
  }, [resumeId, token])

  const prepare = async () => {
    if (
      submitting.current ||
      !completeAddress(profile.address) ||
      !items.length
    )
      return
    submitting.current = true
    setBusy(true)
    setError("")
    try {
      const result = await commerceRequest<CheckoutOrder>(
        `${baseUrlBlog}/checkOut`,
        token,
        { shippingAddress: profile.address, paymentMethod: "PAYPAL" },
      )
      if (!validCheckoutOrder(result) || result.status !== "PENDING")
        throw new Error(
          "The order total could not be confirmed. Please try again.",
        )
      if (latestFingerprint.current === fingerprint) setOrder(result)
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Checkout is unavailable. Please try again.",
      )
    } finally {
      submitting.current = false
      setBusy(false)
    }
  }

  if (paidOrder)
    return (
      <div className="container py-5">
        <h1>Thank you for your order</h1>
        <p role="status">
          Payment confirmed. Your order number is{" "}
          <strong>{paidOrder.orderId}</strong>.
        </p>
        <Link className="btn" to="/account">
          View your account
        </Link>{" "}
        <Link to="/shop" className="btn btn-outline-secondary">
          Continue shopping
        </Link>
      </div>
    )
  if (!token)
    return (
      <div className="container py-5">
        <h1>Checkout</h1>
        <p>Sign in to check out with your saved cart.</p>
        <Link to="/login" className="btn">
          Sign in
        </Link>
      </div>
    )
  if (resumeId && resuming)
    return (
      <div className="container py-5">
        <p role="status">Loading your order…</p>
      </div>
    )
  if (resumeId && resumeError)
    return (
      <div className="container py-5">
        <h1>Order unavailable</h1>
        <p role="alert">{resumeError}</p>
        <Link className="btn" to="/account">
          View your orders
        </Link>
      </div>
    )
  if (!items.length && !order)
    return (
      <div className="container py-5">
        <h1>Your cart is empty</h1>
        <p>Add something to your cart before checking out.</p>
        <Link to="/shop" className="btn">
          Explore the shop
        </Link>
      </div>
    )

  return (
    <div className="container py-4 py-md-5">
      <Link to="/cart">← Back to cart</Link>
      <h1 className="my-4">Checkout</h1>
      <div className="row g-4">
        <div className="col-lg-7">
          {resumeId && order?.shippingAddress ? (
            <section className="border rounded p-4">
              <h2 className="h4">Delivery address</h2>
              <address>
                {order.shippingAddress.fullName}
                <br />
                {order.shippingAddress.street}
                <br />
                {order.shippingAddress.city}
                {order.shippingAddress.state
                  ? `, ${order.shippingAddress.state}`
                  : ""}{" "}
                {order.shippingAddress.zipCode}
                <br />
                {order.shippingAddress.country}
                <br />
                {order.shippingAddress.phone}
              </address>
              <p className="small text-muted mb-0">
                This address was saved with your order. Contact the shop if it
                needs to change before paying.
              </p>
            </section>
          ) : (
            <Address />
          )}
        </div>
        <div className="col-lg-5">
          <section className="border rounded p-3 p-md-4">
            <h2 className="h4">Your order</h2>
            <ul className="list-unstyled my-4">
              {(order
                ? order.orderItems.map(item => ({
                    key:
                      item.cartItemId ||
                      `${item.productId}:${item.selectedSize || ""}`,
                    name:
                      item.product?.name ||
                      items.find(entry => entry.product.id === item.productId)
                        ?.product.name ||
                      "Item",
                    selectedSize: item.selectedSize,
                    quantity: item.quantity,
                    total: item.unitPrice * item.quantity,
                  }))
                : items.map(item => ({
                    key: item.cartItemId,
                    name: item.product.name,
                    selectedSize: item.selectedSize,
                    quantity: item.quantity,
                    total: item.product.price * item.quantity,
                  }))
              ).map(item => (
                <li
                  className="d-flex justify-content-between gap-3 border-bottom py-2"
                  key={item.key}
                >
                  <span>
                    {item.name}
                    {item.selectedSize ? ` (${item.selectedSize})` : ""} ×{" "}
                    {item.quantity}
                  </span>
                  <span className="text-nowrap">
                    {money(item.total, order?.currencyCode)}
                  </span>
                </li>
              ))}
            </ul>
            {order ? (
              <>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>{money(order.shippingCost, order.currencyCode)}</span>
                </div>
                <div className="d-flex justify-content-between fs-5 fw-semibold mb-3">
                  <span>Total</span>
                  <span>{money(order.totalAmount, order.currencyCode)}</span>
                </div>
                <p className="small text-muted">
                  Total confirmed by the shop, including delivery. Order
                  reference: {order.orderId}.
                </p>
                <div className="form-check my-3">
                  <input
                    id="confirm-order"
                    className="form-check-input"
                    type="checkbox"
                    checked={confirmed}
                    onChange={event => setConfirmed(event.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="confirm-order">
                    I have checked my delivery address and order total.
                  </label>
                </div>
                <PayPalCheckout
                  order={order}
                  disabled={!confirmed || loading}
                  onPaid={setPaidOrder}
                />
              </>
            ) : (
              <>
                <div className="d-flex justify-content-between mb-3">
                  <span>Items subtotal</span>
                  <strong>{money(cartSubtotal(items))}</strong>
                </div>
                <p className="small text-muted">
                  Save your delivery address, then review the final total
                  including shipping before payment.
                </p>
                <button
                  className="btn w-100"
                  type="button"
                  disabled={
                    busy || loading || !completeAddress(profile.address)
                  }
                  onClick={() => void prepare()}
                >
                  {busy ? "Calculating total…" : "Review total and payment"}
                </button>
              </>
            )}
            {error && (
              <p role="alert" className="text-danger mt-3">
                {error}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
export default CheckOut

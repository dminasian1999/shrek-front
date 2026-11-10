import { useRef, useState } from "react"
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { fetchUser } from "../features/api/accountActions"
import { baseUrlBlog } from "../utils/constants"
import { commerceRequest } from "../utils/commerce"
import type { CheckoutOrder } from "../utils/commerce"

interface PayPalCheckoutProps {
  order: CheckoutOrder
  disabled?: boolean
  onPaid: (order: CheckoutOrder) => void
}

const PaymentSdkStatus = () => {
  const [{ isPending, isRejected }] = usePayPalScriptReducer()
  if (isPending) return <p role="status">Loading secure payment…</p>
  if (isRejected)
    return (
      <p role="alert">
        PayPal could not be loaded. Reload this page to try again, or contact
        the shop for help.
      </p>
    )
  return null
}

export default function PayPalCheckout({
  order,
  disabled = false,
  onPaid,
}: PayPalCheckoutProps) {
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.token)
  const [error, setError] = useState("")
  const [capturing, setCapturing] = useState(false)
  const captureStarted = useRef(false)
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID as string | undefined
  if (!clientId)
    return (
      <p role="status">
        Online payment is currently unavailable. Please contact the shop for
        help with your order.
      </p>
    )

  return (
    <div>
      {error && (
        <p role="alert" className="text-danger">
          {error}
        </p>
      )}
      {capturing && (
        <p role="status">
          Confirming your payment. Please keep this page open…
        </p>
      )}
      <PayPalScriptProvider
        options={{ clientId, currency: order.currencyCode, intent: "capture" }}
      >
        <PaymentSdkStatus />
        <PayPalButtons
          style={{ layout: "vertical" }}
          disabled={disabled || capturing}
          forceReRender={[order.orderId, disabled]}
          createOrder={async () => {
            setError("")
            try {
              const result = await commerceRequest<{ orderId: string }>(
                `${baseUrlBlog}/api/paypal/orders`,
                token,
                { orderId: order.orderId },
              )
              if (!result.orderId)
                throw new Error(
                  "Payment could not be started. Please try again.",
                )
              return result.orderId
            } catch (cause) {
              setError(
                cause instanceof Error
                  ? cause.message
                  : "Payment could not be started.",
              )
              throw cause
            }
          }}
          onApprove={async data => {
            if (captureStarted.current) return
            captureStarted.current = true
            setCapturing(true)
            setError("")
            try {
              const paid = await commerceRequest<CheckoutOrder>(
                `${baseUrlBlog}/api/paypal/orders/${encodeURIComponent(data.orderID)}/capture`,
                token,
                {},
              )
              if (paid.status !== "PAID")
                throw new Error(
                  "Payment has not been confirmed. Please contact the shop before retrying.",
                )
              onPaid(paid)
              void dispatch(fetchUser(token))
            } catch (cause) {
              setError(
                cause instanceof Error
                  ? cause.message
                  : "Payment confirmation failed. Please contact the shop before retrying.",
              )
            } finally {
              captureStarted.current = false
              setCapturing(false)
            }
          }}
          onCancel={() =>
            setError(
              "Payment cancelled. Your cart is saved and you can try again when ready.",
            )
          }
          onError={() =>
            setError(
              previous =>
                previous ||
                "PayPal could not be loaded. Please try again or contact the shop.",
            )
          }
        />
      </PayPalScriptProvider>
    </div>
  )
}

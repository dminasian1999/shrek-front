// src/components/PayPalCheckout.tsx
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { baseUrl } from "../utils/constants.ts"
import { useAppSelector } from "../app/hooks.ts"

type Props = {
  amount: string // e.g. "49.99"
  currency?: "USD" | "EUR" | "ILS"
  referenceId?: string // your internal order id
}

export default function PayPalCheckout2({
                                          amount,
                                          currency = "USD",
                                          referenceId
                                        }: Props) {

    const  token = useAppSelector(state => state.token)
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AVZSRuyu6Goh94yBqag6okxD1DLF7eCNEFnwwg-UlHstWc60BHmB7PQ5e742KLsKgSPimpzpyhM7wxEQ",
        currency: "USD",
        intent: "capture"
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        // 1) Ask your backend to create a trusted order
        createOrder={async () => {
          const res = await fetch(baseUrl + "/api/paypal/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // "Authorization": "AVZSRuyu6Goh94yBqag6okxD1DLF7eCNEFnwwg-UlHstWc60BHmB7PQ5e742KLsKgSPimpzpyhM7wxEQ"
            },
            body: JSON.stringify({
              value: amount,
              currencyCode: currency,
              referenceId,
              returnUrl: window.location.origin + "/checkout/success",
              cancelUrl: window.location.origin + "/checkout/cancel"
            })
          })
          const data = await res.json()
          return data.orderId // return server order id to PayPal SDK
        }}
        // 2) After approval, call your backend to CAPTURE
        onApprove={async data => {
          if (!data.orderID) return
          const res = await fetch(
            baseUrl + `/api/paypal/orders/${data.orderID}/capture`
            // { method: "POST" },
          )
          const capture = await res.json()
          // TODO: route to "thank you", update UI, etc.
          console.log("Capture result:", capture)
        }}
        onCancel={() => {
          // optional UX for cancel
        }}
        onError={err => {
          console.error(err)
          // show toast/error
        }}
      />
    </PayPalScriptProvider>
  )
}

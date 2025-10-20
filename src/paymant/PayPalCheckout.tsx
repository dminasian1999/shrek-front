import React from "react"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"

interface PayPalCheckoutProps {
  amount: string
}

export default function PayPalCheckout({ amount }: PayPalCheckoutProps) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AVZSRuyu6Goh94yBqag6okxD1DLF7eCNEFnwwg-UlHstWc60BHmB7PQ5e742KLsKgSPimpzpyhM7wxEQ",
        currency: "USD",
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(_, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
            intent: "CAPTURE",
          })
        }}
        onApprove={async (_, actions) => {
          const details = await actions.order!.capture()
          const name = details.payer?.name?.given_name
          alert(`Payment completed by ${name}`)
          // TODO: send details.id (PayPal order ID) to your backend for verification
        }}
        onError={err => {
          console.error("PayPal error:", err)
          alert("An error occurred during PayPal checkout.")
        }}
      />
    </PayPalScriptProvider>
  )
}

import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalCheckoutProps {
  amount: string;
}

export default function PayPalCheckout({ amount }: PayPalCheckoutProps) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: "AVZSRuyu6Goh94yBqag6okxD1DLF7eCNEFnwwg-UlHstWc60BHmB7PQ5e742KLsKgSPimpzpyhM7wxEQ",
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(_, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={async (_, actions) => {
          const details = await actions.order!.capture();
          alert("Payment completed by " + details.payer?.name?.given_name);
          // TODO: Notify your backend the payment is complete
          // TODO: Clear cart and redirect user
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          alert("An error occurred with PayPal checkout.");
        }}
      />
    </PayPalScriptProvider>
  );
}

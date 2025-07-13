import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalCheckout() {
  return (
    <PayPalScriptProvider
      options={{
        clientId: "AVZSRuyu6Goh94yBqag6okxD1DLF7eCNEFnwwg-UlHstWc60BHmB7PQ5e742KLsKgSPimpzpyhM7wxEQ", // ✅ camelCase
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
                  value: "10.00",
                },
              },
            ],
          });
        }}
        onApprove={(_, actions) => {
          return actions.order!.capture().then((details) => {
            alert("Payment completed by " + details.payer?.name?.given_name);
            // TODO: Notify your backend the payment is complete
          });
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          alert("An error occurred with PayPal checkout.");
        }}
      />
    </PayPalScriptProvider>
  );
}

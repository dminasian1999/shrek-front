// central place for order-related HTTP calls

import { baseUrl } from "../../utils/constants"
import { OrderItemT, OrderT } from "../../utils/types.ts"

const jsonOpts = (body: any) => ({
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

export async function fetchOrdersByUser(login: string): Promise<OrderT[]> {
  const res = await fetch(
    `${baseUrl}/ordersByUser/${encodeURIComponent(login)}`,
  )
  if (!res.ok) throw new Error(`Failed to fetch orders (${res.status})`)
  return res.json()
}

export async function fetchOrderById(orderId: string): Promise<OrderT> {
  const res = await fetch(`${baseUrl}/order/${encodeURIComponent(orderId)}`)
  if (!res.ok) throw new Error(`Failed to fetch order ${orderId}`)
  return res.json()
}

// Update item inside order - adjust endpoint to match your backend
export async function updateOrderItemOnServer(
  orderId: string,
  item: OrderItemT,
) {
  // Example endpoint: PUT /orders/{orderId}/items/{productId}
  const url = `${baseUrl}/orders/${encodeURIComponent(orderId)}/items/${encodeURIComponent(item.productId ?? "")}`
  const res = await fetch(url, jsonOpts(item))
  if (!res.ok) throw new Error(`Failed to update item (${res.status})`)
  return res.json()
}

// Update order status on server
export async function updateOrderStatusOnServer(
  orderId: string,
  status: string,
) {
  const url = `${baseUrl}/orders/${encodeURIComponent(orderId)}/status`
  const res = await fetch(url, jsonOpts({ status }))
  if (!res.ok) throw new Error(`Failed to update status (${res.status})`)
  return res.json()
}
// server/paypal.ts (Node 18+ with fetch)

// const PAYPAL_BASE = process.env.PAYPAL_ENV === "live"
//   ? "https://api-m.paypal.com"
//   : "https://api-m.sandbox.paypal.com";

// async function getAccessToken() {
//   const clientId = process.env.PAYPAL_CLIENT_ID!;
//   const secret   = process.env.PAYPAL_CLIENT_SECRET!;
//
//   const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
//     method: "POST",
//     headers: {
//       "Authorization": "Basic " + Buffer.from(`${clientId}:${secret}`).toString("base64"),
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: "grant_type=client_credentials",
//   });
//   if (!res.ok) throw new Error(`PayPal auth failed (${res.status})`);
//   const data = await res.json();
//   return data.access_token as string;
// }

// POST /api/paypal/orders


// export async function createOrder(orderId: string, status: string) {
//   const url = `${baseUrl}/v2/checkout/orders`
//   const ppReqId = orderId
//   const idd =
//     "AVZSRuyu6Goh94yBqag6okxD1DLF7eCNEFnwwg-UlHstWc60BHmB7PQ5e742KLsKgSPimpzpyhM7wxEQ"
//   const secidd =
//     "EA2jU_OMm51TwqOLsKlmVXS4aZBd3FQUvYVb10ZEXPEpQHvjqrhLoRRr8GBkyW33jbmYN307Yaia9NxA"
//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer " + idd+ ":" + secidd
//     },
//     body:JSON.stringify({
//       intent: "CAPTURE",
//       payment_source: {
//         "paypal": {
//           "experience_context": {
//             "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
//             "landing_page": "LOGIN",
//             "shipping_preference": "GET_FROM_FILE",
//             "user_action": "PAY_NOW",
//             "return_url": "https://example.com/returnUrl",
//             "cancel_url": "https://example.com/cancelUrl"
//           }
//         }
//       },
//       purchase_units: [
//         {
//           invoice_id: "90210",
//           amount: {
//             currency_code: "USD",
//             value: "230.00",
//             breakdown: {
//               "item_total": {
//                 "currency_code": "USD",
//                 "value": "220.00"
//               },
//               "shipping": {
//                 "currency_code": "USD",
//                 "value": "10.00"
//               }
//             }
//           },
//           "items": [
//             {
//               "name": "T-Shirt",
//               "description": "Super Fresh Shirt",
//               "unit_amount": {
//                 "currency_code": "USD",
//                 "value": "20.00"
//               },
//               "quantity": "1",
//               "category": "PHYSICAL_GOODS",
//               "sku": "sku01",
//               "image_url": "https://example.com/static/images/items/1/tshirt_green.jpg",
//               "url": "https://example.com/url-to-the-item-being-purchased-1",
//               "upc": {
//                 "type": "UPC-A",
//                 "code": "123456789012"
//               }
//             },
//             {
//               "name": "Shoes",
//               "description": "Running, Size 10.5",
//               "sku": "sku02",
//               "unit_amount": {
//                 "currency_code": "USD",
//                 "value": "100.00"
//               },
//               "quantity": "2",
//               "category": "PHYSICAL_GOODS",
//               "image_url": "https://example.com/static/images/items/1/shoes_running.jpg",
//               "url": "https://example.com/url-to-the-item-being-purchased-2",
//               "upc": {
//                 "type": "UPC-A",
//                 "code": "987654321012"
//               }
//             }
//           ]
//         }
//       ]
//     }),
//   }) // Assuming 'status' is part of the initial order creation.
//   if (!res.ok) throw new Error(`Failed to create order (${res.status})`)
//   return res.json() // This might return the created order or a confirmation.
// }
// client/src/api/paypal.ts
// export async function createOrder() {
//   const res = await fetch("/api/paypal/orders", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     // send cart if you need server-side pricing:
//     body: JSON.stringify({
//       cart: [
//         { name: "T-Shirt", sku: "sku01", price: 20.0, qty: 1 },
//         { name: "Shoes", sku: "sku02", price: 100.0, qty: 2 },
//       ],
//     }),
//   });
//   if (!res.ok) throw new Error(`Failed to create order (${res.status})`);
//   const data = await res.json(); // { id: string, ... }
//   return data.id;
// }

export async function captureOrder(orderID: string) {
  const res = await fetch(`/api/paypal/orders/${orderID}/capture`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Failed to capture (${res.status})`);
  return res.json();
}

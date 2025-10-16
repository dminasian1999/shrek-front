// central place for order-related HTTP calls

import { baseUrl } from "../../utils/constants";
import { OrderItemT, OrderT } from "../../utils/types.ts"

const jsonOpts = (body: any) => ({
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export async function fetchOrdersByUser(login: string): Promise<OrderT[]> {
  const res = await fetch(`${baseUrl}/ordersByUser/${encodeURIComponent(login)}`);
  if (!res.ok) throw new Error(`Failed to fetch orders (${res.status})`);
  return res.json();
}

export async function fetchOrderById(orderId: string): Promise<OrderT> {
  const res = await fetch(`${baseUrl}/order/${encodeURIComponent(orderId)}`);
  if (!res.ok) throw new Error(`Failed to fetch order ${orderId}`);
  return res.json();
}

// Update item inside order - adjust endpoint to match your backend
export async function updateOrderItemOnServer(orderId: string, item: OrderItemT) {
  // Example endpoint: PUT /orders/{orderId}/items/{productId}
  const url = `${baseUrl}/orders/${encodeURIComponent(orderId)}/items/${encodeURIComponent(item.productId ?? "")}`;
  const res = await fetch(url, jsonOpts(item));
  if (!res.ok) throw new Error(`Failed to update item (${res.status})`);
  return res.json();
}

// Update order status on server
export async function updateOrderStatusOnServer(orderId: string, status: string) {
  const url = `${baseUrl}/orders/${encodeURIComponent(orderId)}/status`;
  const res = await fetch(url, jsonOpts({ status }));
  if (!res.ok) throw new Error(`Failed to update status (${res.status})`);
  return res.json();
}

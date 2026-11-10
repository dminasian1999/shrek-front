import type { AddressT, CartItem, ProductT } from "./types"
import { responseError } from "./http"

export interface CheckoutOrder {
  orderId: string
  status: string
  orderItems: {
    productId: string
    cartItemId?: string
    selectedSize?: string
    product?: ProductT
    quantity: number
    unitPrice: number
  }[]
  totalAmount: number
  shippingCost: number
  currencyCode: string
  shippingAddress?: AddressT
}

export const money = (amount: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)

export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity * item.product.price, 0)

export const completeAddress = (address?: AddressT) =>
  Boolean(
    address &&
      [
        address.fullName,
        address.street,
        address.city,
        address.zipCode,
        address.country,
        address.phone,
      ].every(value => value?.trim()),
  )

export async function commerceRequest<T>(
  url: string,
  token: string,
  body: unknown,
): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(body),
  })
  if (!response.ok)
    throw await responseError(
      response,
      "The request could not be completed. Please try again.",
    )
  return response.json() as Promise<T>
}

export const productStock = (product: ProductT, selectedSize?: string) =>
  product.sizeQuantities?.length
    ? product.sizeQuantities
        .filter(variant => !selectedSize || variant.size === selectedSize)
        .reduce((sum, variant) => sum + variant.quantity, 0)
    : (product.quantity ?? 0)

export const validCheckoutOrder = (order: CheckoutOrder) =>
  Boolean(
    order?.orderId &&
      Array.isArray(order.orderItems) &&
      order.orderItems.length &&
      Number.isFinite(order.totalAmount) &&
      order.totalAmount > 0 &&
      Number.isFinite(order.shippingCost) &&
      order.shippingCost >= 0 &&
      typeof order.currencyCode === "string" &&
      /^[A-Z]{3}$/.test(order.currencyCode),
  )

export const commerceError = (cause: unknown, fallback: string) => {
  if (
    cause &&
    typeof cause === "object" &&
    "message" in cause &&
    typeof cause.message === "string" &&
    cause.message.length < 300
  )
    return cause.message
  return fallback
}

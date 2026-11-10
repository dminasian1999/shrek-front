// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest"
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom"
import userReducer from "../../features/slices/userSlice"
import tokenReducer from "../../features/slices/tokenSlice"
import type { UserProfile } from "../../utils/types"
import CartPage from "./CartPage"
import CheckOut from "./CheckOut"
import Address from "./Address"
import ProductPage from "./ProductPage"
import PayPalCheckout from "../../paymant/PayPalCheckout"
import type { CheckoutOrder } from "../../utils/commerce"

const sdk = vi.hoisted(() => ({
  props: {} as Record<string, unknown>,
  rejected: false,
}))
vi.mock("@paypal/react-paypal-js", () => ({
  usePayPalScriptReducer: () => [
    { isPending: false, isRejected: sdk.rejected },
  ],
  PayPalScriptProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  PayPalButtons: (props: Record<string, unknown>) => {
    sdk.props = props
    return <div data-testid="paypal-buttons" />
  },
}))
const address = {
  fullName: "Test Buyer",
  street: "10 Test Street",
  city: "Test City",
  state: "",
  zipCode: "12345",
  country: "Israel",
  phone: "+972501234567",
}
const product = {
  id: "p1",
  name: "Armenian ceramic plate",
  imageUrls: [],
  quantity: 0,
  sizeQuantities: [
    { size: "Small", quantity: 0 },
    { size: "Large", quantity: 3 },
  ],
  price: 20,
  category: "ceramics",
  color: "blue",
  material: "clay",
  desc: "Hand-painted plate",
}
const profile: UserProfile = {
  login: "test@example.com",
  firstName: "Test",
  lastName: "Buyer",
  roles: ["USER"],
  address,
  cart: {
    userId: "test@example.com",
    totalPrice: 1,
    items: [
      { cartItemId: "p1:Large", selectedSize: "Large", product, quantity: 2 },
    ],
  },
}
const order: CheckoutOrder = {
  orderId: "local-order",
  status: "PENDING",
  orderItems: [{ productId: "p1", unitPrice: 20, quantity: 2 }],
  totalAmount: 47.5,
  shippingCost: 7.5,
  currencyCode: "USD",
}
const response = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  })
const show = (
  ui: React.ReactElement,
  authenticated = true,
  user = profile,
  route = "/",
) => {
  const store = configureStore({
    reducer: { user: userReducer, token: tokenReducer },
    preloadedState: {
      user: {
        profile: authenticated ? user : ({} as UserProfile),
        loading: false,
        errorMessage: null,
      },
      token: authenticated ? "Basic test-token" : "",
    },
  })
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
  )
}
afterEach(() => {
  sdk.rejected = false
  cleanup()
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe("commerce regression checks", () => {
  it("renders the cart for a guest without accessing a missing cart", () => {
    show(<CartPage />, false)
    expect(screen.getByRole("link", { name: "Sign in" })).toBeTruthy()
    expect(screen.queryByRole("table")).toBeNull()
  })
  it("uses real cart lines and server-confirmed totals without sending browser prices", async () => {
    const request = vi.fn().mockResolvedValue(response(order))
    vi.stubGlobal("fetch", request)
    show(<CheckOut />)
    expect(screen.getByText("Armenian ceramic plate (Large) × 2")).toBeTruthy()
    expect(screen.getAllByText("$40.00").length).toBeGreaterThan(0)
    expect(screen.queryByLabelText(/card number/i)).toBeNull()
    fireEvent.click(
      screen.getByRole("button", { name: "Review total and payment" }),
    )
    await screen.findByText("$47.50")
    expect(JSON.parse(request.mock.calls[0][1].body)).toEqual({
      shippingAddress: address,
      paymentMethod: "PAYPAL",
    })
    expect(screen.getByText("$7.50")).toBeTruthy()
  })
  it("shows checkout failure and allows a retry without entering payment", async () => {
    const request = vi
      .fn()
      .mockResolvedValueOnce(
        response({ message: "Shipping is unavailable for this country." }, 422),
      )
      .mockResolvedValueOnce(response(order))
    vi.stubGlobal("fetch", request)
    show(<CheckOut />)
    fireEvent.click(
      screen.getByRole("button", { name: "Review total and payment" }),
    )
    await screen.findByRole("alert")
    expect(screen.queryByTestId("paypal-buttons")).toBeNull()
    fireEvent.click(
      screen.getByRole("button", { name: "Review total and payment" }),
    )
    await screen.findByText("$47.50")
    expect(request).toHaveBeenCalledTimes(2)
  })
  it("keeps delivery fields editable if saving the address fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          response({ message: "Address service unavailable" }, 503),
        ),
    )
    show(<Address />)
    fireEvent.click(screen.getByRole("button", { name: "Edit address" }))
    fireEvent.click(
      screen.getByRole("button", { name: "Save delivery address" }),
    )
    await screen.findByRole("alert")
    expect(screen.getByLabelText("Full name *")).toBeTruthy()
    expect(screen.queryByText("Delivery address saved.")).toBeNull()
  })
  it("supports variant-only stock and submits the selected option", async () => {
    const request = vi
      .fn()
      .mockResolvedValueOnce(response(product))
      .mockResolvedValueOnce(response(profile))
    vi.stubGlobal("fetch", request)
    show(
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>,
      true,
      profile,
      "/product/p1",
    )
    await screen.findByRole("heading", { name: product.name })
    expect(
      (screen.getByLabelText("Size / option") as HTMLSelectElement).value,
    ).toBe("Large")
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }))
    await screen.findByRole("status")
    expect(JSON.parse(request.mock.calls[1][1].body).selectedSize).toBe("Large")
  })
  it("creates and captures payment through the authenticated backend before showing success", async () => {
    vi.stubEnv("VITE_PAYPAL_CLIENT_ID", "sandbox-test")
    const request = vi
      .fn()
      .mockResolvedValueOnce(response({ orderId: "paypal-order" }))
      .mockResolvedValueOnce(response({ ...order, status: "PAID" }))
      .mockResolvedValueOnce(response(profile))
    vi.stubGlobal("fetch", request)
    const onPaid = vi.fn()
    show(<PayPalCheckout order={order} onPaid={onPaid} />)
    const create = sdk.props.createOrder as () => Promise<string>
    const approve = sdk.props.onApprove as (data: {
      orderID: string
    }) => Promise<void>
    expect(await create()).toBe("paypal-order")
    expect(JSON.parse(request.mock.calls[0][1].body)).toEqual({
      orderId: "local-order",
    })
    expect(onPaid).not.toHaveBeenCalled()
    await approve({ orderID: "paypal-order" })
    await waitFor(() =>
      expect(onPaid).toHaveBeenCalledWith(
        expect.objectContaining({ status: "PAID" }),
      ),
    )
    expect(request.mock.calls[1][0]).toContain(
      "/api/paypal/orders/paypal-order/capture",
    )
  })
  it("resumes a pending server order with its saved address even after the cart is empty", async () => {
    const savedAddress = { ...address, street: "20 Saved Order Street" }
    const request = vi
      .fn()
      .mockResolvedValue(response({ ...order, shippingAddress: savedAddress }))
    vi.stubGlobal("fetch", request)
    show(
      <CheckOut />,
      true,
      { ...profile, cart: { ...profile.cart, items: [] } },
      "/checkout?order=local-order",
    )
    await screen.findByText("$47.50")
    expect(screen.getByText(/20 Saved Order Street/)).toBeTruthy()
    expect(
      screen.queryByRole("heading", { name: "Your cart is empty" }),
    ).toBeNull()
    expect(request.mock.calls[0][0]).toContain("/order/local-order")
    expect(request.mock.calls[0][1].headers.Authorization).toBe(
      "Basic test-token",
    )
  })
  it("shows payment SDK loading failures", () => {
    vi.stubEnv("VITE_PAYPAL_CLIENT_ID", "sandbox-test")
    sdk.rejected = true
    show(<PayPalCheckout order={order} onPaid={vi.fn()} />)
    expect(screen.getByRole("alert").textContent).toContain(
      "PayPal could not be loaded",
    )
  })
  it("does not report a payment as successful when backend confirmation fails", async () => {
    vi.stubEnv("VITE_PAYPAL_CLIENT_ID", "sandbox-test")
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          response(
            { message: "Payment confirmation is temporarily unavailable." },
            503,
          ),
        ),
    )
    const onPaid = vi.fn()
    show(<PayPalCheckout order={order} onPaid={onPaid} />)
    const approve = sdk.props.onApprove as (data: {
      orderID: string
    }) => Promise<void>
    await approve({ orderID: "paypal-order" })
    await screen.findByRole("alert")
    expect(onPaid).not.toHaveBeenCalled()
  })
  it("keeps two variants separate and reuses the same cart key for repeated additions", async () => {
    const variants = {
      ...product,
      sizeQuantities: [
        { size: "Small/round", quantity: 3 },
        { size: "Large", quantity: 3 },
      ],
    }
    const request = vi
      .fn()
      .mockResolvedValueOnce(response(variants))
      .mockImplementation(() => Promise.resolve(response(profile)))
    vi.stubGlobal("fetch", request)
    show(
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>,
      true,
      profile,
      "/product/p1",
    )
    await screen.findByRole("heading", { name: product.name })
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }))
    await screen.findByRole("status")
    fireEvent.change(screen.getByLabelText("Size / option"), {
      target: { value: "Large" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }))
    await waitFor(() => expect(request).toHaveBeenCalledTimes(3))
    await waitFor(() =>
      expect(
        (
          screen.getByRole("button", {
            name: "Add to cart",
          }) as HTMLButtonElement
        ).disabled,
      ).toBe(false),
    )
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }))
    await waitFor(() => expect(request).toHaveBeenCalledTimes(4))
    const [small, large, repeatedLarge] = request.mock.calls
      .slice(1)
      .map(call => JSON.parse(call[1].body))
    expect(small.selectedSize).toBe("Small/round")
    expect(large.selectedSize).toBe("Large")
    expect(small.cartItemId).not.toBe(large.cartItemId)
    expect(small.cartItemId).not.toContain("/")
    expect(repeatedLarge.cartItemId).toBe(large.cartItemId)
  })
  it("preserves the product destination when a guest signs in to add an item", async () => {
    const Destination = () => (
      <p>{(useLocation().state as { from: string }).from}</p>
    )
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response(product)))
    show(
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Destination />} />
      </Routes>,
      false,
      profile,
      "/product/p1",
    )
    await screen.findByRole("heading", { name: product.name })
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }))
    expect(await screen.findByText("/product/p1")).toBeTruthy()
  })
})

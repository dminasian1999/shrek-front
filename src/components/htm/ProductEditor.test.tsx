// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest"
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import ProductEditor from "./ProductEditor"
import type { ProductT } from "../../utils/types"

const product: ProductT = {
  id: "plate-1",
  name: "Blue plate",
  category: "ceramics",
  subCategory: "plates",
  price: 24.5,
  weight: 600,
  imageUrls: ["https://example.com/plate.jpg"],
  quantity: 0,
  color: "blue",
  material: "ceramic",
  desc: "Hand painted",
  sizeQuantities: [
    { size: "Small", quantity: 3 },
    { size: "Large", quantity: 4 },
  ],
}
const response = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  })
const renderEditor = (editing = true) => {
  const store = configureStore({
    reducer: {
      token: () => "Basic local-test",
      user: () => ({ profile: { login: "staff@example.com" } }),
    },
  })
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductEditor
          initialProduct={editing ? product : undefined}
          productId={editing ? product.id : undefined}
        />
      </MemoryRouter>
    </Provider>,
  )
}

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe("product editor API integration", () => {
  it("creates a product with Standard inventory and shipping data instead of discarded quantity", async () => {
    const fetchMock = vi.fn().mockResolvedValue(response(product))
    vi.stubGlobal("fetch", fetchMock)
    renderEditor(false)
    fireEvent.change(screen.getByLabelText("Product name"), {
      target: { value: "New mug" },
    })
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "ceramics" },
    })
    fireEvent.change(screen.getByLabelText("Price (USD)"), {
      target: { value: "12.50" },
    })
    fireEvent.change(screen.getByLabelText("Shipping weight (grams)"), {
      target: { value: "250" },
    })
    fireEvent.change(screen.getByLabelText("Stock for option 1"), {
      target: { value: "5" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Create product" }))
    await screen.findByRole("heading", { name: "Product created" })
    const [url, options] = fetchMock.mock.calls[0]
    expect(url).toContain("/post/staff%40example.com")
    expect(options.method).toBe("POST")
    const payload = JSON.parse(options.body)
    expect(payload).toMatchObject({
      weight: 250,
      price: 12.5,
      sizeQuantities: [{ size: "Standard", quantity: 5 }],
    })
    expect(payload).not.toHaveProperty("quantity")
    expect(screen.queryByRole("button", { name: "Create product" })).toBeNull()
  })

  it("preserves variant sizes, shipping weight and subcategory when saving stock", async () => {
    const fetchMock = vi.fn().mockResolvedValue(response(product))
    vi.stubGlobal("fetch", fetchMock)
    renderEditor()
    fireEvent.change(screen.getByLabelText("Stock for option 2"), {
      target: { value: "8" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }))
    await screen.findByText("Product changes saved.")
    const [url, options] = fetchMock.mock.calls[0]
    expect(url).toContain("/post/plate-1")
    expect(options.method).toBe("PUT")
    const payload = JSON.parse(options.body)
    expect(payload).toMatchObject({
      weight: 600,
      subCategory: "plates",
      sizeQuantities: [
        { size: "Small", quantity: 3 },
        { size: "Large", quantity: 8 },
      ],
    })
    expect(payload).not.toHaveProperty("quantity")
  })

  it("does not upload or save an image removed from the preview", async () => {
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:removed-file")
    const revoke = vi
      .spyOn(URL, "revokeObjectURL")
      .mockImplementation(() => undefined)
    const fetchMock = vi.fn().mockResolvedValue(response(product))
    vi.stubGlobal("fetch", fetchMock)
    renderEditor()
    fireEvent.change(screen.getByLabelText("Product images"), {
      target: {
        files: [new File(["jpeg"], "new.jpg", { type: "image/jpeg" })],
      },
    })
    fireEvent.click(screen.getByRole("button", { name: "Remove new image 1" }))
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }))
    await screen.findByText("Product changes saved.")
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).imageUrls).toEqual(
      product.imageUrls,
    )
    expect(revoke).toHaveBeenCalledWith("blob:removed-file")
  })

  it("retains form changes after a save failure and reuses a successful upload on retry", async () => {
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:retained-file")
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined)
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("https://example.com/new.jpg"))
      .mockResolvedValueOnce(response({}, 503))
      .mockResolvedValueOnce(response(product))
    vi.stubGlobal("fetch", fetchMock)
    renderEditor()
    fireEvent.change(screen.getByLabelText("Product images"), {
      target: {
        files: [new File(["jpeg"], "new.jpg", { type: "image/jpeg" })],
      },
    })
    fireEvent.change(screen.getByLabelText("Product name"), {
      target: { value: "Edited plate" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }))
    await screen.findByRole("alert")
    expect(
      (screen.getByLabelText("Product name") as HTMLInputElement).value,
    ).toBe("Edited plate")
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }))
    await screen.findByText("Product changes saved.")
    expect(
      fetchMock.mock.calls.filter(([url]) =>
        String(url).endsWith("/post/file/upload"),
      ),
    ).toHaveLength(1)
    expect(JSON.parse(fetchMock.mock.calls[2][1].body).imageUrls).toEqual([
      ...product.imageUrls,
      "https://example.com/new.jpg",
    ])
    await waitFor(() => expect(screen.queryByRole("alert")).toBeNull())
  })
})

// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest"
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import Shop from "./Shop"
import type { ProductT } from "../../utils/types"

const response = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  })
const product = (name: string): ProductT => ({
  id: name,
  name,
  imageUrls: [],
  quantity: 1,
  price: 10,
  category: "ceramics",
  color: "blue",
  material: "ceramic",
  desc: "Handmade gift",
})
const renderShop = (path = "/shop") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/shop" element={<Shop />} />
        <Route path="/category/:id/:type" element={<Shop />} />
      </Routes>
    </MemoryRouter>,
  )

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe("catalog search", () => {
  it("shows a useful empty state without invalid pagination and requests newest first", async () => {
    const fetchMock = vi.fn().mockResolvedValue(response([]))
    vi.stubGlobal("fetch", fetchMock)
    renderShop()
    await screen.findByRole("heading", { name: "No gifts found" })
    expect(screen.queryByRole("button", { name: "Next" })).toBeNull()
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      sortField: "dateCreated",
      asc: false,
    })
    expect(fetchMock.mock.calls[0][1].headers).not.toHaveProperty(
      "Authorization",
    )
  })

  it("keeps the latest search when an older request finishes later", async () => {
    let finishOld: (value: Response) => void = () => undefined
    const oldRequest = new Promise<Response>(resolve => {
      finishOld = resolve
    })
    const fetchMock = vi
      .fn()
      .mockReturnValueOnce(oldRequest)
      .mockResolvedValueOnce(response([product("Blue plate")]))
    vi.stubGlobal("fetch", fetchMock)
    renderShop()
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    fireEvent.change(screen.getByLabelText("Search gifts"), {
      target: { value: "plate" },
    })
    await screen.findByRole("heading", { name: "Blue plate" })
    finishOld(response([product("Old mug")]))
    await waitFor(() =>
      expect(screen.queryByRole("heading", { name: "Old mug" })).toBeNull(),
    )
    expect(screen.getByRole("heading", { name: "Blue plate" })).toBeTruthy()
    expect(JSON.parse(fetchMock.mock.calls[1][1].body).name).toBe("plate")
  })

  it("clears a previous failure when retry succeeds", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(response({}, 503))
      .mockResolvedValueOnce(response([]))
    vi.stubGlobal("fetch", fetchMock)
    renderShop()
    await screen.findByRole("heading", { name: "Products are unavailable" })
    fireEvent.click(screen.getByRole("button", { name: "Try again" }))
    await screen.findByRole("heading", { name: "No gifts found" })
    expect(screen.queryByRole("alert")).toBeNull()
  })

  it("sends legacy category and subcategory route parameters to the API", async () => {
    const fetchMock = vi.fn().mockResolvedValue(response([]))
    vi.stubGlobal("fetch", fetchMock)
    renderShop("/category/ceramics/tiles")
    await screen.findByRole("heading", { name: "No gifts found" })
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      category: "ceramics",
      subCategory: "tiles",
    })
  })
})

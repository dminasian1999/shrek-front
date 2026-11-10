// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom"
import user from "../../features/slices/userSlice"
import token from "../../features/slices/tokenSlice"
import Login from "./Login"
import Register from "./Register"

function view(component: React.ReactElement) {
  const store = configureStore({ reducer: { user, token } })
  render(
    <MemoryRouter>
      <Provider store={store}>{component}</Provider>
    </MemoryRouter>,
  )
  return store
}
afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})
describe("account forms", () => {
  it("submits login with Enter and shows incorrect credentials without leaving the form", async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(null, { status: 401 }))
    vi.stubGlobal("fetch", fetch)
    const store = view(<Login />)
    const keyboard = userEvent.setup()
    await keyboard.type(screen.getByLabelText("Email"), "shopper@example.test")
    await keyboard.type(
      screen.getByLabelText("Password"),
      "wrongpassword{Enter}",
    )
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(screen.getByRole("alert").textContent).toMatch(
        /Invalid credentials/i,
      ),
    )
    expect(store.getState().token).toBe("")
    expect(
      screen.getByRole("link", { name: /forgot/i }).getAttribute("href"),
    ).toBe("/forgot-password")
  })
  it("shows duplicate-account errors and allows correcting registration", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 409 })),
    )
    view(<Register />)
    const keyboard = userEvent.setup()
    await keyboard.type(screen.getByLabelText("Email"), "existing@example.test")
    await keyboard.type(screen.getByLabelText("Password"), "good-password")
    await keyboard.type(screen.getByLabelText("First Name"), "Two Names")
    await keyboard.type(screen.getByLabelText("Last Name"), "Family")
    await keyboard.click(screen.getByRole("button", { name: "SIGN UP" }))
    await waitFor(() =>
      expect(screen.getByRole("alert").textContent).toMatch(/already exists/i),
    )
    expect(
      (screen.getByLabelText("First Name") as HTMLInputElement).value,
    ).toBe("Two Names")
  })
})

// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest"
import { configureStore } from "@reduxjs/toolkit"
import token, { deleteToken } from "../features/slices/tokenSlice"
import user, { deleteUser } from "../features/slices/userSlice"
import {
  changePassword,
  fetchUser,
  updateUser,
} from "../features/api/accountActions"
import type { UserProfile } from "../utils/types"
import { createSessionRequestGuard } from "./sessionRequests"
import { readSession, saveSession } from "./session"

const profile = {
  login: "buyer@example.com",
  roles: ["USER"],
  firstName: "Buyer",
} as UserProfile
function makeStore() {
  const result = configureStore({
    reducer: { token, user },
    middleware: defaults => defaults().prepend(createSessionRequestGuard()),
  })
  result.subscribe(() =>
    saveSession(
      sessionStorage,
      result.getState().token,
      result.getState().user.profile,
    ),
  )
  return result
}
function signIn(store: ReturnType<typeof makeStore>, id = "login") {
  store.dispatch(fetchUser.pending(id, "Basic buyer"))
  store.dispatch(
    fetchUser.fulfilled(
      { data: profile, token: "Basic buyer" },
      id,
      "Basic buyer",
    ),
  )
}
beforeEach(() => {
  sessionStorage.clear()
  vi.unstubAllGlobals()
})

describe("session request isolation", () => {
  it("drops late authentication and profile responses after sign out and keeps storage clear", () => {
    const store = makeStore()
    signIn(store)
    store.dispatch(
      fetchUser.pending("refresh", { token: "Basic buyer", refresh: true }),
    )
    store.dispatch(
      updateUser.pending("profile", {
        firstName: "Updated",
        lastName: "Buyer",
      }),
    )
    store.dispatch(deleteUser())
    store.dispatch(deleteToken())
    store.dispatch(
      fetchUser.fulfilled({ data: profile, token: "Basic buyer" }, "refresh", {
        token: "Basic buyer",
        refresh: true,
      }),
    )
    store.dispatch(
      updateUser.fulfilled({ ...profile, firstName: "Updated" }, "profile", {
        firstName: "Updated",
        lastName: "Buyer",
      }),
    )
    expect(store.getState().token).toBe("")
    expect(store.getState().user.profile).toEqual({})
    expect(readSession(sessionStorage)).toBeUndefined()
  })

  it("allows a fresh explicit login after logout and accepts its current mutations", () => {
    const store = makeStore()
    signIn(store)
    store.dispatch(deleteUser())
    store.dispatch(deleteToken())
    signIn(store, "fresh-login")
    store.dispatch(
      updateUser.pending("current", {
        firstName: "Updated",
        lastName: "Buyer",
      }),
    )
    store.dispatch(
      updateUser.fulfilled({ ...profile, firstName: "Updated" }, "current", {
        firstName: "Updated",
        lastName: "Buyer",
      }),
    )
    expect(store.getState().token).toBe("Basic buyer")
    expect(store.getState().user.profile.firstName).toBe("Updated")
    expect(readSession(sessionStorage)?.token).toBe("Basic buyer")
  })

  it("does not let a stale refresh overwrite a newly changed password token", () => {
    const store = makeStore()
    signIn(store)
    store.dispatch(
      fetchUser.pending("refresh", { token: "Basic buyer", refresh: true }),
    )
    store.dispatch(
      changePassword.pending("password", {
        oldPassword: "old-password",
        newPassword: "new-password",
      }),
    )
    store.dispatch(
      changePassword.fulfilled("Basic new-password", "password", {
        oldPassword: "old-password",
        newPassword: "new-password",
      }),
    )
    store.dispatch(
      fetchUser.fulfilled({ data: profile, token: "Basic buyer" }, "refresh", {
        token: "Basic buyer",
        refresh: true,
      }),
    )
    expect(store.getState().token).toBe("Basic new-password")
  })

  it("does not start background authentication after logout", async () => {
    const network = vi.fn()
    vi.stubGlobal("fetch", network)
    const store = makeStore()
    await store.dispatch(fetchUser({ token: "Basic old", refresh: true }))
    expect(network).not.toHaveBeenCalled()
    expect(store.getState().token).toBe("")
  })

  it("sends new Unicode passwords in a JSON body", async () => {
    const network = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal("fetch", network)
    const store = makeStore()
    signIn(store)
    await store.dispatch(
      changePassword({
        oldPassword: "old-password",
        newPassword: "Գաղտնաբառ12🔐",
      }),
    )
    const request = network.mock.calls[0][1] as RequestInit
    expect(request.body).toBe(JSON.stringify({ newPassword: "Գաղտնաբառ12🔐" }))
    expect(request.headers).not.toHaveProperty("X-Password")
  })
})

// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest"
import { readSession, saveSession } from "./session"
import type { UserProfile } from "../utils/types"

const profile = {
  login: "shopper@example.test",
  roles: ["USER"],
} as UserProfile
beforeEach(() => sessionStorage.clear())
describe("session storage recovery", () => {
  it("survives malformed browser storage", () => {
    sessionStorage.setItem("sevan-session", "{broken")
    expect(readSession(sessionStorage)).toBeUndefined()
  })
  it("restores only an unexpired authenticated profile", () => {
    saveSession(sessionStorage, "Basic test", profile, 100)
    expect(readSession(sessionStorage, 101)?.user.profile.login).toBe(
      profile.login,
    )
    expect(readSession(sessionStorage, 100 + 3600001)).toBeUndefined()
    expect(sessionStorage.getItem("sevan-session")).toBeNull()
  })
  it("removes credentials on sign out without clearing unrelated data", () => {
    sessionStorage.setItem("preference", "English")
    saveSession(sessionStorage, "Basic test", profile)
    saveSession(sessionStorage, "", profile)
    expect(readSession(sessionStorage)).toBeUndefined()
    expect(sessionStorage.getItem("preference")).toBe("English")
  })
  it("does not throw when storage is disabled", () => {
    const unavailable = {
      getItem() {
        throw new Error("disabled")
      },
      setItem() {
        throw new Error("disabled")
      },
      removeItem() {
        throw new Error("disabled")
      },
    } as unknown as Storage
    expect(readSession(unavailable)).toBeUndefined()
    expect(() => saveSession(unavailable, "Basic test", profile)).not.toThrow()
  })
})

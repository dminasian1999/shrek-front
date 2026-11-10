import type { UserProfile } from "../utils/types"

const SESSION_KEY = "sevan-session"
const SESSION_TTL = 60 * 60 * 1000

export function readSession(storage: Storage, now = Date.now()) {
  try {
    const saved = JSON.parse(storage.getItem(SESSION_KEY) || "null")
    if (
      !saved ||
      typeof saved.expiresAt !== "number" ||
      saved.expiresAt <= now ||
      typeof saved.token !== "string" ||
      !saved.token.startsWith("Basic ") ||
      !saved.profile ||
      typeof saved.profile.login !== "string" ||
      !Array.isArray(saved.profile.roles)
    ) {
      storage.removeItem(SESSION_KEY)
      return undefined
    }
    return {
      token: saved.token as string,
      user: {
        profile: saved.profile as UserProfile,
        loading: false,
        errorMessage: null as string | null,
      },
    }
  } catch {
    return undefined
  }
}

export function saveSession(
  storage: Storage,
  token: string,
  profile: UserProfile,
  now = Date.now(),
) {
  try {
    if (!token) storage.removeItem(SESSION_KEY)
    else
      storage.setItem(
        SESSION_KEY,
        JSON.stringify({ token, profile, expiresAt: now + SESSION_TTL }),
      )
  } catch {
    /* Browsing still works when browser storage is unavailable. */
  }
}

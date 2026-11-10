import type { Middleware } from "@reduxjs/toolkit"

/** Discard responses started in a session that has since signed out. */
export function createSessionRequestGuard(): Middleware<
  object,
  { token: string }
> {
  const activeRequests = new Set<string>()
  return api => next => action => {
    if (
      action.type === "user/deleteUser" ||
      action.type === "token/deleteToken"
    ) {
      activeRequests.clear()
      return next(action)
    }
    if (
      !action.type?.startsWith("user/") ||
      typeof action.meta?.requestId !== "string"
    )
      return next(action)
    const { requestId, requestStatus, arg } = action.meta
    if (requestStatus === "pending") activeRequests.add(requestId)
    else if (requestStatus === "fulfilled" || requestStatus === "rejected") {
      if (!activeRequests.delete(requestId)) return action
      // Password changes can replace the token while an older refresh is in flight.
      if (
        action.type === "user/login/fulfilled" &&
        arg?.refresh &&
        api.getState().token !== arg.token
      )
        return action
    }
    return next(action)
  }
}

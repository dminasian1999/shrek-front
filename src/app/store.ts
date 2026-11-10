import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import token from "../features/slices/tokenSlice"
import user from "../features/slices/userSlice"
import { readSession, saveSession } from "./session"
import { createSessionRequestGuard } from "./sessionRequests"

// Remove credentials from the legacy persistent store; retain unrelated site data.
try {
  localStorage.removeItem("state")
  localStorage.removeItem("time")
} catch {
  /* Private browsing may disallow storage. */
}

let preloadedState: ReturnType<typeof readSession>
try {
  preloadedState = readSession(sessionStorage)
} catch {
  /* Use a new session. */
}

export const store = configureStore({
  reducer: { token, user },
  preloadedState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(createSessionRequestGuard()),
})

store.subscribe(() => {
  try {
    const state = store.getState()
    saveSession(sessionStorage, state.token, state.user.profile)
  } catch {
    /* Do not interrupt a request if storage is full or blocked. */
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

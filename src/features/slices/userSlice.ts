import { createSlice } from "@reduxjs/toolkit"
import {
  fetchUser,
  registerUser,
  updateAddress,
  updateUser,
} from "../api/accountActions"
import { UserProfile } from "../../utils/types"

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: {} as UserProfile,
    loading: false,
    errorMessage: null as string | null,
  },
  reducers: {
    deleteUser: state => {
      state.profile = {} as UserProfile // Clears the profile data
      state.loading = false // Resets loading to false
      state.errorMessage = null // Clears any error message
    },
  },

  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.profile = action.payload.data
        state.loading = false
      })
      .addCase(registerUser.pending, state => {
        state.loading = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.error.message || "Something went wrong!"
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.profile = action.payload.data
        state.loading = false
      })
      .addCase(fetchUser.pending, state => {
        state.loading = true
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.errorMessage =
          action.error.message || "Could not fetch user data."
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.profile = action.payload
        state.loading = false
      })
      .addCase(updateUser.pending, state => {
        state.loading = true
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.error.message || "Update failed!"
      })
      .addCase(updateAddress.pending, state => {
        state.loading = true
        state.errorMessage = "" // Clear any previous errors
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.profile  = action.payload
        state.loading = false
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.error.message || "Address update failed!"
      })
  },
})

export const { deleteUser } = userSlice.actions
export default userSlice.reducer

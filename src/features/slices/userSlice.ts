import { createSlice } from "@reduxjs/toolkit"
import { UserProfile } from "../../utils/types"
import {
  addCartList,
  addWishlist,
  checkOut,
  estimateShipping,
  fetchUser,
  registerUser,
  removeCartList,
  removeWishlist,
  updateAddress,
  updateCartList,
  updatePaymentInfo,
  updateUser,
} from "../api/accountActions.ts"

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
        state.profile = action.payload
        state.loading = false
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.error.message || "Address update failed!"
      })
      .addCase(addWishlist.pending, state => {
        state.loading = true
        state.errorMessage = "" // Clear any previous errors
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.profile = action.payload
        state.loading = false
      })
      .addCase(addWishlist.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.error.message || "addWishlist failed!"
      })
      .addCase(removeWishlist.pending, state => {
        state.loading = true
        state.errorMessage = "" // Clear any previous errors
      })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.profile = action.payload
        state.loading = false
      })
      .addCase(removeWishlist.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.error.message || "removeWishlist failed!"
      })
      .addCase(addCartList.pending, state => {
        state.loading = true
        state.errorMessage = "" // Clear any previous errors
      })
      .addCase(addCartList.fulfilled, (state, action) => {
        state.profile = action.payload
        state.loading = false
      })
      .addCase(addCartList.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.error.message || "addCartlist failed!"
      })
      .addCase(removeCartList.pending, state => {
        state.loading = true
        state.errorMessage = "" // Clear any previous errors
      })
      .addCase(removeCartList.fulfilled, (state, action) => {
        state.profile = action.payload
        state.loading = false
      })
      .addCase(removeCartList.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.error.message || "removeCartlist failed!"
      })
      .addCase(updateCartList.pending, state => {
        state.loading = true
        state.errorMessage = "" // Clear any previous errors
      })
      .addCase(updateCartList.fulfilled, (state, action) => {
        state.profile = action.payload
        state.loading = false
      })
      .addCase(updateCartList.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.error.message || "updateCartList failed!"
      })
      .addCase(updatePaymentInfo.fulfilled, (state, action) => {
        state.profile = action.payload
        state.loading = false
      })
      .addCase(updatePaymentInfo.pending, state => {
        state.loading = true
      })
      .addCase(updatePaymentInfo.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.error.message || "Update failed!"
      })
      .addCase(checkOut.pending, state => {
        state.loading = true
        state.errorMessage = null
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        // You might want to update profile or orders in the state if needed
        // For example, if backend returns updated user profile with orders:
        state.profile.orders = [...state.profile.orders, action.payload]
        state.loading = false
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.error.message || "Order creation failed!"
      })
      .addCase(estimateShipping.pending, state => {
        state.loading = true
        state.errorMessage = null
      })
      .addCase(estimateShipping.fulfilled, (state, action) => {
        // You might want to update profile or orders in the state if needed
        // For example, if backend returns updated user profile with orders:
        state.profile.cart.shippingPrice =  action.payload
        state.loading = false
      })
      .addCase(estimateShipping.rejected, (state, action) => {
        state.loading = false
        state.errorMessage = action.error.message || "Order creation failed!"
      })
  },
})

export const { deleteUser } = userSlice.actions
export default userSlice.reducer

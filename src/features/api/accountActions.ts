import { RootState } from "../../app/store"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { baseUrl, baseUrlBlog, createToken } from "../../utils/constants"
import { AddressT, CartItem, paymentMethodT, UserEditData, UserRegister, UserUpdatePassword } from "../../utils/types"

export const registerUser = createAsyncThunk(
  "user/register",
  async (user: UserRegister) => {
    const res = await fetch(`${baseUrl}/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
    if (res.status === 409) throw new Error(`already exists (${user.login})`)
    if (!res.ok) throw new Error(`Oops,something went wrong!`)

    const data = await res.json()
    const token = createToken(user.login, user.password)
    return { data, token }
  },
)

export const fetchUser = createAsyncThunk(
  "user/login",
  async (token: string) => {
    const res = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { Authorization: token },
    })
    if (!res.ok) {
      if (res.status === 404) throw new Error("Account not found!")
      if (res.status === 403) throw new Error("Invalid credentials!")
      throw new Error("An error occurred during login!")
    }
    const data = await res.json()
    return { data, token }
  },
)
// In ../api/accountActions.ts

// export const estimateShipping = createAsyncThunk(
  // "user/estimateShipping",
  // async (token: string, country: string, weight: number) => {
  //   const res = await fetch(
  //     `http://localhost:8080/shippingCost/${country}/${weight}`,
  //     {
  //       headers: {
  //         Authorization: token,
  //       },
  //     },
  //   )
  //   if (!res.ok) {
  //     if (res.status === 404) throw new Error("Account not found!")
  //     if (res.status === 403) throw new Error("Invalid credentials!")
  //     throw new Error("An error occurred during login!")
  //   }
  //   return await res.json()
  // },
// )
// In ../api/accountActions.ts

export const estimateShipping = createAsyncThunk<any, any, { state: RootState }>(
  "user/estimateShipping",
  async ({ country, weight }, {}) => {
    const res = await fetch(
      `http://localhost:8080/shippingCost/${country}/${weight}`,
    )
    if (!res.ok) throw new Error(`Oops,something went wrong!`)
    return  res.json()
  },
)

// export const estimateShipping = async ( country:string, weight :number ) => {
//   const response = await fetch(`http://localhost:8080/shippingCost/${country}/${weight+''}`, );
//
//   if (!response.ok) {
//     throw new Error(`Failed: ${response.status} ${response.statusText}`);
//   }
//
//   const res = await response.json();
//   return res;
// };




export const checkOut = createAsyncThunk(
  "user/createOrder",
  async (orderPayload: any, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const token = state.token // or wherever your token is in state
      const userId = state.user.profile.login

      // const response = await fetch(`${baseUrl}/${userId}/payment/createOrder?isAdd=true`, {
      //   method: "POST",
      //   headers: {
      //     Authorization: token,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(orderPayload),
      // });
      const response = await fetch(`${baseUrlBlog}/checkOut`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      })

      if (!response.ok) {
        throw new Error("Failed to create order.")
      }

      return await response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchAllUsers = async () => {
  const response = await fetch(`${baseUrl}/users`)
  if (!response.ok) throw new Error(`Failed: ${response.statusText}`)
  return response.json()
}

export const updateUser = createAsyncThunk<
  any,
  UserEditData,
  { state: RootState }
>("user/update", async (user, { getState }) => {
  const res = await fetch(baseUrl, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Authorization: getState().token,
    },
  })
  if (!res.ok) throw new Error(`Oops,something went wrong!`)
  return res.json()
})
export const updatePaymentInfo = createAsyncThunk<
  any,
  paymentMethodT,
  { state: RootState }
>("user/payment", async (paymentInfo, { getState }) => {
  const res = await fetch(
    `${baseUrl}/payment-method/${getState().user.profile.login}`,
    {
      method: "Put",
      body: JSON.stringify(paymentInfo),
      headers: {
        "Content-Type": "application/json",
        Authorization: getState().token,
      },
    },
  )
  if (!res.ok) throw new Error("Oops, something went wrong!")
  return await res.json()
})

export const removeUser = createAsyncThunk<any, string, { state: RootState }>(
  "user/delete",
  async (login, { getState }) => {
    const res = await fetch(`${baseUrl}/user/${login}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: getState().token,
      },
    })
    if (!res.ok) throw new Error(`Oops,something went wrong!`)
    return res.json()
  },
)

export const addRole = createAsyncThunk<any, string, { state: RootState }>(
  "user/addRole",
  async (email, { getState }) => {
    await fetch(`${baseUrl}/user/${email}/role/MODERATOR`, {
      method: "PUT",
      headers: { Authorization: getState().token },
    })
  },
)

export const removeRole = createAsyncThunk<any, string, { state: RootState }>(
  "user/removeRole",
  async (email, { getState }) => {
    await fetch(`${baseUrl}/user/${email}/role/MODERATOR`, {
      method: "DELETE",
      headers: { Authorization: getState().token },
    })
  },
)

export const changePassword = createAsyncThunk<
  string,
  UserUpdatePassword,
  { state: RootState }
>("user/password", async (password, { getState }) => {
  const res = await fetch(`${baseUrl}/password`, {
    method: "PUT",
    headers: {
      Authorization: createToken(
        getState().user.profile.login,
        password.oldPassword,
      ),
      "X-Password": password.newPassword,
    },
  })
  if (!res.ok) throw new Error(`Oops,something went wrong!`)
  return createToken(getState().user.profile.login, password.newPassword)
})

export const recoveryPassword = createAsyncThunk<
  string,
  UserUpdatePassword,
  { state: RootState }
>("user/recovery", async (password, { getState }) => {
  const res = await fetch(`${baseUrl}/password/recovery/${getState().token}`, {
    method: "PUT",
    headers: { "X-Password": password.newPassword },
  })
  if (!res.ok) throw new Error(`Oops,something went wrong!`)
  return createToken(getState().user.profile.login, password.newPassword)
})

export const updateAddress = createAsyncThunk<
  any,
  AddressT,
  { state: RootState }
>("user/address", async (address, { getState }) => {
  const res = await fetch(
    `${baseUrl}/address/${getState().user.profile.login}`,
    {
      method: "POST",
      body: JSON.stringify(address),
      headers: {
        "Content-Type": "application/json",
        Authorization: getState().token,
      },
    },
  )
  if (!res.ok) throw new Error(`Oops,something went wrong!`)
  return res.json()
})

export const addWishlist = createAsyncThunk<any, string, { state: RootState }>(
  "user/addWishList",
  async (id, { getState }) => {
    const res = await fetch(
      `${baseUrl}/${getState().user.profile.login}/wishList/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: getState().token,
          "Content-Type": "application/json",
        },
      },
    )
    if (!res.ok) throw new Error(`Oops,something went wrong!`)
    return res.json()
  },
)

export const removeWishlist = createAsyncThunk<
  any,
  string,
  { state: RootState }
>("user/removeWishlist", async (id, { getState }) => {
  const res = await fetch(
    `${baseUrl}/${getState().user.profile.login}/wishList/${id}`,
    {
      method: "DELETE",
      headers: { Authorization: getState().token },
    },
  )
  if (!res.ok) throw new Error(`Oops,something went wrong!`)
  return res.json()
})

export const addCartList = createAsyncThunk<
  any,
  CartItem,
  { state: RootState }
>("user/addCartList", async (cartItem, { getState }) => {
  const res = await fetch(
    `${baseUrl}/${getState().user.profile.login}/cartList`,
    {
      method: "PUT",
      headers: {
        Authorization: getState().token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    },
  )
  if (!res.ok) throw new Error(`Oops,something went wrong!`)
  return res.json()
})

export const removeCartList = createAsyncThunk<
  any,
  CartItem,
  { state: RootState }
>("user/removeCartList", async (cartItem, { getState }) => {
  const res = await fetch(
    `${baseUrl}/${getState().user.profile.login}/cartList`,
    {
      method: "DELETE",
      headers: {
        Authorization: getState().token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    },
  )
  if (!res.ok) throw new Error(`Oops,something went wrong!`)
  return res.json()
})

export const updateCartList = createAsyncThunk<
  any,
  { productId: string; isAdd: boolean },
  { state: RootState }
>("user/updateCartList", async ({ productId, isAdd }, { getState }) => {
  const res = await fetch(
    `${baseUrl}/${getState().user.profile.login}/cartList/${productId}/update/${isAdd}`,
    {
      method: "PUT",
      headers: { Authorization: getState().token },
    },
  )
  if (!res.ok) throw new Error(`Oops,something went wrong!`)
  return res.json()
})

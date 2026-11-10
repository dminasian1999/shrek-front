import { responseError } from "../../utils/http"
import { RootState } from "../../app/store"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { baseUrl, createToken } from "../../utils/constants"
import {
  AddressT,
  CartItem,
  UserEditData,
  UserProfile,
  UserRegister,
  UserUpdatePassword,
} from "../../utils/types"

export const registerUser = createAsyncThunk(
  "user/register",
  async (user: UserRegister) => {
    const res = await fetch(`${baseUrl}/register`, {
      method: "Post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.status === 409) {
      throw new Error(`already exists (${user.login})`)
    }
    if (!res.ok) {
      throw await responseError(res)
    }
    const data = await res.json()
    const token = createToken(user.login, user.password)
    return { data, token }
  },
)
export const fetchUser = createAsyncThunk<
  { data: UserProfile; token: string },
  string | { token: string; refresh: true },
  { state: RootState }
>(
  "user/login",
  async request => {
    const token = typeof request === "string" ? request : request.token
    const res = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    })

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Account not found!")
      } else if (res.status === 401 || res.status === 403) {
        throw new Error("Invalid credentials!")
      } else {
        throw await responseError(res, "Unable to sign in. Please try again.")
      }
    }

    const data = await res.json()
    return { data, token }
  },
  {
    // A background refresh must never authenticate again after the visitor signs out.
    condition: (request, { getState }) =>
      typeof request === "string" ||
      Boolean(request.token && getState().token === request.token),
  },
)
export const fetchAllUsers = async (token: string) => {
  const response = await fetch(baseUrl, {
    headers: { Authorization: token },
    // method: 'Get',
    // headers: {
    //     "Authorization": token,
    // },
  })
  if (!response.ok) throw new Error(`Failed: ${response.statusText}`)
  return response.json()
}

export const updateUser = createAsyncThunk<
  UserProfile,
  UserEditData,
  { state: RootState }
>("user/update", async (user, { getState }) => {
  const res = await fetch(baseUrl, {
    method: "Put",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Authorization: getState().token,
    },
  })
  if (!res.ok) {
    throw await responseError(res)
  }
  const data = await res.json()
  return data
})
export const removeUser = createAsyncThunk<
  UserProfile,
  string,
  { state: RootState }
>("user/delete", async (login, { getState }) => {
  const res = await fetch(`${baseUrl}/${encodeURIComponent(login)}`, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: getState().token,
    },
  })
  if (!res.ok) {
    throw await responseError(res)
  }
  return await res.json()
})

export const addRole = createAsyncThunk<void, string, { state: RootState }>(
  "user/addRole",
  async (email, { getState }) => {
    const res = await fetch(
      `${baseUrl}/${encodeURIComponent(email)}/roles/MODERATOR`,
      {
        method: "PUT",
        headers: {
          Authorization: getState().token,
        },
      },
    )
    if (!res.ok) throw await responseError(res)
  },
)
export const removeRole = createAsyncThunk<void, string, { state: RootState }>(
  "user/removeRole",
  async (email, { getState }) => {
    const res = await fetch(
      `${baseUrl}/${encodeURIComponent(email)}/roles/MODERATOR`,
      {
        method: "Delete",
        headers: {
          Authorization: getState().token,
        },
      },
    )
    if (!res.ok) throw await responseError(res)
  },
)
export const changePassword = createAsyncThunk<
  string,
  UserUpdatePassword,
  { state: RootState }
>("user/password", async (password, { getState }) => {
  const res = await fetch(`${baseUrl}/password`, {
    method: "Put",
    headers: {
      Authorization: createToken(
        getState().user.profile.login,
        password.oldPassword,
      ),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPassword: password.newPassword }),
  })
  if (!res.ok) {
    throw await responseError(res)
  }
  return createToken(getState().user.profile.login, password.newPassword)
})

export const updateAddress = createAsyncThunk<
  UserProfile,
  AddressT,
  { state: RootState }
>("user/address", async (address, { getState }) => {
  const res = await fetch(
    `${baseUrl}/address/${encodeURIComponent(getState().user.profile.login)}`,
    {
      method: "Post",
      body: JSON.stringify(address),
      headers: {
        "Content-Type": "application/json",
        Authorization: getState().token,
      },
    },
  )
  if (!res.ok) {
    throw await responseError(res)
  }
  const data = await res.json()
  return data
})

export const addWishlist = createAsyncThunk<
  UserProfile,
  string,
  { state: RootState }
>("user/addWishList", async (id, { getState }) => {
  const res = await fetch(
    `${baseUrl}/${encodeURIComponent(getState().user.profile.login)}/wishList/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      headers: {
        Authorization: getState().token,
        "Content-Type": "application/json",
      },
    },
  )
  if (!res.ok) {
    throw await responseError(res)
  }
  const data: UserProfile = await res.json()
  return data
})
export const removeWishlist = createAsyncThunk<
  UserProfile,
  string,
  { state: RootState }
>("user/removeWishlist", async (id, { getState }) => {
  const res = await fetch(
    `${baseUrl}/${encodeURIComponent(getState().user.profile.login)}/wishList/${encodeURIComponent(id)}`,
    {
      method: "Delete",
      headers: {
        Authorization: getState().token,
      },
    },
  )
  if (!res.ok) {
    throw await responseError(res)
  }
  const data = await res.json()
  return data
})

export const addCartList = createAsyncThunk<
  UserProfile,
  CartItem,
  { state: RootState }
>("user/addCartList", async (cartItem, { getState }) => {
  const res = await fetch(
    `${baseUrl}/${encodeURIComponent(getState().user.profile.login)}/cartList`,
    {
      method: "PUT",
      headers: {
        Authorization: getState().token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    },
  )
  if (!res.ok) {
    throw await responseError(res)
  }
  const data: UserProfile = await res.json()
  return data
})
export const removeCartList = createAsyncThunk<
  UserProfile,
  CartItem,
  { state: RootState }
>("user/removeCartList", async (cartItem, { getState }) => {
  const res = await fetch(
    `${baseUrl}/${encodeURIComponent(getState().user.profile.login)}/cartList`,
    {
      method: "Delete",
      headers: {
        Authorization: getState().token,
        "content-type": "application/json",
      },
      body: JSON.stringify(cartItem),
    },
  )
  if (!res.ok) {
    throw await responseError(res)
  }
  const data = await res.json()
  return data
})

export const updateCartList = createAsyncThunk<
  UserProfile,
  { productId: string; isAdd: boolean },
  { state: RootState }
>("user/updateCartList", async ({ productId, isAdd }, { getState }) => {
  const res = await fetch(
    `${baseUrl}/${encodeURIComponent(getState().user.profile.login)}/cartList/${encodeURIComponent(productId)}/update/${isAdd}`,
    {
      method: "Put",
      headers: {
        Authorization: getState().token,
      },
    },
  )
  if (!res.ok) {
    throw await responseError(res)
  }
  const data = await res.json()
  return data
})

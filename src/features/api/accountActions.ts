import {RootState} from "../../app/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {baseUrl, createToken} from "../../utils/constants";
import { AddressT, UserEditData, UserProfile, UserRegister, UserUpdatePassword } from "../../utils/types"

export const registerUser = createAsyncThunk(
    'user/register',
    async (user: UserRegister) => {
        const res = await fetch(`${baseUrl}/register`, {
            method: 'Post',
            body: JSON.stringify(user),
            headers: {

                "Content-Type": "application/json",
            }
        });
        if (res.status === 409) {
            throw new Error(`already exists (${user.login})`)
        }
        if (!res.ok) {
            throw new Error(`Oops,something went wrong!`)
        }
        const data = await res.json();
        const token = createToken(user.login, user.password)
        return {data, token}
    }
)
export const fetchUser = createAsyncThunk(
    'user/login',
    async (token: string) => {
        const res = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                "Authorization": token,
            }
        });

        if (!res.ok) {
            if (res.status === 404) {
                throw new Error("Account not found!");
            } else if (res.status === 403) {
                throw new Error("Invalid credentials!");
            } else {
                throw new Error("An error occurred during login!");
            }
        }

        const data = await res.json();
        return {data, token};
    }
);
export const fetchAllUsers = async () => {
    const response =  await fetch(`${baseUrl}/users`,{
        // method: 'Get',
        // headers: {
        //     "Authorization": token,
        // },
    });
    if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
    return response.json();
};


export const updateUser = createAsyncThunk<any, UserEditData, { state: RootState }>(
    'user/update',
    async (user, {getState}) => {
        const res = await fetch(baseUrl, {
            method: "Put",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                "Authorization": getState().token,
            }
        })
        if (!res.ok) {
            throw new Error(`Oops,something went wrong!`)
        }
        const data = await res.json();
        return data
    }
)
export const removeUser = createAsyncThunk<any, string, { state: RootState }>(
    'user/delete',
    async (login, {getState}) => {
        const res = await fetch(`${baseUrl}/user/${login}`, {
            method: "Delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getState().token,
            }
        })
        if (!res.ok) {
            throw new Error(`Oops,something went wrong!`)
        }
        return await res.json()
    }
)

export const addRole = createAsyncThunk<any, string, { state: RootState }>(
    'user/addRole',
    async (email, {getState}) => {
        await fetch(`${baseUrl}/user/${email}/role/MODERATOR`, {
            method: 'PUT',
            headers: {
                "Authorization": getState().token,
            },
        });
    }
);
export const removeRole = createAsyncThunk<any, string, { state: RootState }>(
    'user/removeRole',
    async (email, {getState}) => {
        await fetch(`${baseUrl}/user/${email}/role/MODERATOR`, {
            method: 'Delete',
            headers: {
                "Authorization": getState().token,
            },
        });
    }
);
export const changePassword = createAsyncThunk<string, UserUpdatePassword, { state: RootState }>(
    'user/password',
    async (password, {getState}) => {
        const res = await fetch(`${baseUrl}/password`, {
            method: 'Put',
            headers: {
                "Authorization": createToken(getState().user.profile.login, password.oldPassword),
                "X-Password": password.newPassword
            }
        })
        if (!res.ok) {
            throw new Error(`Oops,something went wrong!`)
        }
        return createToken(getState().user.profile.login, password.newPassword)
    }
)
export const updateAddress = createAsyncThunk<any, AddressT, { state: RootState }>(
  'user/address',
  async (address, {getState}) => {
    const res = await fetch(`${baseUrl}/address/${getState().user.profile.login}`, {
      method: "Post",
      body: JSON.stringify(address),
      headers: {
        "Content-Type": "application/json",
        "Authorization": getState().token,
      }
    })
    if (!res.ok) {
      throw new Error(`Oops,something went wrong!`)
    }
    const data = await res.json();
    return data
  }
)
export  const addWishlist = (token:string,login:string,id: string) => {
  fetch(`${baseUrl}/${login}/wishList/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": token,
    },
  }).catch((err) => {
    console.error("Failed to add wishlist", err);
  });
};
export const removeWishlist = (token:string,login:string,productId: string) => {
  fetch(`${baseUrl}/${login}/wishList/${productId}`, {
    method: "Delete",
    headers: {
      "Authorization": token,
    },
  }).catch((err) => {
    console.error("Failed to delete wishlist", err);
  });
};

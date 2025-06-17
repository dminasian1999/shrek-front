import {createSlice} from "@reduxjs/toolkit";
import {changePassword, fetchUser, registerUser} from "../api/accountActions";

const tokenSlice=createSlice({
    name:"token",
    initialState:"",
    reducers:{
        deleteToken: () =>{
            return "";
        }
    },
    extraReducers:builder => {
        builder
            .addCase(registerUser.fulfilled,(_state, action)=>{
                return action.payload.token
            })
            .addCase(fetchUser.fulfilled,(_state, action)=>{
                    return action.payload.token
            })
            .addCase(changePassword.fulfilled,(_state, action)=>{
                return action.payload
            })
    }
})
export const {deleteToken} =tokenSlice.actions
export default tokenSlice.reducer

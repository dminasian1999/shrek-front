import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import token from "../features/slices/tokenSlice.ts"
import user from "../features/slices/userSlice"

import {periodMinute} from "../utils/constants";

let preloadedState = JSON.parse(localStorage.getItem('state') || '{}')
const time = JSON.parse(localStorage.getItem('time') || '0');

if (+time && (Date.now() - +time) > periodMinute) {
    localStorage.clear();
    preloadedState = {}
}
export const store = configureStore({
    reducer: {

        token,
        user,
        // posts,
    },
    preloadedState
});

store.subscribe(() => {
    localStorage.setItem("state", JSON.stringify(store.getState()))
    localStorage.setItem("time", Date.now() + '');

})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

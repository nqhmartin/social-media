import { createReducer } from "@reduxjs/toolkit"
import { loginFailed, loginStart, loginSuccess } from "./action"
export const initialState = {
}
export const loginReducer = createReducer(initialState, builder => builder
    .addCase(loginStart, (state, action) => {
        return state
    }
    ))
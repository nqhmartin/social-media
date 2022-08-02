import { createReducer } from "@reduxjs/toolkit"
import { loginStart } from "./action"
export const initialState = {

}
export const loginReducer = createReducer(initialState, builder => builder
    .addCase(loginStart, (state, action) => {
        console.log("🚀 ~ file: reducer.ts ~ line 8 ~ .addCase ~ action", action)

        return state
    })
)
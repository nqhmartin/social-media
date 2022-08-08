import { createReducer } from "@reduxjs/toolkit";
import { getAddress, getAddressFailed, getAddressSucess } from "./action"

const initialState = {
    postList: {}
}
export const PostReducer = createReducer(initialState, builder => builder
    .addCase(getAddressSucess, (state, action) => {
        return state = { postList: action.payload }
    })
)
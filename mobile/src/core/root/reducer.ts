import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { chooseLanguage } from "./action"
import { loginFailed, loginStart, loginSuccess } from "../../screens/Auth/redux/action"
interface defineState {
    language: string,
    userInfo: object,
    access_token: string,
    refresh_token: string,
    isLoading: boolean,
}
const initialState: defineState = {
    language: "en",
    userInfo: {},
    access_token: "",
    refresh_token: "",
    isLoading: false,
}
export const reducer = createReducer(initialState, builder => builder
    .addCase(chooseLanguage, (state, action) => {
        return state = { ...state, language: action.payload, isLoading: false }
    })
    .addCase(loginStart, (state, action) => {
        return state = {
            ...state,
            isLoading: true
        }
    })
    .addCase(loginSuccess, (state, action) => {
        return state = {
            ...state,
            isLoading: false,
            userInfo: action.payload,
        }
    })
    .addCase(loginFailed, (state, action) => {
        return state = {
            ...state,
            isLoading: false,

        }
    })
)


export default reducer;
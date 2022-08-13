import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { chooseLanguage, getTokenFirebase, logout } from "./action"
import {
    loginFailed,
    loginStart,
    loginSuccess,


} from "../../screens/Auth/redux/action"
interface defineState {
    language: string,
    userInfo: any,
    access_token: string,
    refresh_token: string,
    isLoading: boolean,
    tokenFirebase: string
}
const initialState: defineState = {
    language: "en",
    userInfo: {},
    access_token: "",
    refresh_token: "",
    isLoading: false,
    tokenFirebase: ""
}
export const reducer = createReducer(initialState, builder => builder
    .addCase(chooseLanguage, (state, action) => {
        return state = { ...state, language: action.payload, }
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
    .addCase(getTokenFirebase, (state, action) => {
        return state = {
            ...state,
            tokenFirebase: action.payload,
            isLoading: false
        }
    })
    .addCase(logout, (state, action) => {
        return state = {
            ...state,
            userInfo: {}
        }
    })
)


export default reducer;
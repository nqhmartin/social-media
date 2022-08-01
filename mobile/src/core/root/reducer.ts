import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { chooseLanguage } from "./action"

interface defineState {
    language: string,
    userInfo: object,
    access_token: string,
    refresh_token: string
}
const initialState: defineState = {
    language: "en",
    userInfo: {},
    access_token: "",
    refresh_token: "",
}
export const language = createReducer(initialState, builder => builder
    .addCase(chooseLanguage, (state, action) => {
        return state = { ...state, language: action.payload }
    })
)

export default language;
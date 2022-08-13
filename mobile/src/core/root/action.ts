import { createAction } from "@reduxjs/toolkit";

export const chooseLanguage = createAction<any>("CHOOSE_LANGUAGE")
export const chooseLanguageSuccess = createAction<any>("CHOOSE_LANGUAGE_SUCCESS")
export const chooseLanguageFailed = createAction<any>("CHOOSE_LANGUAGE_FAILED")

export const getTokenFirebase = createAction<any>("GET_TOKEN_FIREBASE")
export const getTokenFirebaseSuccess = createAction<any>("GET_TOKEN_FIREBASE_SUCCESS")
export const getTokenFirebaseFailed = createAction<any>("GET_TOKEN_FIREBASE_FAILED")

export const logout = createAction<any>("LOG_OUT")
export const logoutSuccess = createAction<any>("LOG_OUT_SUCCESS")
export const logoutFailed = createAction<any>("LOG_OUT_FAILED")

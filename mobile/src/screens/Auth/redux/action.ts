import { createAction } from "@reduxjs/toolkit";

export const loginStart = createAction<any>("LOGIN_START")
export const loginSuccess = createAction<any>("LOGIN_SUCCESS")
export const loginFailed = createAction<any>("LOGIN_FAILED")
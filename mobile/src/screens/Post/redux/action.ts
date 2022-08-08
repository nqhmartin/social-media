import { createAction } from "@reduxjs/toolkit";

export const getAddress = createAction<any>("GET_ADDRESS")
export const getAddressSucess = createAction<any>("GET_ADDRESS_SUCCESS")
export const getAddressFailed = createAction<any>("GET_ADDRESS_FAILED")
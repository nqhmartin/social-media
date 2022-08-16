import {createAction} from '@reduxjs/toolkit';

// GET ADDRESS
export const getAddress = createAction<any>('GET_ADDRESS');
export const getAddressSucess = createAction<any>('GET_ADDRESS_SUCCESS');
export const getAddressFailed = createAction<any>('GET_ADDRESS_FAILED');

// POST
export const createPost = createAction<any>('CREATE_POST');
export const createPostSuccess = createAction<any>('CREATE_POST_SUCCESS');
export const createPostFailed = createAction<any>('CREATE_POST_FAILED');

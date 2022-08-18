import {createAction} from '@reduxjs/toolkit';

export const getPostExplore = createAction<any>('GET_POST_EXPLORE');
export const getPostExploreSuccess = createAction<any>(
  'GET_POST_EXPLORE_SUCCESS',
);
export const getPostExploreFailed = createAction<any>(
  'GET_POST_EXPLORE_FAILED',
);

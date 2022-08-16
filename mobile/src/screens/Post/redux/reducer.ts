import {createReducer} from '@reduxjs/toolkit';
import {
  getAddress,
  getAddressFailed,
  getAddressSucess,
  createPost,
  createPostFailed,
  createPostSuccess,
} from './action';

interface post {
  postList: any;
  loading: boolean;
}
const initialState = {
  postList: {},
  loading: false,
};
export const PostReducer = createReducer(initialState, builder =>
  builder
    .addCase(getAddressSucess, (state, action) => {
      return (state = {
        ...state,
        postList: action.payload,
      });
    })
    .addCase(createPost, (state, action) => {
      return (state = {
        ...state,
        loading: true,
      });
    })
    .addCase(createPostSuccess, (state, action) => {
      return (state = {
        ...state,
        loading: false,
      });
    })
    .addCase(createPostFailed, (state, action) => {
      return (state = {
        ...state,
        loading: false,
      });
    }),
);

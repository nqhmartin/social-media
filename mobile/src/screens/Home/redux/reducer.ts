import {createReducer} from '@reduxjs/toolkit';
import {
  getPostExplore,
  getPostExploreFailed,
  getPostExploreSuccess,
} from './action';

interface State {
  page: number;
  refreshing: boolean;
  exploreList: Array<any>;
  isMore: boolean;
}
const initState: State = {
  page: 1,
  refreshing: false,
  exploreList: [],
  isMore: false,
};

const homeReducer = createReducer(initState, builder =>
  builder
    .addCase(getPostExplore, (state, action) => {
      return (state = {
        ...state,
        refreshing: true,
        isMore: action.payload.isMore == true ? true : false,
        page: action.payload.page,
      });
    })
    .addCase(getPostExploreSuccess, (state, action) => {
      return (state = {
        ...state,
        refreshing: false,
        isMore: false,
        exploreList:
          state.isMore === true
            ? state.exploreList.concat(action.payload.dataPost)
            : action.payload.dataPost,
      });
    }),
);
export default homeReducer;

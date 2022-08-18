import {combineReducers} from '@reduxjs/toolkit';
import rootReducer from './root/reducer';
import {loginReducer} from '../screens/Auth/redux/reducer';
import {PostReducer} from '../screens/Post/redux/reducer';
import HomeReducer from '../screens/Home/redux/reducer';
const appReducer = combineReducers({
  rootStore: rootReducer,
  post: PostReducer,
  home: HomeReducer,
});

export default appReducer;

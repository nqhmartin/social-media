import { combineReducers } from "@reduxjs/toolkit";
import rootReducer from "./root/reducer"
import { loginReducer } from "../screens/Auth/redux/reducer"
import { PostReducer } from "../screens/Post/redux/reducer";
const appReducer = combineReducers({
    rootStore: rootReducer,
    post: PostReducer
})


export default appReducer;
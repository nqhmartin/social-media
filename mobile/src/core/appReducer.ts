import { combineReducers } from "@reduxjs/toolkit";
import rootReducer from "./root/reducer"
const appReducer = combineReducers({
    rootStore: rootReducer
})


export default appReducer;
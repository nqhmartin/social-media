import { combineEpics } from "redux-observable";
import rootEpic$ from "./root/epic";
import { loginStart$ } from "../screens/Auth/redux/epic"
import { getAddress$ } from "../screens/Post/redux/epic"
const appEpic = combineEpics(
    rootEpic$,
    loginStart$,
    getAddress$

)

export default appEpic;
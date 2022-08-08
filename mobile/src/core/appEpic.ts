import { combineEpics } from "redux-observable";
import { configLanguage$ } from "./root/epic";
import { loginStart$ } from "../screens/Auth/redux/epic"
import { getAddress$ } from "../screens/Post/redux/epic"
const rootEpic = combineEpics(
    configLanguage$,
    loginStart$,
    getAddress$

)

export default rootEpic;
import { combineEpics } from "redux-observable";
import { configLanguage$ } from "./root/epic";
import { loginEpic } from "../screens/Auth/redux/epic"
const rootEpic = combineEpics(
    configLanguage$,
    loginEpic
)

export default rootEpic;
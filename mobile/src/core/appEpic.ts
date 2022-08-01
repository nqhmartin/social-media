import { combineEpics } from "redux-observable";
import { configLanguage$ } from "./root/epic";

const rootEpic = combineEpics(
    configLanguage$
)

export default rootEpic;
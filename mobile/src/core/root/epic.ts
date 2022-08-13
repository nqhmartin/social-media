import { combineEpics, ofType } from "redux-observable"
import { delay, filter, map, Observable, } from "rxjs"
import {
    chooseLanguage,
    chooseLanguageFailed,
    chooseLanguageSuccess,
    getTokenFirebase,
    getTokenFirebaseFailed,
    getTokenFirebaseSuccess
} from "./action"

const configLanguage$ = (action$: Observable<any>): Observable<any> =>
    action$.pipe(
        ofType(chooseLanguage.type),
        delay(500),
        map((action) => {
            return chooseLanguageSuccess(action)
        })
    )
const getTokenFirebase$ = (action$: Observable<any>): Observable<any> =>
    action$.pipe(
        ofType(getTokenFirebase.type),
        map((action) => {
            return getTokenFirebaseSuccess(action.payload)
        })
    )

const rootEpic$ = combineEpics(
    configLanguage$,
    getTokenFirebase$
)
export default rootEpic$;
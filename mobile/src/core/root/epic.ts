import { ofType } from "redux-observable"
import { delay, filter, map, Observable, } from "rxjs"
import { chooseLanguage, chooseLanguageFailed, chooseLanguageSuccess } from "./action"
export const configLanguage$ = (action$: Observable<any>): Observable<any> =>
    action$.pipe(
        ofType(chooseLanguage.type),
        delay(500),
        map((action) => {
            return chooseLanguageSuccess(action)
        })
    )

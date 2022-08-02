import { combineEpics, ofType } from "redux-observable";
import { catchError, delay, exhaustMap, map, mergeMap, Observable, switchMap } from "rxjs";
import { request } from "../../../shared/api";
import { URL, API } from "../../../shared/systems";
import { loginStart, loginFailed, loginSuccess } from "./action"
export const loginStart$ = (action$: Observable<any>): Observable<any> =>
    action$.pipe(
        ofType(loginStart.type),
        delay(500),
        mergeMap((action) => {
            return request({
                method: "POST",
                url: URL + API.LOGIN,
                param: action.payload
            })
        })
    ).pipe(
        map((result: any) => {
            if (result.success == true) {
                return loginSuccess(result)
            } else {
                return loginFailed(result)
            }
        }),
        catchError((err: any) => {
            console.log(err)
            return loginFailed(err)
        })
    )


export const loginEpic = combineEpics(
    loginStart$
)
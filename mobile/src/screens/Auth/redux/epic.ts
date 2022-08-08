import { Alert } from "react-native";
import { combineEpics, ofType } from "redux-observable";
import { catchError, delay, exhaustMap, map, mergeMap, Observable, switchMap } from "rxjs";
import { navigate } from "../../../configs/rootNavigation";
import { request } from "../../../shared/api";
import { URL, API } from "../../../shared/systems";
import { loginStart, loginFailed, loginSuccess } from "./action"
export const loginStart$ = (action$: Observable<any>): Observable<any> =>
    action$.pipe(
        ofType(loginStart.type),
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
                navigate("Main")
                return loginSuccess(result.result)
            } else {
                Alert.alert(
                    'Alert system',
                    //body
                    `${result.message}`,
                    [


                        {
                            text: 'OK', onPress: () => console.log('OK Pressed')
                        },
                    ],
                    { cancelable: true },
                );
                return loginFailed(result)
            }
        }),
        catchError((err: any) => {
            return loginFailed(err)
        })
    )



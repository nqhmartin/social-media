import Axios from "axios";
import { ofType } from "redux-observable";
import { catchError, map, mergeMap, Observable } from "rxjs";
import { request } from "../../../shared/api";
import { API, URL } from "../../../shared/systems";
import { getAddress, getAddressFailed, getAddressSucess } from "./action"
export const getAddress$ = (action$: Observable<any>): Observable<any> =>
    action$.pipe(
        ofType(getAddress.type),
        mergeMap((action) => {
            return request({
                method: "GET",
                param: action.payload,
                url: URL + API.ADDRESS
            })
        })
    ).pipe(
        map((result: any) => {
            if (result?.success == true) {
                return getAddressSucess(result.data)
            } else {
                return getAddressFailed(result)
            }
        }),
        catchError((err) => {
            return getAddressFailed(err)
        })

    )

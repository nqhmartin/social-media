import {combineEpics, ofType} from 'redux-observable';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  Observable,
  throwError,
} from 'rxjs';
import {request} from '../../../shared/api';
import {API, URL} from '../../../shared/systems';
import {
  getPostExplore,
  getPostExploreFailed,
  getPostExploreSuccess,
} from './action';

const getPostExplore$ = (action$: Observable<any>): Observable<any> =>
  action$
    .pipe(
      ofType(getPostExplore.type),
      mergeMap((action: any) => {
        return request({
          method: 'GET',
          url: URL + API.GET_POST_EXPLORE,
          param: action.payload,
        });
      }),
    )
    .pipe(
      map((value: any) => {
        if (value.message == true) {
          return getPostExploreSuccess(value);
        } else {
          return getPostExploreFailed(value);
        }
      }),
      catchError((err: any) => {
        getPostExploreFailed(err);
        return throwError(err);
      }),
    );

const homeEpic$ = combineEpics(getPostExplore$);
export default homeEpic$;

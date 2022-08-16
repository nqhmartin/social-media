import Axios from 'axios';
import {combineEpics, ofType} from 'redux-observable';
import {catchError, exhaustMap, map, mergeMap, Observable} from 'rxjs';
import {navigate, reset} from '../../../configs/rootNavigation';
import {request} from '../../../shared/api';
import {API, URL} from '../../../shared/systems';
import {
  getAddress,
  getAddressFailed,
  getAddressSucess,
  createPost,
  createPostFailed,
  createPostSuccess,
} from './action';
const getAddress$ = (action$: Observable<any>): Observable<any> =>
  action$
    .pipe(
      ofType(getAddress.type),
      mergeMap(action => {
        return request({
          method: 'GET',
          param: action.payload,
          url: URL + API.ADDRESS,
        });
      }),
    )
    .pipe(
      map((result: any) => {
        if (result?.success == true) {
          return getAddressSucess(result.data);
        } else {
          return getAddressFailed(result);
        }
      }),
      catchError(err => {
        return getAddressFailed(err);
      }),
    );

const createPost$ = (action$: Observable<any>): Observable<any> =>
  action$.pipe(
    ofType(createPost.type),
    mergeMap((action: any) => {
      return Axios({
        method: 'POST',
        url: URL + API.POST_IMAGE,
        data: action.payload,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(result => {
          reset();
          navigate('Home');
          return createPostSuccess(result);
        })
        .catch(err => {
          return createPostFailed(err);
        });
    }),
  );

const postEpic$ = combineEpics(createPost$, getAddress$);
export default postEpic$;

import {combineEpics} from 'redux-observable';
import rootEpic$ from './root/epic';
import {loginStart$} from '../screens/Auth/redux/epic';
import postEpic$ from '../screens/Post/redux/epic';
const appEpic = combineEpics(rootEpic$, loginStart$, postEpic$);

export default appEpic;

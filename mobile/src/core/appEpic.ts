import {combineEpics} from 'redux-observable';
import rootEpic$ from './root/epic';
import {loginStart$} from '../screens/Auth/redux/epic';
import postEpic$ from '../screens/Post/redux/epic';
import homeEpic$ from '../screens/Home/redux/epic';
const appEpic = combineEpics(rootEpic$, loginStart$, postEpic$, homeEpic$);

export default appEpic;

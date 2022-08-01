import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import appEpic from "./appEpic"
import appReducer from './appReducer';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'rootApp',
    version: 1,
    storage: AsyncStorage,
    whitelist: ["rootStore"]
};
const epicMiddleware = createEpicMiddleware();

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([logger, epicMiddleware]),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

epicMiddleware.run(appEpic);
export default store
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext, reachify } from 'redux-first-history';
import createSagaMiddleware from 'redux-saga';
import { authReducer } from '../features/auth/authSlice';
import testReducer from '../features/test/testSlice';
import { userReducer } from '../features/user/userSlice';
import rootSaga from './rootSaga';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  // other options if needed
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    router: routerReducer,
    test: testReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware),
});

sagaMiddleware.run(rootSaga);

export const history = createReduxHistory(store);
// if you use @reach/router
export const reachHistory = reachify(history);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> =
  ThunkAction<ReturnType, AppState, unknown, Action<string>
  >;

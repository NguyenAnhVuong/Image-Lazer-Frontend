import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import searchSaga from '../features/search/searchSaga';
import userSaga from '../features/user/userSaga';

export default function* rootSaga() {
  yield all([authSaga(), userSaga(), searchSaga()]);
}

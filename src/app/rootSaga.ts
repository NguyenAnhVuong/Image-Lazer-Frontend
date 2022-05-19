import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import testSaga from '../features/test/testSaga';

export default function* rootSaga() {
  yield all([testSaga(), authSaga()]);
}

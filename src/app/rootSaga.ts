import { all } from 'redux-saga/effects';
import testSaga from '../features/test/testSaga';

export default function* rootSaga() {
    yield all([testSaga()]);
}
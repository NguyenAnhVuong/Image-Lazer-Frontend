import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';
import { call, put, takeLatest } from 'redux-saga/effects';
import authAPi from '../../api/authApi';
import { LoginUser } from '../../models';
import { authActions } from './authSlice';

function* loginSaga(action: PayloadAction<LoginUser>): any {
  try {
    const res = yield call(authAPi.login, action.payload);
    if (res && res.data && res.data.accessToken && res.data.userName) {
      yield put(authActions.loginSuccess(res.data.userName));
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('userName', res.data.userName);
      yield put(push('/'));
    } else {
      yield put(authActions.loginFailed());
    }
  } catch (error) {
    yield put(authActions.loginFailed());
  }
}

export default function* authSaga() {
  yield takeLatest(authActions.loginStart.type, loginSaga);
}

import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';
import { call, put, takeLatest } from 'redux-saga/effects';
import authAPi from '../../api/authApi';
import { LoginUser } from '../../models';
import { authActions } from './authSlice';

function* login(action: PayloadAction<LoginUser>): any {
  try {
    const res = yield call(authAPi.login, action.payload);
    if (res && res && res.accessToken) {
      yield put(authActions.loginSuccess());
      localStorage.setItem('accessToken', res.accessToken);
      yield put(push('/'));
    } else {
      yield put(authActions.loginFailed());
    }
  } catch (error) {
    yield put(authActions.loginFailed());
  }
}

export default function* authSaga() {
  yield takeLatest(authActions.loginStart.type, login);
}

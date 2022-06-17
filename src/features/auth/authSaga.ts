import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';
import { call, put, takeLatest } from 'redux-saga/effects';
import authAPi from '../../api/authApi';
import { LoginUser } from '../../models';
import { authActions } from './authSlice';

function* loginSaga(action: PayloadAction<LoginUser>): any {
  try {
    const res = yield call(authAPi.login, action.payload);
    if (res && res && res.accessToken && res.userName && res.id) {
      yield put(authActions.loginSuccess(res.userName));
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('userName', res.userName);
      // localStorage.setItem('id', res.id);
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

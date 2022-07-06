import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import userAPi from '../../api/userApi';
import { userActions } from './userSlice';

function* getUserSaga(action: PayloadAction<string>): any {
  try {
    const res = yield call(userAPi.getUserByUserName, action.payload);
    if (res && !res.errorCode) {
      const user = {
        id: res.id,
        userName: res.userName,
        email: res.email,
        age: res.age,
        avatar: res.avatar,
        topics: res.topics,
        fullName: res.fullName,
        followers: res.followers,
        following: res.following,
        createdImages: res.createdImages,
        albums: res.albums,
      };
      yield put(userActions.getUserSuccess(user));
    } else {
      yield put(userActions.getUserFailed());
    }
  } catch (error) {
    yield put(userActions.getUserFailed());
  }
}

export default function* userSaga() {
  yield takeLatest(userActions.getUserStart.type, getUserSaga);
}

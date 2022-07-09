import { PayloadAction } from '@reduxjs/toolkit';
import {
  call, debounce, put, takeLatest,
} from 'redux-saga/effects';
import { searchActions } from './searchSlice';
import { topics } from '../../models';
import userAPi from '../../api/userApi';

function* Suggestions(action: PayloadAction<string>): any {
  const suggestions: any[] = [];
  const res = yield call(userAPi.searchUser, action.payload);
  if (res && !res.errorCode) {
    res.users.forEach((user: any) => {
      suggestions.push({
        avatarSrc: user.avatarSrc,
        title: user.fullName,
        subTitle: user.userName,
      });
    });
  }
  // eslint-disable-next-line consistent-return, array-callback-return
  topics.map((topic) => {
    if (topic.name.toLowerCase().includes(action.payload.toLowerCase())) {
      suggestions.push({
        avatarSrc: topic.image.src,
        title: topic.name,
        subTitle: '',
      });
    }
  });
  if (action.payload) {
    yield put(searchActions.setSuggestions(suggestions));
  } else {
    yield put(searchActions.setSuggestions([]));
  }
}

function* handleSearchDebounce(action: PayloadAction<string>) {
  yield put(searchActions.setSearch(action.payload));
}

export default function* searchSaga() {
  yield takeLatest(searchActions.setSearch.type, Suggestions);
  yield debounce(500, searchActions.setSearchWithDebounce.type, handleSearchDebounce);
}

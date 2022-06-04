import { call, put, takeLatest } from 'redux-saga/effects';
import albumsApi from '../../api/albumsApi';
// import albumsApi from '../../api/albumsApi';
import { albumsActions } from './albumSlice';

function* getAlbumsSaga(): any {
  try {
    const res = yield call(albumsApi.getAlbums);
    if (res && res.data && res.data.length > 0) {
      yield put(albumsActions.getAlbumsSuccess(res.data));
    } else {
      yield put(albumsActions.getAlbumsFailed());
    }
  } catch (error) {
    yield put(albumsActions.getAlbumsFailed());
  }
}

export default function* albumsSaga() {
  yield takeLatest(albumsActions.getAlbumsStart.type, getAlbumsSaga);
}

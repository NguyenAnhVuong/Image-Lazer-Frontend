import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlbumInformation } from '../../models';

export interface AlbumState {
  loading: boolean;
  albums: AlbumInformation[];
  success: boolean;
  error: boolean;
}

export const initialState: AlbumState = {
  loading: false,
  albums: [],
  success: false,
  error: false,
};

const albumSlide = createSlice({
  name: 'album',
  initialState,
  reducers: {
    getAlbumsStart(state) {
      state.loading = true;
    },
    getAlbumsSuccess(state, action: PayloadAction<AlbumInformation[]>) {
      state.loading = false;
      state.albums = action.payload;
      state.success = true;
    },
    getAlbumsFailed(state) {
      state.loading = false;
      state.success = false;
      state.error = true;
    },
  },
});
export const albumsActions = albumSlide.actions;
export const albumsReducer = albumSlide.reducer;

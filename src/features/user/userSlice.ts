import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInformation } from '../../models';

export interface UserState {
  loading: boolean;
  user: UserInformation;
  success: boolean;
  error: boolean;
}
export const initialState: UserState = {
  loading: false,
  user: {
    id: '',
    userName: '',
    fullName: '',
    avatar: '',
    email: '',
    topics: [],
    followers: [],
    following: [],
    createdImages: [],
    albums: [],
    markMessageAsUnread: [],
    markNotificationAsUnread: {
      likes: [],
      comments: [],
    },
  },
  success: false,
  error: false,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getUserStart(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    getUserSuccess(state, action: PayloadAction<UserInformation>) {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
    },
    getUserFailed(state) {
      state.loading = false;
      state.success = false;
      state.error = true;
    },
  },
});
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

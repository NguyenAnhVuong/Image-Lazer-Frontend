import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginUser } from '../../models';

export interface AuthState {
  loading: boolean;
  userName: string;
  success: boolean;
  error: boolean;
}

const initialState: AuthState = {
  loading: false,
  userName: '',
  success: false,
  error: false,
};

const authSlide = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginStart(state, action: PayloadAction<LoginUser>) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.userName = action.payload;
      state.success = true;
    },
    loginFailed(state) {
      state.loading = false;
      state.success = false;
      state.error = true;
    },
    logout(state) {
      state.userName = '';
      state.success = false;
      state.error = false;
    },
  },
});

export const authActions = authSlide.actions;
export const authReducer = authSlide.reducer;

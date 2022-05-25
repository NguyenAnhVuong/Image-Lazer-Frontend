import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginUser } from '../../models';

export interface AuthState {
  loading: boolean;
  success: boolean;
}

const initialState: AuthState = {
  loading: false,
  success: false,
};

const authSlide = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginStart(state, action: PayloadAction<LoginUser>) {
      state.loading = true;
    },
    loginSuccess(state) {
      state.success = true;
      state.loading = false;
    },
    loginFailed(state) {
      state.loading = false;
    },
  },
});

export const authActions = authSlide.actions;
export const authReducer = authSlide.reducer;

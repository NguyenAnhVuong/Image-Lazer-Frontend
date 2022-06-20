import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  test: false,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    test(state, action: PayloadAction<boolean>) {
      state.test = action.payload;
    },
  },
});

export const testActions = testSlice.actions;
export default testSlice.reducer;

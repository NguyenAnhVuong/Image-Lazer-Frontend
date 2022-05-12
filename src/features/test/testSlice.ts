import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  test: 'test',
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    test(state) {
      state.test = 'test';
    },
  },
});

export const testActions = testSlice.actions;
export default testSlice.reducer;

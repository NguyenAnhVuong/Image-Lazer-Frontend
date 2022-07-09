import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  open: boolean;
  search: string;
  suggestions: any[];
  topic: string;
}

const initialState: SearchState = {
  open: false,
  search: '',
  suggestions: [],
  topic: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    openSearch(state) {
      state.open = true;
    },
    closeSearch(state) {
      state.open = false;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSearchWithDebounce(state, action: PayloadAction<string>) {
    },
    setSuggestions(state, action: PayloadAction<any[]>) {
      state.suggestions = action.payload;
    },
    setTopic(state, action: PayloadAction<string>) {
      state.topic = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

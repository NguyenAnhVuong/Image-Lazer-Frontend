import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SetChosenChatDetails {
  id: string;
  fullName: string;
}

export interface SetMessages {
  messages: any;
}

interface ChosenChatDetails {
  id?: string;
  fullName?: string;
  avatar?: string;
  email?: string;
}

export interface ChatState {
  chosenChatDetails: ChosenChatDetails;
  messages: [];
}

const initialState: ChatState = {
  chosenChatDetails: {},
  messages: [],
};

const chatSlide = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setChosenChatDetails(state, action: PayloadAction<SetChosenChatDetails>) {
      state.chosenChatDetails = action.payload;
    },
    setMessages(state, action: PayloadAction<SetMessages>) {
      state.messages = action.payload.messages;
    },
  },
});

export const chatActions = chatSlide.actions;
export const chatReducer = chatSlide.reducer;

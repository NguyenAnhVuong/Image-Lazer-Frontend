import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SetChosenCommentDetails {
  id: string;
  title: string;
}

export interface Comment {
  _id: string;
  author: any;
  content: string;
  parentCommentId?: string;
  likes?: any[];
  createAt: Date;
}

export interface SetComments {
  comments: Comment[] | [];
}

interface ChosenCommentDetails {
  id?: string;
  title?: string;
}

export interface CommentState {
  chosenCommentDetails: ChosenCommentDetails;
  comments: Comment[];
}

const initialState : CommentState = {
  chosenCommentDetails: {},
  comments: [],
};

const CommentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setChosenCommentDetails(state, action: PayloadAction<SetChosenCommentDetails>) {
      state.chosenCommentDetails = action.payload;
    },
    setComments(state, action: PayloadAction<SetComments>) {
      state.comments = action.payload.comments;
    },
  },
});

export const commentActions = CommentSlice.actions;
export const commentReducer = CommentSlice.reducer;

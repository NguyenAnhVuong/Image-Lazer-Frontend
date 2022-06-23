/* eslint-disable import/prefer-default-export */
import { store } from '../app/store';
import { commentActions, Comment } from '../features/comment/commentSlice';

interface UpdateCommentHistory {
  imageId: string;
  comments: Comment[];
}

const updateCommentHistoryIfSameImageActive = ({ imageId, comments }:UpdateCommentHistory) => {
  if (imageId) {
    console.log('irene');
    store.dispatch(commentActions.setComments({ comments }));
  }
};

export const updateDirectCommentHistoryIfActive = (data:any) => {
  const { chosenCommentDetails } = store.getState().comment;
  const id = store.getState().user.user.id || '';

  const { imageId, comments } = data;

  const imagePostId = chosenCommentDetails?.id;
  const userId = id;

  console.log('irene');

  if (imagePostId && userId) {
    updateCommentHistoryIfSameImageActive({ imageId, comments });
  }
};

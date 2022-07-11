/* eslint-disable @typescript-eslint/no-shadow */
import { Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import {
  getDirectCommentHistory,
  sendDirectComment, sendDirectNotificationComment,
} from '../../realtimeCommunication/socketConnection';

const { TextArea } = Input;

const ImageComments = () => {
  const [comment, setComment] = useState<string>('');
  const divElement = useRef<HTMLDivElement>(null);
  const avatar = useAppSelector((state: AppState) => state.user.user.avatar);
  const chosenCommentDetails = useAppSelector((state: AppState) => state.comment.chosenCommentDetails);
  const comments = useAppSelector((state: AppState) => state.comment.comments);

  const handleCommentValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleComment = () => {
    if (comment.length > 0) {
      sendDirectComment({
        imageId: chosenCommentDetails.id,
        content: comment,
        parentCommentId: null,
      });
      sendDirectNotificationComment(chosenCommentDetails.id || '');
      setComment('');
    }
  };

  useEffect(() => {
    if (divElement.current) {
      divElement.current.scrollTop = divElement.current.scrollHeight;
    }
  });

  useEffect(() => {
    getDirectCommentHistory(chosenCommentDetails.id || '');
  }, [chosenCommentDetails]);

  return (
    <div>
      <h1 className="text-xl">
        {comments ? `${comments.length} Nhận xét` : 'Nhận xét'}
      </h1>
      <div
        className="w-full max-h-[432px] overflow-y-auto overflow-x-hidden custom-scroll"
        ref={divElement}
      >
        {comments
          && comments.map((comment: any) => (
            <div>
              <div>
                <div className="flex items-center">
                  <img
                    src={`/uploads/${comment.author.avatar}`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mr-4"
                  />
                  <span className="break-words text-left font-bold text-base">
                    {comment.author.fullName}
                  </span>
                </div>
                <div className="p-2 text-left max-w-[100%] h-auto break-words">
                  <p>{comment.content}</p>
                </div>
              </div>
              {/* <div>
                <span>time</span>
                <p>Trả lời</p>
                <p>Trái tim</p>
              </div> */}
            </div>
          ))}
      </div>
      <div className="flex">
        <img
          src={`/uploads/${avatar}`}
          alt="avatar"
          className="w-12 h-12 rounded-full mr-4"
        />
        <TextArea
          className="rounded-2xl text-base font-bold px-5 py-3"
          placeholder="Thêm bình luận"
          autoSize={{ minRows: 2, maxRows: 6 }}
          value={comment}
          onChange={handleCommentValueChange}
        />
        <div style={{ margin: '24px 0' }} />
      </div>
      <div className="flex justify-end mt-5">
        <button
          className="bg-graybg px-3 py-2 rounded-3xl font-bold text-base"
          type="button"
        >
          Hủy
        </button>
        <button
          className="bg-primary px-3 py-2 rounded-3xl text-base font-bold text-white ml-4"
          type="button"
          onClick={handleComment}
        >
          Đã xong
        </button>
      </div>
    </div>
  );
};

export default ImageComments;

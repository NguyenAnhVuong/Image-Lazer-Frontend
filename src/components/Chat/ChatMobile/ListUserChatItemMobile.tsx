/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
import { Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import userAPi from '../../../api/userApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppState } from '../../../app/store';
import { chatActions } from '../../../features/chat/chatSlice';
import { userActions } from '../../../features/user/userSlice';
import {
  deleteNotificationMessage,
  getDirectChatHistory,
  sendDirectMessage,
  sendDirectNotificationMessage,
} from '../../../realtimeCommunication/socketConnection';

interface FollowedUser {
  id: string;
  fullName: string;
  avatar: string;
  email: string;
  userName: string;
}

interface Message {
  _id: string;
  author: any;
  content: string;
}

const ListUserChatItemMobile = () => {
  const [user, setUser] = useState<FollowedUser>();
  const [message, setMessage] = useState<string>('');
  const divElement = useRef<HTMLDivElement>(null);
  const { userName } = useParams();
  const navigate = useNavigate();
  const userNameClient = useAppSelector(
    (state: AppState) => state.user.user.userName,
  );

  const chosenChatDetails = useAppSelector(
    (state: AppState) => state.chat.chosenChatDetails,
  );
  const dispatch = useAppDispatch();

  const messages = useAppSelector((state: AppState) => state.chat.messages);

  const handleMessageValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
      setMessage('');
      sendDirectNotificationMessage(chosenChatDetails.id || '');
      if (userNameClient) {
        dispatch(userActions.getUserStart(userNameClient));
      }
      setMessage('');
    }
  };

  const handleNotificationMessage = () => {
    if (chosenChatDetails.id && userNameClient) {
      deleteNotificationMessage(chosenChatDetails.id);
      dispatch(userActions.getUserStart(userNameClient));
    }
  };

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    getDirectChatHistory(chosenChatDetails.id || '');
  }, [chosenChatDetails]);

  useEffect(() => {
    if (divElement.current) {
      divElement.current.scrollTop = divElement.current.scrollHeight;
    }
  });

  const getUser = async () => {
    if (userName) {
      const res = await userAPi.getUserByUserName(userName);
      if (res) {
        setUser({
          id: res.id,
          fullName: res.fullName,
          avatar: res.avatar,
          email: res.email,
          userName: res.userName,
        });
      }
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  return (
    <>
      <div className="flex mb-6 mt-4">
        <span className="flex-none">
          <IoIosArrowBack
            className="text-2xl cursor-pointer"
            onClick={() => {
              dispatch(chatActions.setMessages({ messages: [] }));
              dispatch(
                chatActions.setChosenChatDetails({ id: '', fullName: '' }),
              );
              navigate(-1);
            }}
          />
        </span>
        <div className="grow flex justify-center">
          <button
            type="button"
            className="text-base font-bold"
            onClick={() => navigate(`/user/${userName}`)}
          >
            {user?.fullName}
          </button>
        </div>
      </div>
      <div className="relative h-[91vh] z-10">
        <div className="custom-scroll overflow-auto h-[85%]" ref={divElement}>
          {messages
            && messages.map((message: Message, index) => (
              // <div className={(email !== message.author.email) ? 'flex justify-end' : 'flex justify-start'}>
              <div
                className={`flex items-center ${
                  user?.email !== message.author.email
                    ? 'justify-end'
                    : 'justify-start'
                }`}
                key={message._id}
              >
                {(user?.email === message.author.email
                  && messages[index + 1]
                  && user?.email !== messages[index + 1].author.email)
                || (index + 1 === messages.length
                  && user?.email === message.author.email) ? (
                    <img
                      src={`/uploads/${user?.avatar}`}
                      alt="avatar"
                      className="rounded-full w-12 h-12"
                    />
                  ) : (
                    <div className="w-12 h-12" />
                  )}
                <div className="flex flex-col w-[calc(100% - 2rem)]">
                  {((user?.email === message.author.email
                    && messages[index - 1]
                    && user?.email !== messages[index - 1].author.email)
                    || (index === 0 && user?.email === message.author.email)) && (
                    <span className="text-left mx-4 mb-1">{user?.fullName}</span>
                  )}

                  {((user?.email !== message.author.email
                    && messages[index - 1]
                    && user?.email === messages[index - 1].author.email)
                    || (index === 0 && user?.email !== message.author.email)) && (
                    <span className="text-right mx-4">Bạn</span>
                  )}
                  <div key={message._id} className="mx-4">
                    <p
                      className={`font-medium text-sm w-fit ${
                        user?.email === message.author.email
                          ? 'rounded-2xl bg-[#efefef] p-3 shadow-md'
                          : 'rounded-2xl bg-[#fff] p-3 shadow-md'
                      }`}
                    >
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex absolute space-x-2 h-[9%] bottom-[15px] inset-x-0">
          <Input
            placeholder="Nhập tin nhắn"
            className="rounded-3xl "
            value={message}
            onChange={handleMessageValueChange}
            onKeyDown={handleKeyPressed}
            onFocus={handleNotificationMessage}
          />
          <BiSend
            className="rounded-full min-w-fit h-auto bg-red-600 p-2 text-white cursor-pointer"
            size={48}
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default ListUserChatItemMobile;

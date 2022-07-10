/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
import { Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import userAPi from '../../../api/userApi';
import { useAppSelector } from '../../../app/hooks';
import { AppState } from '../../../app/store';
import {
  getDirectChatHistory,
  sendDirectMessage,
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

  const chosenChatDetails = useAppSelector(
    (state: AppState) => state.chat.chosenChatDetails,
  );
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
      {/* <div className="flex mb-6 mt-5"> */}
      <div className="fixed top-0 flex px-2 w-full h-14 items-center bg-white header-shadow xl:hidden z-10">
        <button
          type="button"
          className="flex-none z-10"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoIosArrowBack className="text-2xl cursor-pointer p-3" size={48} />
        </button>
        <div className="absolute top-0 left-0 h-14 w-full flex items-center justify-center">
          <button
            type="button"
            className="text-base font-bold grow text-center mt-3"
            onClick={() => { if (user) navigate(`/user/${user.userName}`); }}
          >
            {user?.fullName}
          </button>
        </div>
      </div>
      <div className="relative h-[90%]">
        <div className="custom-scroll overflow-auto h-[85%]" ref={divElement}>
          {messages
            && messages.map((message: Message, index) => (
              // <div className={(email !== message.author.email) ? 'flex justify-end' : 'flex justify-start'}>
              <div
                key={message._id}
                className={`grid items-center ${
                  user?.email !== message.author.email
                    ? 'justify-end'
                    : 'justify-start grid-cols-[24px]'
                }`}
              >
                {((user?.email === message.author.email
                  && messages[index + 1]
                  && user?.email !== messages[index + 1].author.email)
                  || (index + 1 === messages.length
                    && user?.email === message.author.email)) && (
                    <img
                      src={`/uploads/${user?.avatar}`}
                      alt="avatar"
                      className="rounded-full w-6 h-6"
                    />
                )}
                <div
                  key={message._id}
                  className={`flex flex-col mx-4 ${
                    user?.email === message.author.email && 'col-start-2'
                  }`}
                >
                  {((user?.email === message.author.email
                    && messages[index - 1]
                    && user?.email !== messages[index - 1].author.email)
                    || (index === 0 && user?.email === message.author.email)) && (
                    <span className="text-left">{user?.fullName}</span>
                  )}

                  {((user?.email !== message.author.email
                    && messages[index - 1]
                    && user?.email === messages[index - 1].author.email)
                    || (index === 0 && user?.email !== message.author.email)) && (
                    <span className="text-right">Bạn</span>
                  )}
                  <p
                    className={`font-medium text-sm ${
                      user?.email === message.author.email
                        ? 'rounded-2xl bg-[#efefef] p-3'
                        : 'rounded-2xl bg-[#fff] p-3 shadow-md'
                    }`}
                  >
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="flex absolute space-x-2 bottom-0 inset-x-0">
          <Input
            placeholder="メッセージを入力する"
            className="rounded-3xl "
            value={message}
            onChange={handleMessageValueChange}
            onKeyDown={handleKeyPressed}
          />
          <BiSend
            className="rounded-full min-w-fit bg-red-600 p-2 text-white cursor-pointer"
            size={48}
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default ListUserChatItemMobile;

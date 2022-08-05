/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
import { Input, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppState } from '../../../app/store';
import { chatActions } from '../../../features/chat/chatSlice';
import { userActions } from '../../../features/user/userSlice';
import {
  deleteNotificationMessage, getDirectChatHistory, sendDirectMessage, sendDirectNotificationMessage,
} from '../../../realtimeCommunication/socketConnection';

interface User {
  avatar: string;
  id: string;
  userName: string;
  fullName: string;
  email: string;
  closeModalMessages: () => void;
  openModalMessages: () => void;
}

interface Message {
  _id: string;
  author: any;
  content: string;
}

const ListUserChatItem = (props: User) => {
  const [message, setMessage] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const divElement = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const following = useAppSelector((state: AppState) => state.user.user.following);
  const userNameClient = useAppSelector((state: AppState) => state.user.user.userName);

  const {
    id, fullName, avatar, email, userName, closeModalMessages, openModalMessages,
  } = props;

  const showModal = () => {
    closeModalMessages();
    setIsModalVisible(true);
  };

  const chosenChatDetails = useAppSelector(
    (state: AppState) => state.chat.chosenChatDetails,
  );
  const messages = useAppSelector((state: AppState) => state.chat.messages);
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    setIsModalVisible(false);
    dispatch(chatActions.setChosenChatDetails({ id: '', fullName: '' }));
    dispatch(chatActions.setMessages({ messages: [] }));
  };

  const handleChooseActiveConversation = () => {
    showModal();
    dispatch(chatActions.setChosenChatDetails({ id, fullName }));
  };

  const handleMessageValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
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
    if (chosenChatDetails.id !== '' && chosenChatDetails.id !== undefined) { deleteNotificationMessage(chosenChatDetails.id); }
  }, [chosenChatDetails]);

  useEffect(() => {
    if (divElement.current) {
      divElement.current.scrollTop = divElement.current.scrollHeight;
    }
  });

  return (
    <>
      <button
        type="button"
        onClick={handleChooseActiveConversation}
        className="flex w-full"
      >
        <img
          src={`/uploads/${avatar}`}
          alt="avatar"
          className="rounded-full h-12 w-12 mr-2"
        />
        <div className="flex flex-col">
          <h3 className="text-base mb-0">{fullName}</h3>
          {following && following.find((f) => f.id === id) ? (
            <p className="w-fit">Đang theo dõi</p>
          ) : (
            <p className="text-left">Tin nhắn mới</p>
          )}
        </div>
      </button>
      <Modal
        visible={isModalVisible}
        mask={false}
        footer={null}
        onCancel={handleCancel}
        closable={false}
        wrapClassName="customBorderRadiusAntModal customPositionAntModal"
      >
        <div className="flex mb-6">
          <span className="flex-none">
            <IoIosArrowBack
              className="text-2xl cursor-pointer"
              onClick={() => {
                dispatch(chatActions.setMessages({ messages: [] }));
                setIsModalVisible(false);
                dispatch(
                  chatActions.setChosenChatDetails({ id: '', fullName: '' }),
                );
                openModalMessages();
              }}
            />
          </span>
          <div className="grow flex justify-center">
            <button
              type="button"
              className="text-base font-bold"
              onClick={() => navigate(`/user/${userName}`)}
            >
              {fullName}
            </button>
          </div>
        </div>
        <div className="relative h-[90%]">
          <div className="custom-scroll overflow-auto h-[85%]" ref={divElement}>
            {messages
              && messages.map((message: Message, index) => (
                // <div className={(email !== message.author.email) ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={`flex items-center ${
                    email !== message.author.email
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                  key={message._id}
                >
                  {(email === message.author.email
                    && messages[index + 1]
                    && email !== messages[index + 1].author.email)
                  || (index + 1 === messages.length
                    && email === message.author.email) ? (
                      <img
                        src={`/uploads/${avatar}`}
                        alt="avatar"
                        className="rounded-full w-12 h-12"
                      />
                    ) : (
                      <div className="w-12 h-12" />
                    )}
                  <div className="flex flex-col w-[calc(100% - 2rem)]">
                    {((email === message.author.email
                      && messages[index - 1]
                      && email !== messages[index - 1].author.email)
                      || (index === 0 && email === message.author.email)) && (
                      <span className="text-left mx-4 mb-1">{fullName}</span>
                    )}

                    {((email !== message.author.email
                      && messages[index - 1]
                      && email === messages[index - 1].author.email)
                      || (index === 0 && email !== message.author.email)) && (
                      <span className="text-right mx-4">Bạn</span>
                    )}
                    <div key={message._id} className="mx-4">
                      <p
                        className={`font-medium text-sm w-fit ${
                          email === message.author.email
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
          <div className="flex absolute space-x-2 bottom-0 inset-x-0">
            <Input
              placeholder="Nhập tin nhắn"
              className="rounded-3xl "
              value={message}
              onChange={handleMessageValueChange}
              onKeyDown={handleKeyPressed}
              onFocus={handleNotificationMessage}
            />
            <BiSend
              className="rounded-full min-w-fit bg-red-600 p-2 text-white cursor-pointer"
              size={48}
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ListUserChatItem;
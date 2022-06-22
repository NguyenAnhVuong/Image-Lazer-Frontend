/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
import { Button, Input, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { BiSend } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { getDirectChatHistory, sendDirectMessage } from '../../../realtimeCommunication/socketConnection';
import { AppState } from '../../../app/store';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { chatActions } from '../../../features/chat/chatSlice';

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

  const {
    id, fullName, avatar, email, userName, closeModalMessages, openModalMessages,
  } = props;

  const showModal = () => {
    closeModalMessages();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const chosenChatDetails = useAppSelector(
    (state: AppState) => state.chat.chosenChatDetails,
  );
  const messages = useAppSelector((state: AppState) => state.chat.messages);
  const dispatch = useAppDispatch();

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

  return (
    <>
      <Button
        type="link"
        onClick={handleChooseActiveConversation}
        size="large"
        className="grid grid-rows-2 gap-3 grid-flow-col mt-5 text-left"
      >
        <img
          src={avatar}
          alt="avatar"
          className="rounded-full h-8 w-8 row-span-2 m-[10px]"
        />
        <h3 className="text-lg col-span-1">{fullName}</h3>
        {following && following.find((f) => f.id === id) ? (
          <p className="col-span-1">Đang theo dõi</p>
        ) : (
          <p className="col-span-1">Đề xuất</p>
        )}
      </Button>
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
                openModalMessages();
              }}
            />
          </span>
          <button
            type="button"
            className="text-base font-bold grow text-center"
            onClick={() => navigate(`/user/${userName}`)}
          >
            {fullName}
          </button>
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
                >
                  {(email === message.author.email
                    && messages[index + 1]
                    && email !== messages[index + 1].author.email)
                  || (index + 1 === messages.length
                    && email === message.author.email) ? (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="rounded-full w-6 h-6"
                      />
                    ) : (
                      <div className="w-6 h-6" />
                    )}
                  <div className="flex flex-col w-[calc(100% - 2rem)]">
                    {((email === message.author.email
                      && messages[index - 1]
                      && email !== messages[index - 1].author.email)
                      || (index === 0 && email === message.author.email)) && (
                      <span className="text-left mx-4">{fullName}</span>
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

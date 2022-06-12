/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
import { Button, Input, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { BiSend } from 'react-icons/bi';
import { getDirectChatHistory, sendDirectMessage } from '../../realtimeCommunication/socketConnection';
import { AppState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { chatActions } from '../../features/chat/chatSlice';

interface User {
  avatar: string;
  id: string;
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

  const {
    id, fullName, avatar, email, closeModalMessages, openModalMessages,
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
        className="grid grid-rows-2 gap-3 grid-flow-col mt-5"
      >
        <img src={avatar} alt="avatar" className="rounded-full h-8 w-8 row-span-2 m-[10px]" />
        <h3 className="text-lg col-span-1">{fullName}</h3>
        <p className="col-span-1">Đang theo dõi</p>
      </Button>
      <Modal
        style={{ top: 90, left: '39vw' }}
        visible={isModalVisible}
        mask={false}
        footer={null}
        onCancel={handleCancel}
        closable={false}
        wrapClassName="customBorderRadiusAntModal"
      >
        <div className="flex mb-6">
          <span className="flex-none">
            <IoIosArrowBack
              className="text-2xl cursor-pointer"
              onClick={() => {
                setIsModalVisible(false);
                openModalMessages();
              }}
            />
          </span>
          <h1 className="text-base font-bold grow text-center">{fullName}</h1>
        </div>
        <div className="relative h-[90%]">
          <div className="custom-scroll overflow-auto h-[85%]" ref={divElement}>
            {messages
              && messages.map((message: Message, index) => (
                // <div className={(email !== message.author.email) ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={`grid items-center ${
                    email !== message.author.email
                      ? 'justify-end'
                      : 'justify-start grid-cols-[24px]'
                  }`}
                >
                  {((email === message.author.email
                    && messages[index + 1]
                    && email !== messages[index + 1].author.email)
                    || (index + 1 === messages.length
                      && email === message.author.email)) && (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="rounded-full w-6 h-6"
                      />
                  )}
                  <div
                    key={message._id}
                    className={`flex flex-col mx-4 ${
                      email === message.author.email && 'col-start-2'
                    }`}
                  >
                    {((email === message.author.email
                      && messages[index - 1]
                      && email !== messages[index - 1].author.email)
                      || (index === 0 && email === message.author.email)) && (
                      <span className="text-left">{fullName}</span>
                    )}

                    {((email !== message.author.email
                      && messages[index - 1]
                      && email === messages[index - 1].author.email)
                      || (index === 0 && email !== message.author.email)) && (
                      <span className="text-right">Bạn</span>
                    )}
                    <p
                      className={`font-medium text-sm ${
                        email === message.author.email
                        && 'rounded-2xl bg-[#efefef] p-3'
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

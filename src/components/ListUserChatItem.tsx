/* eslint-disable @typescript-eslint/no-shadow */
import { Button, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { BiSend } from 'react-icons/bi';
import { getDirectChatHistory, sendDirectMessage } from '../realtimeCommunication/socketConnection';
import { AppState } from '../app/store';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { chatActions } from '../features/chat/chatSlice';

interface User {
  avatar: string;
  id: string;
  fullName: string;
  email: string;
  closeModalMessages: () => void;
  openModalMessages: () => void;
}

const ListUserChatItem = (props: User) => {
  const [message, setMessage] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  return (
    <>
      <Button onClick={handleChooseActiveConversation}>{fullName}</Button>
      <Modal
        style={{ top: 90, left: '39vw' }}
        visible={isModalVisible}
        mask={false}
        footer={null}
        onCancel={handleCancel}
        closable={false}
        wrapClassName='customBorderRadiusAntModal'
      >
        <div className='flex mb-6'>
          <span className='flex-none'>
            <IoIosArrowBack
              className='text-2xl cursor-pointer'
              onClick={() => {
                setIsModalVisible(false);
                openModalMessages();
              }}
            />
          </span>
          <h1 className='text-base font-bold grow text-center'>{fullName}</h1>
        </div>
        <div className='relative h-[90%]'>
          <div className='custom-scroll overflow-auto h-[85%]'>
            <p>{id}</p>
            <p>{email}</p>
            <p>{avatar}</p>
            {messages && messages.map((message) => <p>{message}</p>)}
          </div>
          <div className='flex absolute space-x-2 bottom-0 inset-x-0'>
            <Input
              placeholder='Nhập tin nhắn'
              className='rounded-3xl '
              value={message}
              onChange={handleMessageValueChange}
              onKeyDown={handleKeyPressed}
            />
            <BiSend
              className='rounded-full min-w-fit bg-red-600 p-2 text-white cursor-pointer'
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

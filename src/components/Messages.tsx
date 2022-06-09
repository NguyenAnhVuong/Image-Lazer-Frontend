import { useState, useEffect } from 'react';
import { AiFillMessage, AiFillEdit } from 'react-icons/ai';
import { Modal } from 'antd';
import {
  connectWithSocketServer,
  // getDirectChatHistory,
  // sendDirectMessage,
} from '../realtimeCommunication/socketConnection';
import MockUser from '../realtimeCommunication/MockUser';
import ListUserChat from './ListUserChat';
// import Message from './Message';

// interface User {
//   id: string;
//   fullName: string;
//   avatar: string;
//   email: string;
//   username: string
// }

const Messages:React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  // const handleMessage = (user:User) => (<Message user={user} />);

  useEffect(() => {
    connectWithSocketServer();
  }, []);
  return (
    <>
      <div className='hidden xl:block'>
        <div className='hover:bg-[#efefef] rounded-full cursor-pointer'>
          <AiFillMessage className='p-3' size={48} onClick={showModal} />
        </div>
        <div style={{ borderRadius: '50%' }}>
          <Modal
            visible={isModalVisible}
            style={{ top: 90, left: '39vw' }}
            closable={false}
            onOk={hideModal}
            onCancel={hideModal}
            // maskStyle={{ background: 'none' }}
            mask={false}
            footer={null}
            wrapClassName='customBorderRadiusAntModal'
          >
            <div className='flex mb-6'>
              <h1 className='text-base font-bold grow text-center'>
                Hộp thư đến
              </h1>
              <span className='flex-none'>
                <AiFillEdit className='text-2xl cursor-pointer' />
              </span>
            </div>
            <ListUserChat
              users={MockUser}
              closeModalMessages={() => setIsModalVisible(false)}
              openModalMessages={() => setIsModalVisible(true)}
            />
            {/* <ListUserChat users={MockUser} closeModalMessages={() => console.log('cai lz gì day')} /> */}
          </Modal>
        </div>
      </div>
      {/* <div className='xl:hidden'>
        <h1>Irene</h1>
      </div> */}
    </>
  );
};

export default Messages;

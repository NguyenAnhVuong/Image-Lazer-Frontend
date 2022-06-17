import { useState, useEffect } from 'react';
import { AiFillMessage } from 'react-icons/ai';
import { Modal } from 'antd';
import {
  connectWithSocketServer,
} from '../../realtimeCommunication/socketConnection';
import ListUserChat from './ListUserChat';
import { useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';

const Messages:React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const following = useAppSelector((state: AppState) => state.user.user.following);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    connectWithSocketServer();
  }, []);
  return (
    <div className="hidden xl:block">
      <div className="hover:bg-[#efefef] rounded-full cursor-pointer">
        <AiFillMessage className="p-3" size={48} onClick={showModal} />
      </div>
      <div style={{ borderRadius: '50%' }}>
        <Modal
          visible={isModalVisible}
          style={{ top: 90, left: '39vw' }}
          closable={false}
          onOk={hideModal}
          onCancel={hideModal}
          mask={false}
          footer={null}
          wrapClassName="customBorderRadiusAntModal"
        >
          <div className="flex mb-6">
            <h1 className="text-base font-bold grow text-center">
              Hộp thư đến
            </h1>
            {/* <span className="flex-none">
                <AiFillEdit className="text-2xl cursor-pointer" />
              </span> */}
          </div>
          <ListUserChat
            users={following || []}
            closeModalMessages={() => setIsModalVisible(false)}
            openModalMessages={() => setIsModalVisible(true)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Messages;

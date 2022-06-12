import { useState, useEffect } from 'react';
import { AiFillMessage } from 'react-icons/ai';
import { Modal } from 'antd';
import {
  connectWithSocketServer,
} from '../../realtimeCommunication/socketConnection';
import ListFollowedUser from '../../realtimeCommunication/ListFollowedUser';
import ListUserChat from './ListUserChat';
import axiosJWT from '../../api/axiosJWT';

const Messages:React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const id = localStorage.getItem('id');
  useEffect(() => {
    connectWithSocketServer();
    if (id) {
      const fetchData = async () => {
        const followers = await axiosJWT.get(`/follows/followedBy/${id}`);
        // eslint-disable-next-line array-callback-return
        followers.data.map((follower: any) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { followed_user_id } = follower;
          // console.log(followed_user_id);
          ListFollowedUser.push(followed_user_id);
        });
      };
      // console.log(MockUser);

      fetchData();
    }
  }, [id]);
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
            users={ListFollowedUser}
            closeModalMessages={() => setIsModalVisible(false)}
            openModalMessages={() => setIsModalVisible(true)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Messages;

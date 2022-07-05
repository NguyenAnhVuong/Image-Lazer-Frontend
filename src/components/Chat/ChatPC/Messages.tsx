import { useState, useEffect } from 'react';
import { AiFillMessage } from 'react-icons/ai';
import { Modal } from 'antd';
import {
  connectWithSocketServer,
} from '../../../realtimeCommunication/socketConnection';
import ListUserChat from './ListUserChat';
import { useAppSelector } from '../../../app/hooks';
import { AppState } from '../../../app/store';
import conversationApi from '../../../api/conversationApi';

interface FollowUser {
  id: string;
  fullName: string;
  avatar: string;
  email: string;
  userName: string;
}

const Messages:React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [followUser, setFollowUser] = useState<FollowUser[]>();
  const following = useAppSelector((state: AppState) => state.user.user.following);
  const userId = useAppSelector(
    (state: AppState) => state.user.user.id,
  );
  const markMessageAsUnread = useAppSelector((state: AppState) => state.user.user.markMessageAsUnread);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const user = new Set<FollowUser>();
        const conversationReceiver = await conversationApi.getConversationReceiverUserId(userId);
        const { data } = conversationReceiver;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (data && following) {
          data.forEach((item: any) => {
            if (!following.find((f) => item.id === f.id)) {
              user.add(item);
            }
          });
          let listUser = Array.from(user);
          listUser = listUser.sort((a, b) => (a.fullName.toLowerCase() < b.fullName.toLowerCase() ? -1 : 1));
          let followingUser = Array.from(following);
          followingUser = followingUser.sort((a, b) => (a.fullName.toLowerCase() < b.fullName.toLowerCase() ? -1 : 1));
          const follower = Array.from(new Set([...followingUser, ...listUser]));
          if (markMessageAsUnread && markMessageAsUnread.length > 0) {
            markMessageAsUnread.forEach((unreadUserId: any) => {
              const fromIndex = follower.indexOf(unreadUserId);
              const element = follower.splice(fromIndex, 1)[0];
              follower.splice(0, 0, element);
            });
          }
          // console.log('following', following);
          console.log('follower', follower);
          setFollowUser(follower);
        }
      }
    };
    fetchData();
  }, [following, isModalVisible, userId, markMessageAsUnread]);
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
          closable={false}
          onOk={hideModal}
          onCancel={hideModal}
          mask={false}
          footer={null}
          wrapClassName="customBorderRadiusAntModal customPositionAntModal"
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
            users={followUser || []}
            closeModalMessages={() => setIsModalVisible(false)}
            openModalMessages={() => setIsModalVisible(true)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Messages;

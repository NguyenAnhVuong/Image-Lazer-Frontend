import { useEffect, useState } from 'react';
import conversationApi from '../../../api/conversationApi';
import { useAppSelector } from '../../../app/hooks';
import { AppState } from '../../../app/store';
import ListUserChatMobile from './ListUserChatMobile';

interface FollowUser {
  id: string;
  fullName: string;
  avatar: string;
  email: string;
  userName: string;
}

const ChatMobile = () => {
  const [followUser, setFollowUser] = useState<FollowUser[]>();
  const following = useAppSelector(
    (state: AppState) => state.user.user.following,
  );
  const userId = useAppSelector((state: AppState) => state.user.user.id);
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
          const listUser = Array.from(user);
          const follower = Array.from(new Set([...following, ...listUser]));
          console.log('listUser', listUser);
          console.log('follower', follower);
          setFollowUser(follower);
        }
      }
    };
    fetchData();
  }, [following, userId]);
  return (
    <div>
      <h3 className="text-lg text-center font-bold mt-5 mb-10">Tin nhắn</h3>
      <ListUserChatMobile followedUsers={followUser || []} />
    </div>
  );
};

export default ChatMobile;

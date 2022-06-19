import { useAppSelector } from '../../../app/hooks';
import { AppState } from '../../../app/store';
import ListUserChatMobile from './ListUserChatMobile';

const ChatMobile = () => {
  const following = useAppSelector(
    (state: AppState) => state.user.user.following,
  );
  return (
    <div>
      <h3 className="text-lg text-center font-bold mt-5 mb-10">Tin nhắn</h3>
      <ListUserChatMobile
        followedUsers={following || []}
      />
    </div>
  );
};

export default ChatMobile;

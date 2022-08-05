import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { chatActions } from '../../../features/chat/chatSlice';

interface Followed {
  id: string
  userName: string;
  avatar: string;
  fullName: string;
}

const ListFollowedUserItem = ({
  id, userName, avatar, fullName,
}: Followed) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChooseActiveConversation = () => {
    dispatch(chatActions.setChosenChatDetails({ id, fullName }));
    navigate(`/messages/${userName}`);
  };

  return (
    <Button
      onClick={() => handleChooseActiveConversation()}
      type="link"
      size="large"
      className="grid grid-rows-2 gap-3 grid-flow-col mt-5 text-left"
    >
      <img
        src={avatar}
        alt="avatar"
        className="rounded-full h-8 w-8 row-span-2 m-[10px]"
      />
      <h3 className="text-lg col-span-1 font-bold">{fullName}</h3>
      <p className="col-span-1 font-medium">Đang theo dõi</p>
    </Button>
  );
};

export default ListFollowedUserItem;

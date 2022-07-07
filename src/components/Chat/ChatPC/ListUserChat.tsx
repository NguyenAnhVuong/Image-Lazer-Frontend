/* eslint-disable react/no-array-index-key */
import ListUserChatItem from './ListUserChatItem';

interface User {
  id: string;
  fullName: string;
  avatar: string;
  email: string;
  userName: string;
}

interface Mock {
  users: User[];
  closeModalMessages: () => void;
  openModalMessages: () => void;
}

const ListUserChat = ({
  users,
  closeModalMessages,
  openModalMessages,
}: Mock) => (
  <>
    {users.map(
      (user, index): JSX.Element => (
        <ListUserChatItem
            // eslint-disable-next-line no-underscore-dangle
          key={index}
          avatar={user.avatar}
          fullName={user.fullName}
          email={user.email}
            // eslint-disable-next-line no-underscore-dangle
          id={user.id}
          userName={user.userName}
          closeModalMessages={() => closeModalMessages()}
          openModalMessages={() => openModalMessages()}
        />
      ),
    )}
  </>
);
export default ListUserChat;

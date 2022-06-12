import ListUserChatItem from './ListUserChatItem';

interface User {
  _id: string;
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
      (user): JSX.Element => (
        <ListUserChatItem
            // eslint-disable-next-line no-underscore-dangle
          key={user._id}
          avatar={user.avatar}
          fullName={user.fullName}
          email={user.email}
            // eslint-disable-next-line no-underscore-dangle
          id={user._id}
          closeModalMessages={() => closeModalMessages()}
          openModalMessages={() => openModalMessages()}
        />
      ),
    )}
  </>
);
export default ListUserChat;

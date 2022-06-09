// import React from 'react';

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
}: Mock) => {
  console.log(users);
  return (
    <>
      {users.map(
        (user): JSX.Element => (
          <ListUserChatItem
            key={user.id}
            avatar={user.avatar}
            fullName={user.fullName}
            email={user.email}
            id={user.id}
            closeModalMessages={() => closeModalMessages()}
            openModalMessages={() => openModalMessages()}
          />
        ),
      )}
    </>
  );
};
export default ListUserChat;

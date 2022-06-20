import ListFollowedUserItem from './ListFollowedUserItem';

interface FollowedUser {
  id: string;
  fullName: string;
  avatar: string;
  email: string;
  userName: string;
}

interface ListFollowedUser {
  followedUsers: FollowedUser[];
}

const ListUserChatMobile = ({ followedUsers }: ListFollowedUser) => (
  <div>
    {followedUsers.map(
      (followedUser): JSX.Element => (
        <ListFollowedUserItem
          key={followedUser.id}
          id={followedUser.id}
          userName={followedUser.userName}
          fullName={followedUser.fullName}
          avatar={followedUser.avatar}
        />
      ),
    )}
  </div>
);

export default ListUserChatMobile;

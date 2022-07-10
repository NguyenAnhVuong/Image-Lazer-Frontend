/* eslint-disable react/no-array-index-key */
import NotificationListItem from './NotificationListItem';

interface NotificationInformation {
  userName: string;
  imageId: string;
  date: Date;
}

interface Notification {
  notifications: NotificationInformation[];
}

const NotificationList = ({ notifications }: Notification) => (
  <>
    {notifications.map(
      (notification, index): JSX.Element => (
        <NotificationListItem
          key={index}
          userName={notification.userName}
          imageId={notification.imageId}
          date={notification.date}
        />
      ),
    )}
  </>
);

export default NotificationList;

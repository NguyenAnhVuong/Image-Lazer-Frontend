/* eslint-disable react/no-array-index-key */
import NotificationListItem from './NotificationListItem';

interface NotificationInformation {
  image: string;
  userName?: string;
  imageId: string;
  fullName: string;
  date: Date;
}

interface Notification {
  notifications: NotificationInformation[];
}

const NotificationList = ({ notifications }: Notification) => (
  <>
    {console.log('notifications: ', notifications)}
    {notifications.map(
      (notification, index): JSX.Element => (
        <NotificationListItem
          key={index}
          image={notification.image}
          fullName={notification.fullName}
          imageId={notification.imageId}
          date={notification.date}
        />
      ),
    )}
  </>
);

export default NotificationList;

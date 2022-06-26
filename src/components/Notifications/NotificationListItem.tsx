import moment from 'moment';

interface NotificationInformation {
  userName: string;
  imageId: string;
  date: Date;
}

const NotificationListItem = ({ userName, imageId, date }:NotificationInformation) => (
  <div>
    <h1>{userName}</h1>
    <h1>{imageId}</h1>
    <p>{moment(date.toString()).fromNow()}</p>
  </div>
);

export default NotificationListItem;

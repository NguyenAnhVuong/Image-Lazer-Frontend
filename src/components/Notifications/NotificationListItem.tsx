import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { commentActions } from '../../features/comment/commentSlice';

interface NotificationInformation {
  userName: string;
  imageId: string;
  date: Date;
}

const NotificationListItem = ({ userName, imageId, date }:NotificationInformation) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleNavigateImage = () => {
    dispatch(
      commentActions.setChosenCommentDetails({
        id: imageId,
        title: '',
      }),
    );
    navigate(`/image/${imageId}`);
  };

  return (
    <button className="p-2 flex flex-col w-full rounded-2xl hover:bg-graybg" type="button" onClick={handleNavigateImage}>
      <h1>
        {userName}
        {' '}
        đã bình luận
      </h1>
      <p>{moment(date.toString()).fromNow()}</p>
    </button>
  );
};

export default NotificationListItem;

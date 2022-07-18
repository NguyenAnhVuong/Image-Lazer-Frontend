import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { commentActions } from '../../features/comment/commentSlice';

interface NotificationInformation {
  fullName: string;
  imageId: string;
  image: string;
  date: Date;
}

const NotificationListItem = ({
  fullName, imageId, image, date,
}:NotificationInformation) => {
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
    <button className="p-2 flex w-full rounded-2xl hover:bg-graybg" type="button" onClick={handleNavigateImage}>
      <img className="h-12 w-12 rounded-2xl mr-2 object-cover" src={`/uploads/${image}`} alt="" />
      <div className="flex flex-col">
        <h1 className="font-bold mb-0">
          {fullName}
          {' '}
          đã bình luận
        </h1>
        <span className="text-left">{moment(date.toString()).fromNow()}</span>
      </div>

    </button>
  );
};

export default NotificationListItem;

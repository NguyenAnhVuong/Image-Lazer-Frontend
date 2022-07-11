import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { userActions } from '../../features/user/userSlice';
import { deleteNotification } from '../../realtimeCommunication/socketConnection';
import NotificationList from './NotificationList';

interface NotificationInformation {
  userName: string;
  imageId: string;
  date: Date;
}

const Notifications = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notification, setNotification] = useState<NotificationInformation[]>([]);
  const [allNotification, setAllNotification] = useState<NotificationInformation[]>([]);

  const notificationsComment = useAppSelector((state: AppState) => state.user.user.markNotificationAsUnread?.comments);
  const notificationsLike = useAppSelector((state: AppState) => state.user.user.markNotificationAsUnread?.likes);
  const userName = useAppSelector((state: AppState) => state.user.user.userName);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notificationsComment !== undefined && notificationsLike !== undefined) {
      const newNotificationsComment = Array.from(notificationsComment);
      newNotificationsComment.sort((a, b) => (a.date.toString() > b.date.toString() ? -1 : 1));
      const newNotificationsLike = Array.from(notificationsLike);
      newNotificationsLike.sort((a, b) => (a.date.toString() > b.date.toString() ? -1 : 1));
      const notifications = [...newNotificationsComment, ...newNotificationsLike];
      setNotification(notifications);
    }
  }, [notificationsComment, notificationsLike]);

  const showModal = () => {
    const newNotifications = Array.from(new Set(notification));
    setAllNotification([...newNotifications, ...allNotification]);
    deleteNotification();
    if (userName) { dispatch(userActions.getUserStart(userName)); }
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    deleteNotification();
  };

  return (
    <>
      <div className="hover:bg-[#efefef] rounded-full cursor-pointer">
        <FaBell className="p-3" size={48} onClick={showModal} />
      </div>
      <Modal
        visible={isModalVisible}
        closable={false}
        onOk={hideModal}
        onCancel={hideModal}
        mask={false}
        footer={null}
        wrapClassName="customBorderRadiusAntModal customPositionAntModal"
      >
        <div className="flex mb-6">
          <h1 className="text-base font-bold grow text-center">通知</h1>
        </div>
        <NotificationList notifications={allNotification || []} />
      </Modal>
    </>
  );
};

export default Notifications;

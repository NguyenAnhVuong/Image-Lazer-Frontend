// eslint-disable-next-line import/no-cycle
import { AlbumCardInformation } from './album';
// eslint-disable-next-line import/no-cycle
import { ImageInformation } from './image';

interface FollowUser {
  id: string;
  fullName: string;
  avatar: string;
  email: string;
  userName: string;
}

interface NotificationInformation {
  userName: string,
  imageId: string,
  date: Date,
}

interface Notification {
  likes: NotificationInformation[];
  comments: NotificationInformation[];
}

export interface UserInformation {
  id?: string;
  userName?: string;
  fullName?: string;
  age?: number;
  avatar?: string;
  email?: string;
  topics?: string[];
  followers?: FollowUser[];
  following?: FollowUser[];
  createdImages?: ImageInformation[];
  albums?: AlbumCardInformation[];
  markMessageAsUnread?: string[];
  markNotificationAsUnread?: Notification;
}

export interface UpdateUserInformation {
  fullName?: string;
  age?: number;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateTopics {
  topic: string[];
}

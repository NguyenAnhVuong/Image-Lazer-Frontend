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
export interface UserInformation {
  id?: string;
  userName?: string;
  fullName?: string;
  avatar?: string;
  email?: string;
  topics?: string[];
  followers?: FollowUser[];
  following?: FollowUser[];
  createdImages?: ImageInformation[];
  albums?: AlbumCardInformation[];
}

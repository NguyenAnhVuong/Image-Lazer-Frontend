// eslint-disable-next-line import/no-cycle
import { AlbumInformation } from './album';
// eslint-disable-next-line import/no-cycle
import { ImageInformation } from './image';

interface User {
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
  followers: string[];
  following?: User[];
  createdImages?: ImageInformation[];
  albums?: AlbumInformation[];
}

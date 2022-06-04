import { AlbumInformation } from './album';
import { ImageInformation } from './image';

export interface UserInformation {
  userName: string;
  fullName: string;
  email: string;
  topics: string[];
  followers: number;
  following: number;
  createdImages: ImageInformation[];
  albums: AlbumInformation[];
}

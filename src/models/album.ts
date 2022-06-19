// eslint-disable-next-line import/no-cycle
import { ImageInformation } from './image';

export interface AlbumCardInformation {
  id?: string;
  name: string;
  description: string;
  secret: boolean;
  image?: ImageInformation;
}

export interface AlbumInformation {
  id?: string;
  name: string;
  userName: string;
  fullName: string;
  description: string;
  secret: boolean;
  images?: ImageInformation[];
}

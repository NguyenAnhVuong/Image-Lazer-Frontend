// eslint-disable-next-line import/no-cycle
import { UserInformation } from './user';

export interface ImageInformation {
  id?: string;
  name?: string;
  src?: string;
  height?: number;
  width?: number;
  comment?: string[];
  likes?: string[];
  link?: string;
  title?: string;
  topic?: string;
  description?: string;
  user?: UserInformation;
}

export interface CreateImage {
  image: string;
  title: string;
  topic: string;
  description: string;
  link: string;
  album: string;
}

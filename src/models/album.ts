import { ImageInformation } from './image';

export interface AlbumInformation {
  id?: string;
  name: string;
  description: string;
  secret: boolean;
  image?: ImageInformation;
}

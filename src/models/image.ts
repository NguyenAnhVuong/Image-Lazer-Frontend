export interface ImageInformation {
  name?: string;
  src?: string;
  height?: number;
  width?: number;
}

export interface CreateImage {
  image: string;
  title: string;
  topic: string;
  description: string;
  link: string;
  album: string;
}

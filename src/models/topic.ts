import { ImageInformation } from './image';

export interface TopicInformation {
  name: string;
  image: ImageInformation;
}

export const topics = [
  {
    name: 'Động vật',
    image: {
      src: 'https://i.pinimg.com/474x/cd/a2/be/cda2be611e4466e5e6182b627b18f851.jpg',
    },
  },
  {
    name: 'Du lịch',
    image: {
      src: 'https://i.pinimg.com/400x/02/69/c8/0269c81fb094b2d251415318ee34ca26.jpg',
    },
  },
  {
    name: 'Anime',
    image: {
      src: 'https://i.pinimg.com/400x/01/18/73/0118739a472746f2054776b82a13c5e2.jpg',
    },
  },
  {
    name: 'Tranh',
    image: {
      src: 'https://i.pinimg.com/400x/f5/df/ba/f5dfba1faf400a237952f635f7966060.jpg',
    },
  },
  {
    name: 'Ẩm thực',
    image: {
      src: 'https://i.pinimg.com/474x/e9/fb/44/e9fb44494d3c411f480b2b77ab156c6d.jpg',
    },
  },
];

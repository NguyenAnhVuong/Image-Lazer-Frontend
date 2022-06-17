import { ImageInformation } from '../models';
import axiosJWT from './axiosJWT';

const uploadApi = {
  uploadSingleImage: async (fileImage: any) => {
    try {
      const res = await axiosJWT.post('/posts/uploadPostImage', fileImage);
      if (res && res.data && !res.data.errorCode) {
        const newImage: ImageInformation = {
          name: res.data.image,
          src: `/uploads/${res.data.image}`,
          height: res.data.image_height,
          width: res.data.image_width,
        };
        return newImage;
      }
    } catch (error) {
      console.log('error', error);
    }
    return {
      name: '',
      src: '',
      height: 0,
      width: 0,
    };
  },
};

export default uploadApi;

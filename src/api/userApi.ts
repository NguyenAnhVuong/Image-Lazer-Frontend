import axios from 'axios';
import axiosJWT from './axiosJWT';

const userAPi = {
  getUserByUserName: async (userName: string) => {
    try {
      const res = await axios.get(`/users/${userName}`);
      if (res && res.data && res.data.errorCode === 0) {
        return res.data;
      }
    } catch (error) {
      console.log('error', error);
    }

    return 0;
  },

  createImage: async (newImage: any) => {
    try {
      const res = await axiosJWT.post('/posts', newImage);
      if (res && res.data && res.data.errorCode === 0) {
        return 1;
      }
    } catch (error) {
      console.log('error', error);
    }
    return 0;
  },
};
export default userAPi;

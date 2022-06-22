import axios from 'axios';

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
};
export default userAPi;

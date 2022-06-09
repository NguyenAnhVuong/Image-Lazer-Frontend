import axiosJWT from './axiosJWT';

const followApi = {
  getFollowedByUser: async (userId: string) => {
    try {
      const res = await axiosJWT.get(`/follows/followedBy/${userId}`);
      if (res && res.data && res.data.errorCode === 0) {
        return res.data;
      }
    } catch (err) {
      console.log('error', err);
    }
    return 0;
  },

  getFollowUser: async (userId: string) => {
    try {
      const res = await axiosJWT.get(`/follows/followed/${userId}`);
      if (res && res.data && res.data.errorCode === 0) {
        return res.data;
      }
    } catch (err) {
      console.log('error', err);
    }
    return 0;
  },
};

export default followApi;

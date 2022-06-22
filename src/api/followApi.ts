import axiosJWT from './axiosJWT';

const followApi = {
  getFollowedByUser: (userId: string) => axiosJWT.get(`/follows/followedBy/${userId}`),

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

  followUser: (userId: string) => axiosJWT.post('/follows', { followed_user_id: userId }),
};

export default followApi;

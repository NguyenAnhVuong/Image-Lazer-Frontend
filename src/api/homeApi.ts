import axiosJWT from './axiosJWT';

const homeApi = {
  getHomeImage: async (topic: string) => {
    try {
      const res = await axiosJWT.get(`/users/home/?topic[0]=${topic}`);
      if (res && res.data && !res.data.errorCode) {
        return res.data;
      }
    } catch {
      console.log('error');
    }
    return 0;
  },
};
export default homeApi;

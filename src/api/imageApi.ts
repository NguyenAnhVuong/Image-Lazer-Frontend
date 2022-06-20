import axiosJWT from './axiosJWT';

const imageApi = {
  getImageDetail: async (id: string) => {
    try {
      const res = await axiosJWT.get(`/posts/${id}`);
      if (res && res.data) {
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
  updateImage: async (id: string, newImage: any) => {
    try {
      const res = await axiosJWT.patch(`/posts/${id}`, newImage);
      if (res && res.data && !res.data.errorCode) {
        return 1;
      }
    } catch (error) {
      console.log('error', error);
    }
    return 0;
  },
  deleteImage: async (id: string) => {
    try {
      const res = await axiosJWT.delete(`/posts/delete/${id}`);
      if (res && res.data && !res.data.errorCode) {
        return 1;
      }
    } catch (error) {
      console.log('error', error);
    }
    return 0;
  },
};

export default imageApi;

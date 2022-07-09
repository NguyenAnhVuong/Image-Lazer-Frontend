import axios from 'axios';
import { ChangePassword, UpdateTopics, UpdateUserInformation } from '../models';
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

  updateUser: async (id: string, data: UpdateUserInformation) => {
    try {
      const res = await axiosJWT.patch(`/users/${id}`, data);
      if (res && res.data && res.data.errorCode === 0) {
        return res.data;
      }
    } catch (error) {
      console.log('error', error);
    }

    return 0;
  },

  changePassword: async (id: string, data: ChangePassword) => {
    try {
      const res = await axiosJWT.patch(`/users/${id}/change-password`, data);
      if (res && res.data && res.data.errorCode === 0) {
        return res.data;
      }
    } catch (error) {
      console.log('error', error);
    }

    return 0;
  },

  updateAvatar: async (id: string, avatar: any) => {
    try {
      const res = await axiosJWT.patch(`/users/upload/${id}`, avatar);
      if (res && res.data && !res.data.errorCode) {
        return 1;
      }
    } catch (error) {
      console.log('error', error);
    }
    return 0;
  },

  updateTopics: async (data: UpdateTopics) => {
    try {
      const res = await axiosJWT.patch('/users/uploadTopic/topics', data);
      if (res && res.data && res.data.errorCode === 0) {
        return 1;
      }
    } catch (error) {
      console.log('error', error);
    }
    return 0;
  },
  searchUser: async (keyWord: string) => {
    try {
      const res = await axios.post('/users/search', { user: keyWord });
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

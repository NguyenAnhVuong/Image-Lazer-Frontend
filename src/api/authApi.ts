import axios from 'axios';
import { LoginUser, RegisterUser } from '../models';

const authAPi = {
  register: async (registerUser: RegisterUser) => {
    try {
      await axios.post('/users/auth/signup', registerUser);
    } catch (err) {
      return 0;
    }
    return 1;
  },
  login: (loginUser: LoginUser): Promise<any> => axios.post('/users/auth/signin', loginUser),
  refreshToken: async () => {
    try {
      const res = await axios.post('/users/auth/refresh', {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
    return 0;
  },
};

export default authAPi;

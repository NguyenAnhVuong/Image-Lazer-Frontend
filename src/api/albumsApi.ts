import { AlbumInformation } from '../models';
import axiosJWT from './axiosJWT';

const albumsApi = {
  createAlbum: async (newAlbum: AlbumInformation) => {
    try {
      const res = await axiosJWT.post('/albums', newAlbum);
      if (res && res.data && res.data.errorCode === 0) {
        return 1;
      }
    } catch (error) {
      console.log('error', error);
    }
    return 0;
  },
  getAlbums: (): Promise<any> => axiosJWT.get('/albums/users'),
};

export default albumsApi;

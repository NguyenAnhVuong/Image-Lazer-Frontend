import { AlbumCardInformation } from '../models';
import axiosJWT from './axiosJWT';

const albumsApi = {
  createAlbum: async (newAlbum: AlbumCardInformation) => {
    try {
      const res = await axiosJWT.post('/albums', newAlbum);
      if (res && res.data && !res.data.errorCode) {
        return 1;
      }
    } catch (error) {
      console.log('error', error);
    }
    return 0;
  },
  getAlbums: (): Promise<any> => axiosJWT.get('/albums/users'),
  getAlbumById: async (albumId: string) => {
    try {
      const res = await axiosJWT.get(`/albums/${albumId}`);
      if (res && res.data && res.data.errorCode === 0) {
        return res.data;
      }
    } catch (error) {
      console.log('error', error);
    }
    return 0;
  },
  saveImageToAlbum: async (imageId: string, album: string) => {
    try {
      const res = await axiosJWT.post('/saveposts', {
        post_id: imageId,
        album,
      });
      if (res && res.data && !res.data.errorCode) {
        return 1;
      }
    } catch (error) {
      console.log('error', error);
    }
    return 0;
  },
  updateImageInAlbum: async (newAlbumInfo: AlbumCardInformation) => {
    try {
      const res = await axiosJWT.patch(`/albums/${newAlbumInfo.id}`, {
        name: newAlbumInfo.name,
        description: newAlbumInfo.description,
        secret: newAlbumInfo.secret ? 1 : 0,
      });
      if (res && res.data && !res.data.errorCode) {
        return 1;
      }
    } catch (error) {
      console.log('error', error);
    }
    return 0;
  },
  deleteAlbum: async (albumId?: string) => {
    try {
      const res = await axiosJWT.delete(`/albums/delete/${albumId}`);
      if (res && res.data && !res.data.errorCode) {
        return 1;
      }
    } catch (error) {
      console.log('error', error);
    }
    return 0;
  },
  deleteImageInAlbum: async (imageId: string, album: string) => {
    try {
      const res = await axiosJWT.delete(
        '/albums',
        {
          data: {
            post_id: imageId,
            album,
          },
        },
      );
      console.log('res', res);
      if (res && res.data && !res.data.errorCode) {
        return 1;
      }
    } catch (error) {
      console.log('error', error);
    }
    return 0;
  },
};

export default albumsApi;

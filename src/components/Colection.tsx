import PhotoAlbum, { RenderPhoto } from 'react-photo-album';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { FaAngleDown } from 'react-icons/fa';
import { useState } from 'react';
import { Modal, Select } from 'antd';
import { ImageInformation } from '../models';
import { useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';

export interface ImageAlbumProps {
  images: ImageInformation[];
}

const Colection = ({ images }: ImageAlbumProps) => {
  const userAlbums = useAppSelector((state: AppState) => state.albums.albums);
  const [currentAlbum, setCurrentAlbum] = useState('Album mặc định');
  const [selectAlbumModal, setSelectAlbumModal] = useState(false);
  const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

  const photos: any = images.map((image: ImageInformation) => ({
    src: image.src,
    width: image.width,
    height: image.height,
    images: breakpoints.map((breakpoint) => {
      if (image.height && image.width) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const height = Math.round((image?.height / image?.width) * breakpoint);
        return {
          src: image.src,
          width: breakpoint,
          height,
        };
      }
      return {
        src: image.src,
        width: 0,
        height: 0,
      };
    }),
  }));

  const renderPhoto: RenderPhoto | any = ({ imageProps: { alt, style, ...restImageProps } }: any) => (
    <div
      className="relative mb-2 rounded-2xl overflow-hidden xl:mb-4 cursor-pointer"
      style={{
        boxSizing: 'content-box',
        alignItems: 'center',
        width: style?.width,
        paddingBottom: 0,
      }}
    >
      <div className="absolute left-0 top-0 right-0 bottom-0 hover:block hover:bg-[#0a0a0a49] group">
        <div className="hidden group-hover:block">
          <div className="absolute top-4 flex px-3 justify-between w-full">
            <button
              className="text-white flex items-center text-base font-bold max-w-[40%]"
              type="button"
              onClick={() => setSelectAlbumModal(true)}
            >
              <span className="mr-1 truncate">{currentAlbum}</span>
              <FaAngleDown size={20} />
            </button>
            <button
              className="bg-primary px-4 py-2 rounded-3xl text-base font-bold text-white"
              type="button"
            >
              Lưu
            </button>
          </div>

          <div className="absolute bottom-3 right-3">
            <button className="p-2 bg-graybg rounded-full" type="button">
              <MdModeEditOutline size={20} />
            </button>
            <button className="p-2 bg-graybg rounded-full ml-2" type="button">
              <MdDelete size={20} />
            </button>
          </div>
        </div>
      </div>
      <img
        alt={alt}
        style={{
          ...style, width: '100%', padding: 0, marginBottom: 0,
        }}
        {...restImageProps}
      />
    </div>
  );

  return (
    <div className="p-2 xl:px-16">
      <div className="hidden xl:block">
        <PhotoAlbum
          photos={photos}
          layout="columns"
          columns={(containerWidth) => {
            if (containerWidth < 768) return 2;
            if (containerWidth < 1024) return 3;
            if (containerWidth < 1280) return 4;
            if (containerWidth < 1536) return 5;
            if (containerWidth < 1750) return 6;
            return 7;
          }}
          spacing={16}
          renderPhoto={renderPhoto}
        />
      </div>

      <div className="xl:hidden">
        <PhotoAlbum
          photos={photos}
          layout="columns"
          columns={(containerWidth) => {
            if (containerWidth < 768) return 2;
            if (containerWidth < 1024) return 3;
            if (containerWidth < 1280) return 4;
            if (containerWidth < 1536) return 5;
            if (containerWidth < 1750) return 6;
            return 7;
          }}
          spacing={8}
          targetRowHeight={200}
          renderPhoto={renderPhoto}
        />
      </div>
      <Modal
        visible={selectAlbumModal}
        title="Chọn Album"
        footer={null}
        onCancel={() => setSelectAlbumModal(false)}
      >
        <Select
          className="w-full"
          placeholder="Chọn Album ảnh"
          allowClear
          onChange={(value) => { setCurrentAlbum(value); setSelectAlbumModal(false); }}
          value={currentAlbum}
        >
          {
            userAlbums.map((album) => (
              <Select.Option key={album.id} value={album.name}>
                <img className="w-12 h-12 rounded-xl object-cover" src={album.image?.src} alt="" />
                <span className="font-bold text-base ml-2">{album.name}</span>
              </Select.Option>
            ))
          }
        </Select>
      </Modal>
    </div>
  );
};

export default Colection;

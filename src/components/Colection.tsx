/* eslint-disable jsx-a11y/control-has-associated-label */
// import { Modal, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import PhotoAlbum, { RenderPhoto } from 'react-photo-album';
import { useNavigate } from 'react-router-dom';
import albumsApi from '../api/albumsApi';
import imageApi from '../api/imageApi';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import { commentActions } from '../features/comment/commentSlice';
import { userActions } from '../features/user/userSlice';
import { ImageInformation } from '../models';
import ListSelectAlbumModal from './Album/ListSelectAlbumModal';

export interface ImageAlbumProps {
  images: ImageInformation[];
  useToAlbum: boolean;
  isUserAlbum: boolean;
  reRender: boolean;
  setReRender: (reRender: boolean) => void;
  albumName: string;
}
const key = 'updatable';
const Colection = ({
  images, useToAlbum, isUserAlbum, reRender, setReRender, albumName,
}: ImageAlbumProps) => {
  // const userAlbums = useAppSelector((state: AppState) => state.albums.albums);
  const [currentAlbum, setCurrentAlbum] = useState('Album mặc định');
  const [selectAlbumModal, setSelectAlbumModal] = useState(false);
  const navigate = useNavigate();
  const refId = useRef('');
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state: AppState) => state.auth.userName);
  const { confirm } = Modal;
  const user = useAppSelector((state: AppState) => state.user.user);
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];
    const photos1: any = images.map((image: ImageInformation) => ({
      id: image.id,
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

    setPhotos(photos1);
  }, [images]);

  const handleDeleteImage = async (id: string) => {
    const res = await imageApi.deleteImage(id);
    if (res) {
      message.loading({
        content: 'Đang tải...',
        key,
      });
      setTimeout(() => {
        message.success({
          content: 'Xóa ảnh thành công!',
          key,
          duration: 2,
        });
      }, 1000);
      dispatch(userActions.getUserStart(userName));
      setReRender(!reRender);
    }
  };

  const showConfirm = async () => {
    confirm({
      title: 'Bạn có chắc là muốn xóa ảnh này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn sẽ không thể khôi phục lại ảnh này',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okType: 'danger',
      onOk() {
        handleDeleteImage(refId.current);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDeleteImageInAlbum = async (imageId: string, album: string) => {
    const res = await albumsApi.deleteImageInAlbum(imageId, album);
    if (res) {
      message.loading({
        content: 'Đang tải...',
        key,
      });
      setTimeout(() => {
        message.success({
          content: `Xóa ảnh khỏi Album ${album} thành công!`,
          key,
          duration: 2,
        });
      }, 1000);
      dispatch(userActions.getUserStart(userName));
      setReRender(!reRender);
    }
  };

  const showConfirmToDeleteImageInAlbum = async () => {
    confirm({
      title: 'Bạn có chắc là muốn xóa ảnh này khỏi Album?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okType: 'danger',
      onOk() {
        handleDeleteImageInAlbum(refId.current, albumName);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleSavePostToAlbum = async (imageId: string, album: string) => {
    const res = await albumsApi.saveImageToAlbum(imageId, album);
    if (res) {
      message.loading({
        content: 'Đang tải...',
        key,
      });
      setTimeout(() => {
        message.success({
          content: `Đã lưu ảnh vào Album ${album} !`,
          key,
          duration: 2,
        });
      }, 1000);
      dispatch(userActions.getUserStart(userName));
    }
  };

  const handleChooseActiveComment = () => {
    dispatch(commentActions.setChosenCommentDetails({ id: refId.current, title: currentAlbum }));
  };

  const renderPhoto: RenderPhoto | any = ({
    imageProps: { alt, style, ...restImageProps },
  }: any) => (
    <div>
      <div
        className="relative mb-2 rounded-2xl overflow-hidden xl:mb-4 cursor-pointer"
        style={{
          boxSizing: 'content-box',
          alignItems: 'center',
          width: style?.width,
          paddingBottom: 0,
        }}
      >
        <div className="absolute left-0 top-0 right-0 bottom-0 group">
          <div
            className="absolute left-0 top-0 right-0 bottom-0 bg-transparent group-hover:bg-[#0a0a0a49]"
            role="button"
            tabIndex={0}
            onClick={() => {
              restImageProps.onClick();
              handleChooseActiveComment();
              navigate(`/image/${refId.current}`);
            }}
            onKeyDown={restImageProps.onClick}
          />
          <div className="hidden group-hover:xl:block ">
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
                onClick={() => {
                  restImageProps.onClick();
                  handleSavePostToAlbum(refId.current, currentAlbum);
                }}
              >
                Lưu
              </button>
            </div>
            {user.createdImages?.find(
              (image) => image.src === restImageProps.src,
            ) ? (
              <div className="absolute bottom-3 right-3">
                <button
                  className="p-2 bg-graybg rounded-full"
                  type="button"
                  onClick={() => {
                    restImageProps.onClick();
                    navigate(`/image/edit/${refId.current}`);
                  }}
                >
                  <MdModeEditOutline size={20} />
                </button>
                <button
                  className="p-2 bg-graybg rounded-full ml-2"
                  type="button"
                  onClick={() => {
                    restImageProps.onClick();
                    showConfirm();
                  }}
                >
                  <MdDelete size={20} />
                </button>
              </div>
              ) : (
                useToAlbum
            && isUserAlbum && (
              <div className="absolute bottom-3 right-3">
                <button
                  className="p-2 bg-graybg rounded-full ml-2"
                  type="button"
                  onClick={() => {
                    restImageProps.onClick();
                    showConfirmToDeleteImageInAlbum();
                  }}
                >
                  <MdDelete size={20} />
                </button>
              </div>
                )
              )}
          </div>
          <div className="xl:hidden">
            {user.createdImages?.find(
              (image) => image.src === restImageProps.src,
            ) ? (
              <div className="absolute bottom-2 right-2 flex flex-col">
                <button
                  className="p-2 bg-graybg rounded-full"
                  type="button"
                  onClick={() => {
                    restImageProps.onClick();
                    navigate(`/image/edit/${refId.current}`);
                  }}
                >
                  <MdModeEditOutline size={16} />
                </button>
                <button
                  className="p-2 bg-graybg rounded-full mt-2"
                  type="button"
                  onClick={() => {
                    restImageProps.onClick();
                    showConfirm();
                  }}
                >
                  <MdDelete size={16} />
                </button>
              </div>
              ) : (
                useToAlbum
            && isUserAlbum && (
              <div className="absolute bottom-2 right-2">
                <button
                  className="p-2 bg-graybg rounded-full ml-2"
                  type="button"
                  onClick={() => {
                    restImageProps.onClick();
                    showConfirmToDeleteImageInAlbum();
                  }}
                >
                  <MdDelete size={16} />
                </button>
              </div>
                )
              )}
          </div>
        </div>
        <img
          alt={alt}
          style={{
            ...style,
            width: '100%',
            padding: 0,
            marginBottom: 0,
          }}
          {...restImageProps}
        />
      </div>
    </div>

  );

  return (
    <div className="p-2 xl:px-16">
      <div className="">
        <PhotoAlbum
          photos={photos}
          layout="masonry"
          // columns={(containerWidth) => {
          //   if (containerWidth < 768) return 2;
          //   if (containerWidth < 1024) return 3;
          //   if (containerWidth < 1280) return 4;
          //   if (containerWidth < 1536) return 5;
          //   if (containerWidth < 1750) return 6;
          //   return 7;
          // }}
          spacing={16}
          targetRowHeight={200}
          renderPhoto={renderPhoto}
          onClick={(event, photo: any) => {
            refId.current = photo.id;
          }}
        />
      </div>

      {/* <div className="xl:hidden">
        <PhotoAlbum
          photos={photos}
          layout="columns"
          // columns={(containerWidth) => {
          //   if (containerWidth < 768) return 2;
          //   if (containerWidth < 1024) return 3;
          //   if (containerWidth < 1280) return 4;
          //   if (containerWidth < 1536) return 5;
          //   if (containerWidth < 1750) return 6;
          //   return 7;
          // }}
          spacing={8}
          targetRowHeight={200}
          renderPhoto={renderPhoto}
          onClick={(event, photo: any) => {
            refId.current = photo.id;
          }}
        />
      </div> */}
      <ListSelectAlbumModal
        selectAlbumModal={selectAlbumModal}
        setSelectAlbumModal={setSelectAlbumModal}
        currentAlbum={currentAlbum}
        setCurrentAlbum={setCurrentAlbum}
      />
    </div>
  );
};

export default Colection;

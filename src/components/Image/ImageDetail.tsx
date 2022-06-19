import { ExclamationCircleOutlined, ZoomInOutlined } from '@ant-design/icons';
import { Image, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import imageApi from '../../api/imageApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { userActions } from '../../features/user/userSlice';
import { ImageInformation } from '../../models';
import ListSelectAlbumModal from '../Album/ListSelectAlbumModal';

const ImageDetail = () => {
  const [image, setImage] = useState<ImageInformation>();
  const [currentAlbum, setCurrentAlbum] = useState('Album mặc định');
  const [selectAlbumModal, setSelectAlbumModal] = useState(false);
  const userName = useAppSelector((state: AppState) => state.auth.userName);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { confirm } = Modal;

  useEffect(() => {
    const getImageFromApi = async () => {
      if (params.id) {
        const res = await imageApi.getImageDetail(params.id);
        const imageInfo: ImageInformation = {
          id: params.id,
          name: res.image,
          src: `/uploads/${res.image}`,
          height: res.image_height,
          width: res.image_width,
          comment: res.comment,
          likes: res.likes,
          link: res.link,
          title: res.title,
          topic: res.topic,
          description: res.description,
          user: {
            userName: res.userInformation.userName,
            fullName: res.userInformation.fullName,
            avatar: res.userInformation.avatar,
            followers: res.userInformation.followers,
          },
        };
        setImage(imageInfo);
      }
    };
    getImageFromApi();
  }, [params]);

  const handleDeleteImage = async (id: string) => {
    const res = await imageApi.deleteImage(id);
    if (res) {
      dispatch(userActions.getUserStart(userName));
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
        handleDeleteImage(image?.id || '');
        navigate(-1);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div className="flex justify-center xl:items-center">
      <button
        type="button"
        className="block"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack
          className="rounded-full bg-white cursor-pointer p-4 font-bold hidden
        xl:inline-block fixed left-4 top-24 hover:bg-[#efefef]"
          size={56}
        />
      </button>
      <div className="pb-40 xl:w-[1016px] 2xl:w-[1200px] xl:rounded-3xl xl:header-shadow xl:p-4 xl:min-h-[660px] w-full">
        <div className="fixed top-0 left-0 flex justify-between px-2 w-full h-14 items-center bg-white header-shadow xl:hidden z-10">
          <button className="" type="button" onClick={() => navigate(-1)}>
            <IoIosArrowBack className="p-3 text-black" size={48} />
          </button>

          {
            userName === image?.user?.userName
              ? (
                <div className="flex items-center">
                  <button className="" type="button" onClick={() => { navigate(`/image/edit/${params.id}`); }}>
                    <MdModeEditOutline className="p-3" size={48} />
                  </button>
                  <button className="" type="button">
                    <MdDelete className="p-3" size={48} onClick={showConfirm} />
                  </button>
                  <button
                    className="rounded-[24px] bg-black text-white
                flex items-center text-base font-semibold px-4 p-1 ml-2"
                    type="button"
                  >
                    Đã lưu
                  </button>
                </div>
              )
              : (
                <>
                  <button
                    className="flex items-center text-base font-bold max-w-[40%]"
                    type="button"
                    onClick={() => setSelectAlbumModal(true)}
                  >
                    <span className="mr-1 truncate">{currentAlbum}</span>
                    <FaAngleDown size={20} />
                  </button>
                  <button
                    className="rounded-[24px] bg-red-600 text-white
                flex items-center text-base font-semibold px-4 py-1"
                    type="button"
                  >
                    Lưu
                  </button>
                </>
              )
          }

        </div>
        <div className="mt-14 lg:flex lg:p-2">
          <div className="lg:flex-1 flex justify-center items-center">
            <div className="lg:rounded-3xl lg:overflow-hidden">
              <Image
                className="w-screen lg:w-full lg:object-contain lg:rounded-3xl lg:overflow-hidden"
                src={image?.src}
                alt=""
                preview={{
                  maskClassName: 'customize-mask',
                  mask: (
                    <Space direction="vertical" align="center">
                      <div className="flex items-center">
                        <ZoomInOutlined />
                        <span className="ml-1">Phóng to</span>
                      </div>
                    </Space>
                  ),
                }}
              />
            </div>
          </div>
          <div className="lg:flex-1">
            <div className="flex h-12 justify-between px-5 my-4">
              <div className="flex">
                <img className="h-12 w-12" src={`/uploads/${image?.user?.avatar || 'default_avatar.png'}`} alt="" />
                <div className="flex flex-col justify-center ml-2">
                  <span className="font-bold">{image?.user?.fullName}</span>
                  <span className="font-medium">
                    {image?.user?.followers?.length}
                    {' '}
                    người theo dõi
                  </span>
                </div>
              </div>
              {
                userName === image?.user?.userName
                  ? (
                    <button
                      className="bg-graybg px-3 text-[#767676] py-4 rounded-3xl flex justify-center items-center font-bold text-base"
                      type="button"
                      disabled
                    >
                      Chính là bạn
                    </button>
                  )
                  : (
                    <button
                      className="bg-graybg px-3 py-4 rounded-3xl flex justify-center items-center font-bold text-base"
                      type="button"
                    >
                      Theo dõi
                    </button>
                  )
              }

            </div>
            {
              !!image && !!image.link && (
                <div className="flex items-center justify-center">
                  <span className="text-base">Bài viết chia sẻ từ</span>
                  <a
                    className="text-black font-bold"
                    href={image?.link}
                    target="__blank"
                  >
                    <span
                      className="ml-1 text-base max-w-[180px] md:max-w-[280px] truncate flex items-center"
                    >
                      {image?.link}
                    </span>
                  </a>
                </div>
              )
            }

            <div className="text-center p-4">
              <h1 className="font-bold text-3xl">{image?.title}</h1>
              <p className="text-base">
                {image?.description}
              </p>
              <div>Like và Comment của Hiếu</div>
            </div>
          </div>
        </div>
        <ListSelectAlbumModal
          selectAlbumModal={selectAlbumModal}
          setSelectAlbumModal={setSelectAlbumModal}
          currentAlbum={currentAlbum}
          setCurrentAlbum={setCurrentAlbum}
        />
      </div>
    </div>
  );
};

export default ImageDetail;

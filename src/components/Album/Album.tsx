import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Empty, message, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { CgMoreAlt } from 'react-icons/cg';
import { HiLockClosed } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import albumsApi from '../../api/albumsApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { userActions } from '../../features/user/userSlice';
import { AlbumInformation } from '../../models';
import Colection from '../Colection';
import EditAlbumModal from './EditAlbumModal';

const key = 'updatable';
const Album = () => {
  const { confirm } = Modal;
  const navigate = useNavigate();
  const user = useAppSelector((state: AppState) => state.user.user);
  const userName = useAppSelector((state: AppState) => state.auth.userName);
  const [reRender, setReRender] = useState(false);
  const [album, setAlbum] = useState<AlbumInformation>({} as AlbumInformation);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const handleDeleteAlbum = async (id?: string) => {
    const res = await albumsApi.deleteAlbum(id);
    if (res) {
      message.loading({
        content: 'ローディング...',
        key,
      });
      setTimeout(() => {
        message.success({
          content: `削除されたアルバム ${album.name}!`,
          key,
          duration: 2,
        });
      }, 1000);
      navigate(`/user/${userName}`);
      dispatch(userActions.getUserStart(userName));
    }
  };
  const showConfirm = async () => {
    confirm({
      title: '本当にこのアルバムを削除しますか？',
      icon: <ExclamationCircleOutlined />,
      content: 'アルバムを削除すると、アルバム内のすべての写真が削除されます。',
      okText: '削除',
      cancelText: 'キャンセル',
      okType: 'danger',
      onOk() {
        handleDeleteAlbum(params?.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpenSetting(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect((): void => {
    const getAlbums = async () => {
      const res = await albumsApi.getAlbumById(params?.id || '');
      if (res) {
        const albumInfo = {
          id: params.id,
          name: res.name,
          userName: res.userName,
          fullName: res.fullName,
          description: res.description,
          secret: res.secret,
          images: res.images,
        };
        setAlbum(albumInfo);
      }
    };
    if (params && params.id) {
      getAlbums();
    } else {
      navigate('/');
    }
  }, [navigate, params, params.id, reRender]);

  return (
    <div>
      <div className="fixed top-0 left-0 flex justify-between px-2 w-full h-14 items-center bg-white header-shadow xl:hidden z-20">
        <button className="" type="button" onClick={() => navigate(-1)}>
          <IoIosArrowBack className="p-3 text-black" size={48} />
        </button>
        <div>
          <button type="button" onClick={() => setIsOpenEditModal(true)}>
            <MdModeEditOutline className="p-3" size={48} />
          </button>
          <button type="button">
            <MdDelete className="p-3" size={48} onClick={showConfirm} />
          </button>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex flex-col items-center text-sm lg:text-base font-medium mb-5">
          <div className="flex items-center mb-5">
            <h1 className="text-4xl font-bold m-0">{album?.name}</h1>
            <div className="relative">
              <button
                className="bg-graybg rounded-full ml-2 hover:bg-graybg hidden xl:block"
                type="button"
                ref={ref}
                onClick={() => setIsOpenSetting((state) => !state)}
              >
                <CgMoreAlt className="p-1" size={32} />
              </button>
              <div className={`header-shadow px-2 py-4 rounded-2xl absolute w-48 z-10 bg-white ${isOpenSetting ? 'block' : 'hidden'}`}>
                <ul className="mb-0">
                  <li>
                    <button
                      className="p-2 rounded-xl hover:bg-graybg cursor-pointer w-full text-left text-base font-bold"
                      onClick={() => setIsOpenEditModal(true)}
                      type="button"
                    >
                      アルバムの編集
                    </button>
                  </li>
                  <li>
                    <button
                      className="p-2 rounded-xl hover:bg-graybg cursor-pointer w-full text-left text-base font-bold"
                      onClick={showConfirm}
                      type="button"
                    >
                      アルバムの削除
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p>
            {album?.images?.length}
            {' '}
            写真
          </p>
          <p>{album?.description}</p>
          <div>
            <Link className="font-bold text-black" to={`/user/${album?.userName}`}>{album?.fullName}</Link>
            <span> のコレクション </span>
          </div>
          {
            !!album?.secret && (
              <div className="flex items-center m-3">
                <HiLockClosed className="m-1" size={16} />
                <span>シークレットボード</span>
              </div>
            )
          }
        </div>
        {
          album && album.images && album?.images?.length > 0 ? (
            <Colection
              images={album?.images || []}
              useToAlbum
              isUserAlbum={params && !!user.albums?.find(((userAlbum) => userAlbum.id === params.id))}
              reRender={reRender}
              setReRender={setReRender}
              albumName={album?.name}
            />
          )
            : <Empty className="mt-10" description={(<span className="font-semibold">Không có Ảnh nào trong Album này!</span>)} />
        }

      </div>
      <EditAlbumModal albumInfo={album} setReRender={setReRender} isOpen={isOpenEditModal} setIsOpen={setIsOpenEditModal} />
    </div>
  );
};

export default Album;

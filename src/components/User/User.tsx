import { Empty, Avatar } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { HiLockClosed } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';
import { RiSettingsFill } from 'react-icons/ri';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosJWT from '../../api/axiosJWT';
import userAPi from '../../api/userApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { authActions } from '../../features/auth/authSlice';
import { UserInformation } from '../../models';
import CreateAlbumModal from '../Album/CreateAlbumModal';
import Colection from '../Colection';
import PlusButton from '../PlusButton';

const User = () => {
  const params = useParams();
  const [user, setUser] = useState<UserInformation>();
  const [added, setAdded] = useState(true);
  const [createAlbumModalOpen, setCreateAlbumModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createRef = useRef<any>();
  const saveRef = useRef<any>();
  const userName = useAppSelector((state: AppState) => state.auth.userName);
  const ref = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [reRender, setReRender] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userRedux = useAppSelector((state: AppState) => state.user);

  const getUser = async () => {
    if (params && params.userName) {
      const res = await userAPi.getUserByUserName(params?.userName);
      if (res) {
        setUser({
          userName: res.userName,
          email: res.email,
          avatar: res.avatar,
          topics: res.topics,
          fullName: res.fullName,
          followers: res.followers,
          following: res.following,
          createdImages: res.createdImages,
          albums: res.albums,
          markMessageAsUnread: res.markMessageAsUnread,
          markNotificationAsUnread: res.markNotificationAsUnread,
        });
      }
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, userRedux]);

  useEffect(() => {
    if (added) {
      createRef.current.style.borderColor = '#111';
      saveRef.current.style.borderColor = 'transparent';
    } else {
      createRef.current.style.borderColor = 'transparent';
      saveRef.current.style.borderColor = '#111';
    }
  }, [added]);

  const handleLogout = async () => {
    const res = await axiosJWT.post('/users/auth/logout');
    if (res && res.data && !res.data.errorCode) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userName');
      dispatch(authActions.logout());
      navigate('/');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="pb-20">
      <div
        className="fixed top-0 left-0 h-14 flex items-center xl:hidden header-shadow w-full bg-white justify-between p-2 z-10"
      >
        <button className="" type="button" onClick={() => navigate(-1)}>
          <IoIosArrowBack className="p-3 text-black" size={48} />
        </button>
        <span className="font-bold text-base">個人ページ</span>
        <button ref={ref} onClick={() => setIsOpen((state) => !state)} type="button">
          <RiSettingsFill className="p-3" size={48} />
        </button>
        <div
          className={`absolute bg-white header-shadow top-12 right-0 rounded-2xl w-48 z-20 ${isOpen ? 'block' : 'hidden'}`}
        >
          <ul className="p-2">
            <li className="">
              <Link
                className="text-black p-2 hover:bg-graybg text-base font-bold rounded-2xl w-full block"
                to="/settings/user-information"
              >
                個人情報
              </Link>
            </li>
            <li className="">
              <Link
                className="text-black p-2 hover:bg-graybg text-base font-bold rounded-2xl w-full block"
                to="/settings/user-password"
              >
                Đổi mật khẩu
              </Link>
            </li>
            <li className="">
              <Link
                className="text-black p-2 hover:bg-graybg text-base font-bold rounded-2xl w-full block"
                to="/settings/user-topics"
              >
                Chủ đề
              </Link>
            </li>
            <li className="p-2 hover:bg-graybg rounded-2xl cursor-pointer">
              <button className="text-base font-bold w-full text-left" type="button" onClick={handleLogout}>ログアウト</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center mt-20 flex-col">
        <div className="w-32 h-32">
          <Avatar
            className="w-[128px] h-[128px]"
            size={120}
            src={`/uploads/${user?.avatar || 'default_avatar.png'}`}
          />
        </div>
        <h1 className="text-4xl font-semibold mt-2 mb-1">
          {user?.fullName}
        </h1>
        <p className="text-base font-medium">
          {user?.userName}
        </p>
        <p className="text-base font-bold">
          {user?.followers?.length}
          {' '}
          フォロー中
        </p>
        <p className="text-base font-bold">
          {user?.following?.length}
          {' '}
          フォロワー
        </p>
        <button
          className="bg-[#efefef] px-4 py-2 rounded-3xl text-base font-bold mb-4 xl:hidden"
          type="button"
        >
          <Link className="text-black" to="/create-image">
            画像追加
          </Link>
        </button>
        <button
          className="bg-[#efefef] px-4 py-2 rounded-3xl text-base font-bold xl:hidden"
          type="button"
          onClick={() => setCreateAlbumModalOpen(true)}
        >
          アルバム追加
        </button>
      </div>

      <div>
        <div className="flex justify-center my-4">
          <button className="mr-5 p-2" type="button" onClick={() => setAdded(true)}>
            <div
              ref={createRef}
              className="pb-1 text-base font-bold border-b-[3px]"
            >
              追加されました
            </div>
          </button>
          <button className="p-2" type="button" onClick={() => setAdded(false)}>
            <div
              ref={saveRef}
              className="pb-1 text-base font-bold border-b-[3px]"
            >
              保存しました
            </div>
          </button>

        </div>
        {
          added
            ? (
              <div>
                {
                  user && user.createdImages && user.createdImages.length > 0
                    ? (
                      <Colection
                        images={user.createdImages}
                        useToAlbum={false}
                        isUserAlbum={false}
                        reRender={reRender}
                        setReRender={setReRender}
                        albumName=""
                      />
                    )
                    : (
                      <div>
                        <Empty
                          description={(
                            <span>
                              画像はまだありません
                            </span>
                          )}
                        />
                      </div>
                    )
                }
              </div>
            )
            : (
              <div className="grid grid-cols-2 gap-2 px-2 lg:grid-cols-3 xl:grid-cols-5 xl:px-4 xl:gap-4 2xl:grid-cols-7 2xl:px-20">
                {
                  user && user.albums && user.albums.length > 0
                  && user.albums.map((album) => (!album.secret || userName === params.userName) && (
                    <Link to={`/album/${album.id}`} className="text-black" key={album.id}>
                      <div
                        className="rounded-2xl bg-cover pt-[calc(1900%/29)] bg-center relative"
                        style={{ backgroundImage: `url("${album.image?.src}")` }}
                      >
                        {!!album.secret && <HiLockClosed className="p-2 bg-white rounded-full absolute top-2 left-2" size={32} />}
                      </div>
                      <span className="block text-base font-bold ml-2 mt-1 xl:text-xl xl:mt-2">{album.name}</span>
                    </Link>
                  ))
                }
              </div>
            )
        }
      </div>
      <CreateAlbumModal isOpen={createAlbumModalOpen} setIsOpen={setCreateAlbumModalOpen} />
      <PlusButton />
    </div>
  );
};

export default User;

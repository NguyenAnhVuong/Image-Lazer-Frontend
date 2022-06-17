import { useEffect, useRef, useState } from 'react';
import { HiLockClosed } from 'react-icons/hi';
import { RiSettingsFill } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import userAPi from '../../api/userApi';
import { useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { UserInformation } from '../../models';
import CreateAlbumModal from '../Album/CreateAlbumModal';
import Colection from '../Colection';
import PlusButton from '../PlusButton';
import Setting from './Setting';

const User = () => {
  const params = useParams();
  const [user, setUser] = useState<UserInformation>();
  const [added, setAdded] = useState(true);
  const [createAlbumModalOpen, setCreateAlbumModalOpen] = useState(false);
  const createRef = useRef<any>();
  const saveRef = useRef<any>();
  const userName = useAppSelector((state: AppState) => state.auth.userName);
  const [settingOpen, setSettingOpen] = useState(false);
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
        });
      }
      console.log(res);
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

  return (
    <div className="pb-20">
      <button
        className="fixed top-0 left-0 h-14 flex items-center xl:hidden header-shadow w-full bg-white flex-row-reverse"
        type="button"
        onClick={() => setSettingOpen(true)}
      >
        <RiSettingsFill className="p-3" size={48} />
      </button>
      <Setting isOpen={settingOpen} setIsOpen={setSettingOpen} />
      <div className="flex items-center mt-20 flex-col">
        <div className="w-32 h-32">
          <img
            className="object-cover"
            src={`/uploads/${user?.avatar}`}
            alt=""
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
          người đang theo dõi
        </p>
        <p className="text-base font-bold">
          {user?.following?.length}
          {' '}
          người bạn đang theo dõi
        </p>
        <button
          className="bg-[#efefef] px-4 py-2 rounded-3xl text-base font-bold mb-4 xl:hidden"
          type="button"
        >
          <Link className="text-black" to="/create-image">
            Thêm ảnh
          </Link>
        </button>
        <button
          className="bg-[#efefef] px-4 py-2 rounded-3xl text-base font-bold xl:hidden"
          type="button"
          onClick={() => setCreateAlbumModalOpen(true)}
        >
          Thêm album
        </button>
      </div>

      <div>
        <div className="flex justify-center my-4">
          <button className="mr-5 p-2" type="button" onClick={() => setAdded(true)}>
            <div
              ref={createRef}
              className="pb-1 text-base font-bold border-b-[3px]"
            >
              Đã thêm
            </div>
          </button>
          <button className="p-2" type="button" onClick={() => setAdded(false)}>
            <div
              ref={saveRef}
              className="pb-1 text-base font-bold border-b-[3px]"
            >
              Đã lưu
            </div>
          </button>

        </div>
        {
          added
            ? (
              <div>
                {
                  user && user.createdImages && user.createdImages.length > 0
                    ? (<Colection images={user.createdImages} goverment={userName === user.userName} />)
                    : <div>Đã thêm</div>
                }
              </div>
            )
            : (
              <div className="grid grid-cols-2 gap-2 px-2 lg:grid-cols-3 xl:grid-cols-5 xl:px-4 xl:gap-4 2xl:grid-cols-7 2xl:px-20">
                {
                  user && user.albums && user.albums.length > 0
                  && user.albums.map((album) => (!album.secret || userName === params.userName) && (
                    <div className="" key={album.id}>
                      <div
                        className="rounded-2xl bg-cover pt-[calc(1900%/29)] bg-center relative"
                        style={{ backgroundImage: `url("${album.image?.src}")` }}
                      >
                        {!!album.secret && <HiLockClosed className="p-2 bg-white rounded-full absolute top-2 left-2" size={32} />}
                      </div>
                      <span className="block text-base font-bold ml-2 mt-1 xl:text-xl xl:mt-2">{album.name}</span>
                    </div>
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

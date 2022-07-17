import {
  Avatar, Dropdown, Input, Menu,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import axiosJWT from '../../api/axiosJWT';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { authActions } from '../../features/auth/authSlice';
import { commentActions } from '../../features/comment/commentSlice';
import { searchActions } from '../../features/search/searchSlice';
import Messages from '../Chat/ChatPC/Messages';
import Notifications from '../Notifications/Notifications';

const HeaderPC = () => {
  const userName = useAppSelector((state: AppState) => state.auth.userName);
  const user = useAppSelector((state: AppState) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const [search, setSearch] = useState('');
  const suggestions = useAppSelector(
    (state: AppState) => state.search.suggestions,
  );
  const handleSearchTopics = (value: string) => {
    dispatch(searchActions.setTopic(value));
  };
  const menu = (
    <Menu
      items={suggestions.map((suggestion, key) => ({
        key,
        label: suggestion.subTitle ? (
          <Link
            to={`/user/${suggestion.subTitle}`}
            className="flex items-center"
          >
            <img
              className="w-12 h-12 rounded-xl object-cover"
              src={suggestion.avatarSrc}
              alt=""
            />
            <div className="flex flex-col items-start ml-2">
              <span className="font-bold text-base">{suggestion.title}</span>
              <span className="font-medium text-sm">{suggestion.subTitle}</span>
            </div>
          </Link>
        ) : (
          <button
            className="flex items-center w-full"
            type="button"
            onClick={() => {
              handleSearchTopics(suggestion.title);
              navigate('/');
            }}
          >
            <img
              className="w-12 h-12 rounded-xl object-cover"
              src={suggestion.avatarSrc}
              alt=""
            />
            <span className="font-bold text-base ml-2">{suggestion.title}</span>
          </button>
        ),
      }))}
    />
  );

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
    const handleSearch = () => {
      dispatch(searchActions.setSearchWithDebounce(search));
    };
    handleSearch();
  }, [dispatch, search]);

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

  useEffect(() => {
    // console.log('irene');
    // if (user.userName) { dispatch(userActions.getUserStart(user.userName)); }
  }, [
    user.markMessageAsUnread,
    user.markMessageAsUnread?.length,
    user.userName,
  ]);

  return (
    <div className="hidden xl:block fixed top-0 left-0 right-0 bg-white header-shadow z-50">
      <div className="h-20 py-4">
        <div className="flex h-12 items-center px-4 header-pc">
          <button
            type="button"
            className="text-red-600 m-3 hover:bg-[#efefef]
          min-w-[48px] flex items-center justify-center h-12 rounded-full cursor-pointer"
            onClick={() => {
              dispatch(searchActions.setTopic('all'));
              navigate('/');
              dispatch(
                commentActions.setChosenCommentDetails({
                  id: '',
                  title: '',
                }),
              );
              dispatch(commentActions.setComments({ comments: [] }));
            }}
          >
            {/* <BsPinterest className="p-3" size={48} /> */}
            <img src="./logo.png" className="w-8 h-8 object-fit block" alt="" />
          </button>
          <div className="bg-black px-4 h-full rounded-3xl flex items-center">
            <Link
              className="text-white text-lg font-bold w-max"
              to="/"
              onClick={() => {
                dispatch(searchActions.setTopic('all'));
                dispatch(
                  commentActions.setChosenCommentDetails({
                    id: '',
                    title: '',
                  }),
                );
                dispatch(commentActions.setComments({ comments: [] }));
              }}
            >
              Trang chủ
            </Link>
          </div>
          <div className="h-full px-2 w-full">
            <Dropdown overlay={menu} trigger={['click']}>
              <Input
                className="h-full rounded-3xl bg-[#efefef]"
                prefix={<FaSearch />}
                placeholder="Tìm kiếm"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Dropdown>
          </div>
          <div className="flex">
            <div className="relative">
              <Notifications />
              {user.markNotificationAsUnread
                && (user.markNotificationAsUnread.comments.length > 0
                  || user.markNotificationAsUnread.likes.length > 0) && (
                  <div
                    className="bg-red-600 p-1 min-w-[20px] min-h-[20px] absolute right-0 top-0 flex
                 justify-center items-center text-white rounded-full"
                  >
                    <span
                      className=" leading-none text-xs
                "
                    >
                      {user.markNotificationAsUnread.comments.length
                        + user.markNotificationAsUnread.likes.length}
                    </span>
                  </div>
              )}
            </div>
            {/* <div className="hover:bg-[#efefef] rounded-full cursor-pointer">
              <AiFillMessage className="p-3" size={48} />
            </div> */}
            <div className="relative">
              <Messages />
              {user.markMessageAsUnread && user.markMessageAsUnread.length > 0 && (
                <div
                  className="bg-red-600 p-1 min-w-[20px] min-h-[20px] absolute right-0 top-0 flex
                 justify-center items-center text-white rounded-full"
                >
                  <span
                    className=" leading-none text-xs
                "
                  >
                    {user.markMessageAsUnread.length}
                  </span>
                </div>
              )}
            </div>

            <div className="p-3 hover:bg-[#efefef] rounded-full cursor-pointer w-12">
              <Link
                to={`/user/${userName}`}
                onClick={
                () => {
                  dispatch(
                    commentActions.setChosenCommentDetails({
                      id: '',
                      title: '',
                    }),
                  );
                  dispatch(commentActions.setComments({ comments: [] }));
                }
              }
              >
                {/* <img
                  className="object-cover h-6 w-6"
                  src={`/uploads/${user.avatar || 'default_avatar.png'}`}
                  alt=""
                /> */}
                <Avatar
                  className="object-cover h-6 w-6"
                  src={`/uploads/${user.avatar || 'default_avatar.png'}`}
                  size={8}
                />
              </Link>
            </div>
            <div className="relative flex items-center ">
              <button
                type="button"
                className="group"
                onClick={() => setIsOpen((state) => !state)}
                ref={ref}
              >
                <HiChevronDown
                  className="group-hover:bg-[#efefef] rounded-full cursor-pointer"
                  size={24}
                />
              </button>
              <div
                className={`absolute bg-white header-shadow top-12 right-[-12px] rounded-2xl w-48 z-20 ${
                  isOpen ? 'block' : 'hidden'
                }`}
              >
                <ul className="p-2">
                  <li className="">
                    <Link
                      className="text-black p-2 px-4 hover:bg-graybg text-base font-bold rounded-2xl w-full block"
                      to="/settings/user-information"
                    >
                      Thông tin cá nhân
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="text-black p-2 px-4 hover:bg-graybg text-base font-bold rounded-2xl w-full block"
                      to="/settings/user-password"
                    >
                      Đổi mật khẩu
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="text-black p-2 px-4 hover:bg-graybg text-base font-bold rounded-2xl w-full block"
                      to="/settings/user-topics"
                    >
                      Chủ đề
                    </Link>
                  </li>
                  <li className="p-2 px-4 hover:bg-graybg rounded-2xl cursor-pointer">
                    <button
                      className="text-base font-bold w-full text-left"
                      type="button"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPC;

import { Input } from 'antd';
import { AiFillMessage } from 'react-icons/ai';
import { BsPinterest } from 'react-icons/bs';
import { FaBell, FaSearch } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import axiosJWT from '../../api/axiosJWT';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { authActions } from '../../features/auth/authSlice';

const HeaderPC = () => {
  const userName = useAppSelector((state: AppState) => state.auth.userName);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const res = await axiosJWT.post('/users/auth/logout');
    if (res && res.data && !res.data.errorCode) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userName');
      dispatch(authActions.logout());
      navigate('/');
    }
  };
  return (
    <div className="hidden xl:block">
      <div className="h-20 py-4">
        <div className="flex h-12 items-center px-4 header-pc">
          <div className="text-red-600 mx-3 hover:bg-[#efefef] rounded-full cursor-pointer">
            <BsPinterest className="p-3" size={48} />
          </div>
          <div className="bg-black px-4 h-full rounded-3xl flex items-center">
            <Link className="text-white text-lg font-bold w-max" to="/">
              Trang chủ
            </Link>
          </div>
          <div className="h-full px-2 w-full">
            <Input className="h-full rounded-3xl bg-[#efefef]" prefix={<FaSearch />} placeholder="Tìm kiếm" />
          </div>
          <div className="flex">
            <div className="hover:bg-[#efefef] rounded-full cursor-pointer">
              <FaBell className="p-3" size={48} />
            </div>
            <div className="hover:bg-[#efefef] rounded-full cursor-pointer">
              <AiFillMessage className="p-3" size={48} />
            </div>
            <div className="p-3 hover:bg-[#efefef] rounded-full cursor-pointer w-12">
              <Link to={`/user/${userName}`}>
                <img
                  className="object-cover h-6 w-6"
                  src="/uploads/default_avatar.png"
                  alt=""
                />
              </Link>
            </div>
            <div className="flex items-center relative group">
              <HiChevronDown className="group-hover:bg-[#efefef] rounded-full cursor-pointer" size={24} />
              <div className="hidden group-hover:block absolute bg-white header-shadow top-12 right-[-12px] rounded-2xl w-48 z-20">
                <ul className="p-2">
                  <li className="">
                    <Link
                      className="text-black p-2 hover:bg-graybg text-base font-bold rounded-2xl w-full block"
                      to="/user-information"
                    >
                      Thông tin cá nhân
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-graybg rounded-2xl cursor-pointer">
                    <button className="text-base font-bold w-full text-left" type="button" onClick={handleLogout}>Đăng xuất</button>
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

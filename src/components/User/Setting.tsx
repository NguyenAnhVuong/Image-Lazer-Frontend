import { Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axiosJWT from '../../api/axiosJWT';
import { useAppDispatch } from '../../app/hooks';
import { authActions } from '../../features/auth/authSlice';

export interface SettingProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Setting = ({ isOpen, setIsOpen }: SettingProps) => {
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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {
        isOpen && (
          <Modal
            className="setting-modal"
            visible={isOpen}
            style={{ top: 48, left: 8 }}
            title={null}
            closable={false}
            footer={null}
            mask={false}
            onCancel={() => setIsOpen(false)}
          >
            <ul className="p-2 m-0">
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
          </Modal>
        )
      }
    </>
  );
};

export default Setting;

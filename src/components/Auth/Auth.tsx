import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import Login from './Login';
import Register from './Register';

function Auth() {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();
  const loginSuccess = useAppSelector((state: AppState) => state.auth.success);
  useEffect(() => {
    if (loginSuccess) {
      navigate('/');
    }
  }, [loginSuccess, navigate]);

  return (
    <div className='bg-[url("./images/Loginbg.jpg")] h-screen bg-cover bg-center'>
      <div className="bg-[#00000080] h-screen flex justify-center items-center">
        <div className="bg-white rounded-3xl px-12 py-8 lg:w-[480px]">
          <div className="flex justify-center">
            <img src="./logo.png" className="w-9 h-9 object-fit block" alt="" />
          </div>
          <div className="flex justify-center">
            {
              login
                ? <h1 className="text-2xl my-4 font-bold">Image Lazerへようこそ</h1>
                : <h1 className="text-2xl my-4 font-bold">Image Lazerへようこそ</h1>
            }
          </div>

          {
            login ? <Login /> : <Register setLogin={setLogin} />
          }
          <div className="flex justify-center">
            {
              login
                ? <span className="mr-1 font-bold"> Image Lazerは初めてですか？ </span>
                : <span className="mr-1 font-bold">すでに登録済みですか？</span>
            }
            <button className="font-bold" type="button" onClick={() => setLogin(!login)}>
              {
                login ? 'サインアップ' : 'ログイン'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;

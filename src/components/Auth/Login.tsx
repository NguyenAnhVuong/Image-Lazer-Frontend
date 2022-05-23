import { MouseEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { authActions } from '../../features/auth/authSlice';
import { LoginUser } from '../../models';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    const newLoginUser: LoginUser = {
      email,
      password,
    };
    dispatch(authActions.loginStart(newLoginUser));
  };
  return (
    <div className="bg-blue-300 w-full h-full fixed top-0 left-0 right-0 bottom-0 flex">
        <div className="fixed w-full h-full bg-black opacity-50">
        </div>
        <div className="bg-white w-full h-full rounded-none m-auto relative sm:rounded-[40px] sm:!h-auto sm:!w-auto">
            <div className="pt-5 pr-[10px] pb-6 pl-[10px] sm:pt-5 sm:pl-2 sm:pr-2 sm:pb-6">
                <div className="absolute top-5 right-6 text-2xl cursor-pointer no-underline py-1 px-2 rounded-3xl hover:bg-black-[.2]">
                    {/* <a href="" className="no-underline text-black leading-normal"><i className="fa-solid fa-xmark"></i></a> */}
                </div>
                <div className="py-0 px-5 sm:py-0 sm:px-10">
                    {/* <div className="text-center py-[10px] px-0">
                        <i className="text-red-600 text-5xl fa-brands fa-pinterest"></i>
                    </div> */}
                    <h1 className="py-0 px-4 text-center text-[2.7rem] font-bold leading-normal mb-6 sm:text-[3rem]">Welcome to Pinterest</h1>
                    <div className="text-center m-0 sm:my-0 sm:mx-[98px]">
                        <div className="w-full py-[5px] px-0 rounded-none">
                            <input className="py-[9px] px-3 rounded-[22px] no-underline border-solid border-[1px] border-[#ccc] hover:outline-none focus:outline-none hover:border-solid hover:border-[1px] hover:border-[#726f6f]" type="email" placeholder="Email" name="fn" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="w-full py-[5px] px-0 rounded-none">
                            <input className="py-[9px] px-3 rounded-[22px] no-underline border-solid border-[1px] border-[#ccc] hover:outline-none focus:outline-none hover:border-solid hover:border-[1px] hover:border-[#726f6f]" type="password" placeholder="Password" name="psw" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button className="my-5 mx-0 bg-red-600 no-underline border-none text-white min-w-[189px] rounded-[22px] py-2 px-0 hover:bg-[#d50c22]" type="submit" onClick={(e) => handleLogin(e)}>Login</button>
                    </div>
                    {/* <div className="text-center my-4 mx-0 text-[1.4rem] text-white">
                        <p className="register_switch">
                            <a className="no-underline text-black" href="./Register.tsx">Not on Pinterest yet? Sign up</a>
                            .
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    
    </div>
    
  );
}

export default Login;

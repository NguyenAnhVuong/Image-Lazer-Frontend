import { MouseEvent, useState } from 'react';
import authAPi from '../../api/authApi';
import { RegisterUser } from '../../models';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(0);
  const [err, setErr] = useState('');

  const handleRegister = async (e: MouseEvent) => {
    e.preventDefault();
    const newRegisterUser: RegisterUser = {
      fullName,
      email,
      password,
      age,
    };
    const success = await authAPi.register(newRegisterUser);
    if (success) {
      console.log('Đăng ký thành công');
    } else {
      console.log('Đăng ký thất bại');
      setErr('email này đã được đăng ký!');
    }
  };
  return (
    <div className="bg-sky-300 w-full h-full fixed top-0 left-0 right-0 bottom-0 flex">
        <div className="fixed w-full h-full bg-black opacity-50">
        </div>
        <div className="bg-white w-full h-full rounded-none m-auto relative sm:rounded-[40px] sm:!h-auto sm:!w-auto">
            <div className="pt-5 pr-[10px] pb-6 pl-[10px] sm:pt-5 sm:pl-2 sm:pr-2 sm:pb-6">
                {/* <div className="close">
                    <a href="" className="close-btn"><i className="fa-solid fa-xmark"></i></a>
                </div>  */}
                <div className="py-0 px-5 sm:py-0 sm:px-10">
                     {/* <div className="brand_img">
                        <i className="logo fa-brands fa-pinterest"></i>
                    </div>  */}
                    <h1 className="py-0 px-4 text-center text-[2.7rem] font-bold leading-normal sm:text-[3rem]">Welcome to Pinterest</h1>
                    <p className="text-center text-[1.2rem] leading-normal text-[#645a5a] mt-[3px] mb-[31px] mx-0">Find new ideas to try</p>
                    <div className="text-center m-0 sm:my-0 sm:mx-[98px]">
                        <div className="w-full py-[5px] px-0 rounded-none">
                            <input className="py-[9px] px-3 rounded-[22px] no-underline border-solid border-[1px] border-[#ccc] hover:outline-none focus:outline-none hover:border-solid hover:border-[1px] hover:border-[#726f6f]" type="name" placeholder="Name" name="name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        </div>
                        <div className="w-full py-[5px] px-0 rounded-none">
                            <input className="py-[9px] px-3 rounded-[22px] no-underline border-solid border-[1px] border-[#ccc] hover:outline-none focus:outline-none hover:border-solid hover:border-[1px] hover:border-[#726f6f]" type="email" placeholder="Email" name="fn" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="w-full py-[5px] px-0 rounded-none">
                            <input className="py-[9px] px-3 rounded-[22px] no-underline border-solid border-[1px] border-[#ccc] hover:outline-none focus:outline-none hover:border-solid hover:border-[1px] hover:border-[#726f6f]" type="password" placeholder="Password" name="psw" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="w-full py-[5px] px-0 rounded-none">
                            <input className="py-[9px] px-3 rounded-[22px] no-underline border-solid border-[1px] border-[#ccc] hover:outline-none focus:outline-none hover:border-solid hover:border-[1px] hover:border-[#726f6f]" type="age" placeholder="Age" name="age" value={age || ''} onChange={(e) => setAge(Number(e.target.value))} required />
                        </div>
                        <button className="my-5 mx-0 bg-red-600 no-underline border-none text-white min-w-[189px] rounded-[22px] py-2 px-0 hover:bg-[#d50c22]" type="submit" onClick={(e) => handleRegister(e)}>Register</button>
                    </div>
                    {/* <div className="text-center my-4 mx-0 text-[1.4rem] text-white">
                        <p className="login_switch"><a className="no-underline text-black" href="#">Already a member? Log in</a>.</p>
                    </div> */}
                </div>
            </div>
        </div>
    
    </div>
    // <form>
    //   <input className="border border-black" type="text" placeholder="Họ và tên" value={fullName} onChange={(e) => setFullName(e.target.value)} />
    //   <div>
    //     <input className="border border-black" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //     <p>{err}</p>
    //   </div>
    //   <input className="border border-black" type="password" placeholder="Tạo mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   <input className="border border-black" type="number" placeholder="Tuổi" value={age || ''} onChange={(e) => setAge(Number(e.target.value))} />
    //   <button className="border border-black" type="submit" onClick={(e) => handleRegister(e)}>Đăng ký</button>
    // </form>
  );
}

export default Register;

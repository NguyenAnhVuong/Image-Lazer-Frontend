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
    <form>
      <input className="border border-black" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border border-black" type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="border border-black" type="submit" onClick={(e) => handleLogin(e)}>Đăng nhập</button>
    </form>
  );
}

export default Login;

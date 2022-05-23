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
    <form>
      <input className="border border-black" type="text" placeholder="Họ và tên" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <div>
        <input className="border border-black" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <p>{err}</p>
      </div>
      <input className="border border-black" type="password" placeholder="Tạo mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input className="border border-black" type="number" placeholder="Tuổi" value={age || ''} onChange={(e) => setAge(Number(e.target.value))} />
      <button className="border border-black" type="submit" onClick={(e) => handleRegister(e)}>Đăng ký</button>
    </form>
  );
}

export default Register;

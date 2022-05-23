import { useState } from 'react';
import Login from './Login';
import Register from './Register';

function Auth() {
  const [login, setLogin] = useState(true);
  return (
    <div>
      {
        login ? <Login /> : <Register />
      }
      <button type="button" onClick={() => setLogin(!login)}>
        {
          login ? 'Đăng ký' : 'Đăng nhập'
        }
      </button>
    </div>
  );
}

export default Auth;

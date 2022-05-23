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
      <button className="no-underline text-black z-50 relative" type="button" onClick={() => setLogin(!login)}>
        {
          login ? 'Not on Pinterest yet? Sign up' : 'Already a member? Log in'
        }
      </button>
    </div>
  );
}

export default Auth;

import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { authActions } from '../../features/auth/authSlice';
import { LoginUser } from '../../models';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const loginError = useAppSelector((state: AppState) => state.auth.error);
  const dispatch = useAppDispatch();
  const handleLogin = (newLoginUser: LoginUser) => {
    dispatch(authActions.loginStart(newLoginUser));
  };

  useEffect(() => {
    if (loginError) {
      setErrorMessage('Sai tài khoản hoặc mật khẩu!');
    }
  }, [loginError]);

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={handleLogin}
      autoComplete="off"
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập email!',
          },
        ]}
      >
        <Input className="h-9 rounded-2xl" placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu!',
          },
        ]}
        validateStatus={errorMessage ? 'error' : 'validating'}
        help={errorMessage}
      >
        <Input.Password className="h-9 rounded-2xl" placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <div className="flex justify-center">
          <Button
            className="bg-red-600 rounded-2xl text-white flex items-center py-4 px-8 justify-center font-semibold text-sm"
            htmlType="submit"
          >
            Đăng nhập
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default Login;

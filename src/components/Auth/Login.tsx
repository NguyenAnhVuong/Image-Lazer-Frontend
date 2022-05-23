import { Button, Form, Input } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import { authActions } from '../../features/auth/authSlice';
import { LoginUser } from '../../models';

function Login() {
  const dispatch = useAppDispatch();

  const handleLogin = (newLoginUser: LoginUser) => {
    dispatch(authActions.loginStart(newLoginUser));
  };

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
      >
        <Input.Password className="h-9 rounded-2xl" placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <div className="flex justify-center">
          <Button className="bg-red-600 rounded-2xl text-white flex items-center py-4 px-8 justify-center font-semibold text-sm" htmlType="submit">
            Đăng nhập
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default Login;

import {
  Button, Form, Input, InputNumber,
} from 'antd';
import authAPi from '../../api/authApi';
import { RegisterUser } from '../../models';

function Register() {
  const handleRegister = async (newRegisterUser: RegisterUser) => {
    try {
      const success = await authAPi.register(newRegisterUser);
      if (success) {
        console.log('Đăng ký thành công');
      } else {
        console.log('Đăng ký thất bại');
        // setErr('email này đã được đăng ký!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={handleRegister}
      autoComplete="off"
    >
      <Form.Item
        name="fullName"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập Họ và tên!',
          },
        ]}
      >
        <Input className="h-9 rounded-2xl" placeholder="Họ và tên" />
      </Form.Item>

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
        name="age"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tuổi!',
          },
        ]}
      >
        <InputNumber className="h-9 rounded-2xl w-full" min={1} max={100} placeholder="Tuổi" />
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
            Đăng Ký
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default Register;

import {
  Button, Form, Input, InputNumber,
} from 'antd';
import { useState } from 'react';
import authAPi from '../../api/authApi';
import { RegisterUser } from '../../models';

export interface RegisterProps {
  setLogin: (login: boolean) => void;
}

const Register = ({ setLogin }: RegisterProps) => {
  const [errorMesage, setErrorMessage] = useState('');
  const handleRegister = async (newRegisterUser: RegisterUser) => {
    try {
      const success = await authAPi.register(newRegisterUser);
      if (success) {
        setLogin(true);
        console.log('サインアップに成功しました');
      } else {
        setErrorMessage('アカウントはすでに存在しています');
      }
    } catch (error) {
      setErrorMessage('アカウントはすでに存在しています');
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
            message: 'お名前と苗字を入力してください',
          },
        ]}
      >
        <Input className="h-9 rounded-2xl" placeholder="名前と苗字" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: '電子メールを入力してください',
          },
        ]}
      >
        <Input className="h-9 rounded-2xl" placeholder="電子メール" />
      </Form.Item>

      <Form.Item
        name="age"
        rules={[
          {
            required: true,
            message: '年齢を入力してください',
          },
        ]}
      >
        <InputNumber className="h-9 rounded-2xl w-full" min={1} max={100} placeholder="年齢" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'パスワードを入力してください',
          },
        ]}
      >
        <Input.Password className="h-9 rounded-2xl" placeholder="パスワード" />
      </Form.Item>
      <div className="flex justify-center">
        <p className="text-[#ff4d4f]">{errorMesage}</p>
      </div>

      <Form.Item>
        <div className="flex justify-center">
          <Button
            className="bg-red-600 rounded-2xl text-white flex items-center py-4 px-8 justify-center font-semibold text-sm"
            htmlType="submit"
          >
            サインアップ
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Register;

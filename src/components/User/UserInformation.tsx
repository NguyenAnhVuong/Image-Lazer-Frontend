import {
  Button, Form, Typography, Input, Avatar, InputNumber, Modal,
  Upload, message, Layout,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { IoIosArrowBack } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosJWT from '../../api/axiosJWT';
import userAPi from '../../api/userApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { authActions } from '../../features/auth/authSlice';
import 'antd/dist/antd.css';
import { userActions } from '../../features/user/userSlice';
import {
  ChangePassword, TopicInformation, topics, UpdateUserInformation,
} from '../../models';

const { Title, Paragraph } = Typography;
const { Dragger } = Upload;
const { Sider, Content } = Layout;

export const TopicCard = ({ topic, added, onClick }
: { topic: TopicInformation, added: boolean, onClick: () => void }) => (
  <div className="flex flex-col w-full items-center justify-center
  xl:px-4 py-2 rounded-2xl xl:hover:bg-slate-300 xl:cursor-pointer"
  >
    <div className="relative w-full">
      <div className="relative w-full pt-[100%] xl:pt-[56.25%]">
        <img
          src={topic.image?.src}
          className="brightness-50 rounded-2xl object-cover
          xl:w-[250px] xl:h-[100px] absolute top-0 right-0 bottom-0 left-0 w-full h-full"
          alt={topic.name}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <Title level={4} className="text-white text-base">
          {topic.name}
        </Title>
      </div>
    </div>
    <Button
      className={`mt-2 xl:mt-0 xl:w-full ${added ? 'bg-graybg text-black' : 'bg-black text-white'} max-w-[160px]`}
      shape="round"
      type="text"
      onClick={onClick}
    >
      <div className="font-semibold text-sm min-w-[72px]">
        {added ? 'Xóa' : 'Thêm'}
      </div>
    </Button>
  </div>
);

const SideMenu = ({
  option, navigate,
} : any) => (
  <Sider
    theme="light"
    breakpoint="lg"
  >
    <div
      style={
        {
          position: 'absolute', height: '100vh', width: '20vw',
        }
      }
      className="m-10 hidden xl:block max-w-[250px]"
    >
      <div className="columns-1">
        <button className="mr-5 p-1 my-1" type="button" onClick={() => navigate('/settings/user-information')}>
          <div
            className={`pb-1 text-base font-bold border-b-[3px]
              ${(option === 'user-information') ? 'border-black' : 'border-transparent'}`}
          >
            Thông tin cá nhân
          </div>
        </button>
        <button className="mr-5 p-1 my-1" type="button" onClick={() => navigate('/settings/user-password')}>
          <div
            className={`pb-1 text-base font-bold border-b-[3px]
              ${(option === 'user-password') ? 'border-black' : 'border-transparent'}`}
          >
            Thay đổi mật khẩu
          </div>
        </button>
        <button className="mr-5 p-1 my-1" type="button" onClick={() => navigate('/settings/user-topics')}>
          <div
            className={`pb-1 text-base font-bold border-b-[3px]
              ${(option === 'user-topics') ? 'border-black' : 'border-transparent'}`}
          >
            Chọn chủ đề
          </div>
        </button>
      </div>
    </div>
  </Sider>
);

const InformationForm = ({
  form, userRedux, handleSubmit, handleLogout, showModal, changed, setChanged,
} : any) => (
  <div className="xl:w-1/3">
    <Title level={3} className="hidden xl:block">
      Thông tin cá nhân
    </Title>
    <Paragraph strong className="hidden xl:block">
      Thay đổi thông tin cá nhân của bạn
    </Paragraph>
    <Paragraph className="hidden xl:block mt-5">
      Ảnh
    </Paragraph>
    <div className="flex flex-col xl:flex-row items-center">
      <Avatar
        size={100}
        src={`/uploads/${userRedux.avatar || 'default_avatar.png'}`}
        className="xl:-mt-3 w-[120px] h-[120px]"
      />
      <Button
        type="primary"
        shape="round"
        className="mt-5 xl:ml-5 bg-graybg border-transparent text-black font-medium max-w-[100px]"
        onClick={showModal}
      >
        Thay đổi
      </Button>
    </div>
    <Form
      name="normal_info"
      className="mt-5"
      layout="vertical"
      requiredMark={false}
      onValuesChange={() => {
        // Check if form's content changed from userRedux
        if (userRedux) {
          const { fullName, age } = form.getFieldsValue();
          if (fullName !== userRedux.fullName || age !== userRedux.age) {
            setChanged(true);
          } else {
            setChanged(false);
          }
        }
      }}
      form={form}
    >
      <Form.Item
        name="fullName"
        label="Họ và Tên"
        colon={false}
        rules={[
          {
            required: true,
            message: 'Họ và Tên không được để trống',
          },
        ]}
      >
        <Input name="fullName" className="rounded-2xl px-4 py-2" />
      </Form.Item>
      <Form.Item
        name="age"
        label="Tuổi"
        colon={false}
        rules={[
          {
            required: true,
            message: 'Tuổi không được để trống',
          },
        ]}
      >
        <InputNumber name="age" className="rounded-2xl flex items-center h-10 overflow-hidden" />
      </Form.Item>
      <Form.Item>
        <div className="xl:flex xl:justify-center gap-1">
          <Button
            type="primary"
            shape="round"
            className={`hidden xl:inline-block border-transparent font-medium bg-graybg
              ${changed ? ' text-black' : 'text-slate-500'}`}
            onClick={() => {
              form.setFieldsValue({
                fullName: userRedux.fullName,
                age: userRedux.age,
              });
              setChanged(false);
            }}
            disabled={!changed}
          >
            Thiết lập lại
          </Button>
          <Button
            type="primary"
            shape="round"
            className={`fixed top-[11px] right-2 flex items-center px-4 py-1 h-auto border-transparent font-medium
              xl:static xl:text-center z-[999] ${changed ? 'bg-primary text-white' : 'bg-graybg text-slate-500'}`}
            onClick={() => {
              form.validateFields().then((values : any) => {
                handleSubmit(values as UpdateUserInformation);
              }).catch((info : any) => {
                console.log('Validate Failed:', info);
              });
            }}
            disabled={!changed}
          >
            Lưu
          </Button>
          <Button
            type="primary"
            shape="round"
            className="hidden xl:inline-block bg-graybg border-transparent text-black font-medium"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Form.Item>
    </Form>
  </div>
);

const ChangePasswordForm = ({
  handleChangePassword, wrongPassword,
} : any) => (
  <div className="xl:w-1/3">
    <Title level={3} className="hidden xl:block">
      Thay đổi mật khẩu
    </Title>
    <Paragraph strong className="hidden xl:block">
      Thay đổi mật khẩu của bạn
    </Paragraph>
    <Form
      name="normal_password"
      className="mt-5"
      layout="vertical"
      onFinish={handleChangePassword}
      requiredMark={false}
    >
      <Form.Item
        name="oldPassword"
        label="Mật khẩu cũ"
        colon={false}
        validateStatus={wrongPassword ? 'error' : ''}
        help={wrongPassword ? 'Mật khẩu cũ không đúng' : ''}
        rules={[
          {
            required: true,
            message: 'Mật khẩu cũ không được để trống',
          },
        ]}
      >
        <Input.Password name="oldPassword" className="rounded-2xl px-4 py-2" />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="Mật khẩu mới"
        colon={false}
        rules={[
          {
            required: true,
            message: 'Mật khẩu mới không được để trống',
          },
        ]}
      >
        <Input.Password name="newPassword" className="rounded-2xl px-4 py-2" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Xác nhận mật khẩu"
        colon={false}
        rules={[
          {
            required: true,
            message: 'Xác nhận mật khẩu không được để trống',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu mới và xác nhận mật khẩu không trùng khớp'));
            },
          }),
        ]}
      >
        <Input.Password name="confirmPassword" className="rounded-2xl px-4 py-2" />
      </Form.Item>
      <Form.Item>
        <div className="flex justify-center">
          <Button
            className="fixed top-[11px] right-2 flex items-center px-4 py-1 h-auto z-[999]
            bg-graybg border-transparent text-black font-medium xl:static xl:text-center"
            shape="round"
            htmlType="submit"
          >
            Thay đổi
          </Button>
        </div>
      </Form.Item>
    </Form>
  </div>
);

const UserInformationPage = () => {
  const userRedux = useAppSelector((state: AppState) => state.user.user);
  const [isOpen, setIsOpen] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [changed, setChanged] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsOpen(true);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleChange = async (info: any) => {
    const { status } = info.file;

    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadAvatar = async (options: any) => {
    const {
      onSuccess, onError, file,
    } = options;

    const fmData = new FormData();
    fmData.append('avatar', file);
    const res = await userAPi.updateAvatar(userRedux.id || '', fmData);
    if (res) {
      onSuccess(res);
      setIsOpen(false);
      dispatch(userActions.getUserStart(userRedux.userName || ''));
    } else {
      onError(res);
    }
  };

  const handleSubmit = async (values: UpdateUserInformation) => {
    const res = await userAPi.updateUser(userRedux.id || '', values);
    if (res) {
      dispatch(userActions.getUserStart(userRedux.userName || ''));
      setChanged(false);
      message.success('Cập nhật thành công');
    } else {
      setChanged(true);
      message.error('Cập nhật thất bại');
    }
  };

  const handleChangePassword = async (values: ChangePassword) => {
    const res = await userAPi.changePassword(userRedux.id || '', values);
    if (res) {
      message.success('Đổi mật khẩu thành công');
      setWrongPassword(false);
    } else {
      message.error('Đổi mật khẩu thất bại');
      setWrongPassword(true);
    }
  };

  const handleChangeTopic = async (value: string, add: boolean) => {
    const newTopics = [...userRedux.topics || []];
    if (add && !newTopics.includes(value)) {
      newTopics.push(value);
    } else if (!add && newTopics.includes(value)) {
      newTopics.splice(newTopics.indexOf(value), 1);
    }
    const res = await userAPi.updateTopics({ topic: newTopics });
    if (res) {
      dispatch(userActions.getUserStart(userRedux.userName || ''));
    }
  };

  const handleLogout = async () => {
    const res = await axiosJWT.post('/users/auth/logout');
    if (res && res.data && !res.data.errorCode) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userName');
      dispatch(authActions.logout());
      navigate('/');
    }
  };

  useEffect(() => {
    // If fullname and age are not set, set them to default value
    if (!changed && params.option === 'user-information') {
      form.setFieldsValue({
        fullName: userRedux.fullName,
        age: userRedux.age,
      });
    }
  }, [form, changed, userRedux, params.option]);

  return (
    <div className="xl:flex xl:justify-center">
      <div className="fixed top-0 flex justify-center w-full h-14 items-center bg-white header-shadow xl:hidden z-[999]">
        <button type="button" className="absolute left-0" onClick={() => navigate(`/user/${userRedux.userName}`)}>
          <IoIosArrowBack className="p-3 text-black" size={48} />
        </button>
        <span className="text-base font-bold">
          {(params.option === 'user-information') ? 'Thông tin cá nhân' : null}
          {(params.option === 'user-password') ? 'Đổi mật khẩu' : null}
          {(params.option === 'user-topics') ? 'Chủ đề' : null}
        </span>
      </div>
      <Layout className="bg-transparent">
        <div className="hidden xl:block xl:mr-10">
          <SideMenu
            option={params.option || 'user-information'}
            navigate={navigate}
          />
        </div>
        <Content className="w-full justify-center px-5 xl:px-10 pt-20 xl:pt-10">
          {params.option === 'user-information' && (
            <InformationForm
              form={form}
              userRedux={userRedux}
              handleSubmit={handleSubmit}
              handleLogout={handleLogout}
              showModal={showModal}
              changed={changed}
              setChanged={setChanged}
            />
          )}
          {params.option === 'user-password' && (
            <ChangePasswordForm
              form={form}
              handleChangePassword={handleChangePassword}
              wrongPassword={wrongPassword}
            />
          )}
          {params.option === 'user-topics' && (
            <div className="xl:w-[1000px] 2xl:w-[1200px]">
              <Title level={3} className="hidden xl:block">
                Thay đổi chủ đề
              </Title>
              <Paragraph strong className="hidden xl:block">
                Chọn những chủ đề mà bạn muốn hiện trên bảng tin
              </Paragraph>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {topics.map((topic) => (
                  <div key={topic.name} className="flex justify-center">
                    <TopicCard
                      topic={topic}
                      added={userRedux.topics?.includes(topic.name) || false}
                      onClick={() => {
                        if (userRedux.topics?.includes(topic.name)) {
                          handleChangeTopic(topic.name, false);
                        } else {
                          handleChangeTopic(topic.name, true);
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Content>
        <Modal
          title="Upload"
          visible={isOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Dragger
            name="avatar"
            accept="image/*"
            customRequest={uploadAvatar}
            multiple={false}
            onChange={handleChange}
            withCredentials
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
          </Dragger>
        </Modal>
      </Layout>
    </div>
  );
};

export default UserInformationPage;

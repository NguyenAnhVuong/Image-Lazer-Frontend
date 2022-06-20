import {
  Button, Form, Input, message, Modal, Switch,
} from 'antd';
import { useState } from 'react';
import albumsApi from '../../api/albumsApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { userActions } from '../../features/user/userSlice';
import { AlbumCardInformation } from '../../models';

type CreateAlbumModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const key = 'updatable';
const CreateAlbumModal = ({ isOpen, setIsOpen }: CreateAlbumModalProps) => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state: any) => state.auth.userName);

  const handleCreateAlbum = async (album: AlbumCardInformation) => {
    const newAlbum: AlbumCardInformation = {
      name: album.name,
      description: album.description || '',
      secret: !!album.secret,
    };
    const res = await albumsApi.createAlbum(newAlbum);
    if (res) {
      setIsOpen(false);
      setErrorMessage('');
      form.resetFields();
      dispatch(userActions.getUserStart(userName));
      message.loading({
        content: 'Đang tải...',
        key,
      });
      setTimeout(() => {
        message.success({
          content: 'Tạo Album thành công!',
          key,
          duration: 2,
        });
      }, 1000);
    } else {
      setErrorMessage('Album này đã tồn tại!');
    }
  };

  return (
    <div className="create-album-modal">
      <Modal
        visible={isOpen}
        title="Thêm Album"
        closable={false}
        footer={null}
        onCancel={() => setIsOpen(false)}
      >
        <Form
          name="basic"
          form={form}
          onFinish={handleCreateAlbum}
          autoComplete="off"
          layout="vertical"
        >
          <div>
            <span className="text-sm mb-2 ml-1 block">Tên Album</span>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên album!',
                },
              ]}
              validateStatus={errorMessage ? 'error' : 'validating'}
              help={errorMessage}
            >
              <Input className="rounded-2xl px-4 py-2" />
            </Form.Item>
          </div>
          <Form.Item
            name="description"
          >
            <div>
              <span className="text-sm mb-2 ml-1 block">Mô tả</span>
              <Input.TextArea className="rounded-2xl px-4 py-2 h-24 resize-none" />
            </div>
          </Form.Item>
          <div className="flex items-center">
            <span className="text-sm mb-6 ml-1 block mr-4">Giữ bí mật bảng</span>
            <Form.Item name="secret" valuePropName="checked">
              <Switch />
            </Form.Item>
          </div>
          <div className="flex justify-center">
            <Form.Item>
              <Button
                className="font-semibold rounded-3xl h-auto px-4 py-2 mr-8"
                onClick={() => setIsOpen(false)}
              >
                Hủy
              </Button>
              <Button
                className="bg-primary text-white font-semibold rounded-3xl h-auto px-5 py-2"
                htmlType="submit"
              >
                Lưu
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateAlbumModal;

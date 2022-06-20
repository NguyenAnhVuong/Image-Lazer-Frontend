import {
  Button, Form, Input, message, Modal, Switch,
} from 'antd';
import { useEffect, useState } from 'react';
import albumsApi from '../../api/albumsApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { userActions } from '../../features/user/userSlice';
import { AlbumCardInformation, AlbumInformation } from '../../models';

type EditAlbumModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  albumInfo: AlbumInformation;
  setReRender: (value: boolean) => void;
};

const key = 'updatable';
const EditAlbumModal = ({
  isOpen, setIsOpen, albumInfo, setReRender,
}: EditAlbumModalProps) => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state: any) => state.auth.userName);

  const handleUpdateAlbum = async (album: AlbumCardInformation) => {
    const newAlbumInfo: AlbumCardInformation = {
      id: albumInfo.id,
      name: album.name,
      description: album.description || '',
      secret: !!album.secret,
    };
    const res = await albumsApi.updateImageInAlbum(newAlbumInfo);
    if (res) {
      setIsOpen(false);
      setErrorMessage('');
      form.resetFields();
      setReRender(true);
      message.loading({
        content: 'Đang tải...',
        key,
      });
      setTimeout(() => {
        message.success({
          content: 'Cập nhật thông tin Album thành công!',
          key,
          duration: 2,
        });
      }, 1000);
      dispatch(userActions.getUserStart(userName));
    } else {
      setErrorMessage('Album này đã tồn tại!');
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      name: albumInfo.name,
      description: albumInfo.description,
      secret: albumInfo.secret,
    });
  }, [albumInfo, form]);

  return (
    <div className="create-album-modal">
      <Modal
        visible={isOpen}
        title="Thông tin Album"
        closable={false}
        footer={null}
        onCancel={() => setIsOpen(false)}
      >
        <Form
          name="basic"
          form={form}
          onFinish={handleUpdateAlbum}
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
          <div>
            <span className="text-sm mb-2 ml-1 block">Mô tả</span>
            <Form.Item
              name="description"
            >
              <Input.TextArea className="rounded-2xl px-4 py-2 h-24 resize-none" />
            </Form.Item>
          </div>

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

export default EditAlbumModal;

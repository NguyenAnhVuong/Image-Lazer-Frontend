import {
  Button, Form, Input, Modal, Switch,
} from 'antd';
import { useState } from 'react';
import albumsApi from '../../api/albumsApi';
import { useAppDispatch } from '../../app/hooks';
import { albumsActions } from '../../features/album/albumSlice';
import { AlbumInformation } from '../../models';

type CreateAlbumModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const CreateAlbumModal = ({ isOpen, setIsOpen }: CreateAlbumModalProps) => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();

  const handleCreateAlbum = async (album: AlbumInformation) => {
    const newAlbum: AlbumInformation = {
      name: album.name,
      description: album.description || '',
      secret: !!album.secret,
    };
    const res = await albumsApi.createAlbum(newAlbum);
    if (res) {
      setIsOpen(false);
      setErrorMessage('');
      form.resetFields();
      dispatch(albumsActions.getAlbumsStart());
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
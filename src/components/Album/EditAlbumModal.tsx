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
        content: 'ローディング...',
        key,
      });
      setTimeout(() => {
        message.success({
          content: 'アルバムを更新しました!',
          key,
          duration: 2,
        });
      }, 1000);
      dispatch(userActions.getUserStart(userName));
    } else {
      setErrorMessage('アルバム名が重複しています');
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
            <span className="text-sm mb-2 ml-1 block">アルバム名</span>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'アルバム名を入力してください',
                },
              ]}
              validateStatus={errorMessage ? 'error' : 'validating'}
              help={errorMessage}
            >
              <Input className="rounded-2xl px-4 py-2" />
            </Form.Item>
          </div>
          <div>
            <span className="text-sm mb-2 ml-1 block">説明</span>
            <Form.Item
              name="description"
            >
              <Input.TextArea className="rounded-2xl px-4 py-2 h-24 resize-none" />
            </Form.Item>
          </div>

          <div className="flex items-center">
            <span className="text-sm mb-6 ml-1 block mr-4">ボードを秘密にする</span>
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
                キャンセル
              </Button>
              <Button
                className="bg-primary text-white font-semibold rounded-3xl h-auto px-5 py-2"
                htmlType="submit"
              >
                更新
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default EditAlbumModal;

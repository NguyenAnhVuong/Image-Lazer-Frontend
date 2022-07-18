import { ZoomInOutlined } from '@ant-design/icons';
import {
  Button, Form, Image, Input, message, Select, Space,
} from 'antd';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import imageApi from '../../api/imageApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { userActions } from '../../features/user/userSlice';
import { CreateImage, ImageInformation, topics } from '../../models';

const key = 'updatable';
const EditImagePage = () => {
  const userAlbums = useAppSelector((state: AppState) => state.user.user.albums);
  const userName = useAppSelector((state: AppState) => state.auth.userName);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<ImageInformation>({});
  const [form] = Form.useForm();

  const handleUpdateImage = async (info: CreateImage) => {
    const newImage = {
      title: info.title,
      topic: info.topic,
      description: info.description || '',
      link: info.link,
      album: info.album,
    };
    const res = await imageApi.updateImage(params.id || '', newImage);
    if (res) {
      message.loading({
        content: 'ローディング...',
        key,
      });
      setTimeout(() => {
        message.success({
          content: '画像情報の保存に成功しました',
          key,
          duration: 2,
        });
      }, 1000);
      navigate(`/image/${params.id}`);
      dispatch(userActions.getUserStart(userName));
    }
  };

  useEffect(() => {
    const getImageFromApi = async () => {
      if (params.id) {
        const res = await imageApi.getImageDetail(params.id);
        console.log('res: ', res);
        const imageInfo: ImageInformation = {
          id: params.id,
          name: res.image,
          src: `/uploads/${res.image}`,
          height: res.image_height,
          width: res.image_width,
          comment: res.comment,
          likes: res.likes,
          link: res.link,
          title: res.title,
          topic: res.topic,
          description: res.description,
          user: {
            userName: res.userInformation.userName,
            fullName: res.userInformation.fullName,
            avatar: res.userInformation.avatar,
            followers: res.userInformation.followers,
          },
        };
        setImage(imageInfo);
        form.setFieldsValue({
          title: res.title,
          topic: res.topic,
          description: res.description,
          link: res.link,
          album: userAlbums?.filter((album) => album.id === res.album_id)[0].name,
        });
      }
    };
    getImageFromApi();
  }, [form, params, userAlbums]);

  return (
    <div className="xl:flex xl:justify-center xl:mt-20">
      <div className="fixed top-0 flex justify-center w-full h-14 items-center bg-white header-shadow xl:hidden">
        <button type="button" className="absolute left-0" onClick={() => navigate(-1)}>
          <IoIosArrowBack className="p-3 text-black" size={48} />
        </button>
        <span className="text-base font-bold">画像情報の変更</span>
      </div>
      <div className="flex flex-col items-center p-4 mt-14 xl:flex-row  xl:w-[1200px]">
        <div className="xl:w-[40%] xl:flex xl:justify-center">
          <div
            className="
            w-64
            flex
            flex-col
            justify-center
            items-center
            cursor-pointer
            rounded-2xl
            overflow-hidden
            xl:w-80
            "
          >
            <Image
              className="object-cover w-full rounded-xl overflow-hidden"
              src={image.src}
              alt=""
              preview={{
                maskClassName: 'customize-mask',
                mask: (
                  <Space direction="vertical" align="center">
                    <div className="flex items-center">
                      <ZoomInOutlined />
                      <span className="ml-1">拡大する</span>
                    </div>
                  </Space>
                ),
              }}
            />
          </div>
        </div>
        <div className="w-full mt-5 xl:w-[60%]">
          <Form
            name="basic"
            form={form}
            onFinish={handleUpdateImage}
            autoComplete="off"
            layout="vertical"
          >
            <div>
              <span className="text-sm mb-2 ml-1 block">画像タイトル</span>
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: '画像タイトルを入力してください',
                  },
                ]}
              >
                <Input name="title" className="rounded-2xl px-4 py-2" />
              </Form.Item>
            </div>

            <div>
              <span className="text-sm mb-2 ml-1 block">イメージテーマ</span>
              <Form.Item
                name="topic"
                rules={[
                  {
                    required: true,
                    message: 'イメージテーマを入力してください',
                  },
                ]}
                noStyle={false}
              >

                <Select
                  placeholder="イメージテーマを選択してください"
                  allowClear
                >
                  {
                    topics.map((topic, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Select.Option key={index} value={topic.name}>
                        <img className="w-12 h-12 rounded-xl object-cover" src={topic.image?.src} alt="" />
                        <span className="font-bold text-base ml-2">{topic.name}</span>
                      </Select.Option>
                    ))
                  }
                </Select>
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

            <div>
              <span className="text-sm mb-2 ml-1 block">リンク</span>
              <Form.Item name="link">
                <Input className="rounded-2xl px-4 py-2" />
              </Form.Item>
            </div>

            <div>
              <span className="text-sm mb-2 ml-1 block">アルバム</span>
              <Form.Item
                name="album"
                rules={[
                  {
                    required: true,
                    message: 'アルバムを選択してください',
                  },
                ]}
              >
                <Select
                  placeholder="アルバムを選ぶ"
                  allowClear
                >
                  {
                    userAlbums?.map((album) => (
                      <Select.Option key={album.id} value={album.name}>
                        <img className="w-12 h-12 rounded-xl object-cover" src={album.image?.src} alt="" />
                        <span className="font-bold text-base ml-2 truncate">{album.name}</span>
                      </Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </div>
            <Form.Item>
              <div className="xl:flex xl:justify-center gap-12">
                <button
                  className="hidden xl:inline-block px-8 py-2 text-base font-semibold bg-graybg rounded-[24px]"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  キャンセル
                </button>
                <Button
                  className="
                fixed top-[11px] right-2 rounded-[24px] bg-red-600 text-white
                flex items-center text-base font-semibold px-4 py-1 h-auto
                xl:static xl:text-center xl:px-8 xl:py-2
                "
                  htmlType="submit"
                >
                  更新
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>

  );
};

export default EditImagePage;

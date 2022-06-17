import {
  Button, Form, Input, Select,
} from 'antd';
import { useState } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import imageApi from '../../api/imageApi';
import uploadApi from '../../api/uploadApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { userActions } from '../../features/user/userSlice';
import { CreateImage, ImageInformation, topics } from '../../models';

const CreateImagePage = () => {
  const userAlbums = useAppSelector((state: AppState) => state.user.user.albums);
  const userName = useAppSelector((state: AppState) => state.auth.userName);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<ImageInformation>({
    name: '', src: '', height: 0, width: 0,
  });
  const [form] = Form.useForm();

  const handleUploadImage = async (e: any) => {
    const images = e.target.files;
    const fileImage = new FormData();
    fileImage.append('image', images[0]);
    const imageInfor: ImageInformation = await uploadApi.uploadSingleImage(fileImage);
    if (imageInfor.src) {
      setImage(imageInfor);
    }
  };

  const handleAddImage = async (info: CreateImage) => {
    const newImage = {
      image: image.name,
      image_height: image.height,
      image_width: image.width,
      title: info.title,
      topic: info.topic,
      description: info.description || '',
      link: info.link,
      album: info.album,
    };
    const res = await imageApi.createImage(newImage);
    if (res) {
      setImage({
        name: '', src: '', height: 0, width: 0,
      });
      form.resetFields();
      dispatch(userActions.getUserStart(userName));
    }
  };

  return (
    <div className="xl:flex xl:justify-center">
      <div className="fixed top-0 flex justify-center w-full h-14 items-center bg-white header-shadow xl:hidden">
        <button type="button" className="absolute left-0" onClick={() => navigate(-1)}>
          <IoIosArrowBack className="p-3 text-black" size={48} />
        </button>
        <span className="text-base font-bold">Thêm Ảnh</span>
      </div>
      <div className="flex flex-col items-center p-4 mt-14 xl:flex-row  xl:w-[1200px]">
        <div className="xl:w-[40%] xl:flex xl:justify-center">
          {
            image.src
              ? (
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label
                  className="
            h-36
            w-64
            flex
            flex-col
            justify-center
            items-center
            cursor-pointer
            rounded-2xl
            overflow-hidden
            xl:w-80
            xl:h-[480px]
            "
                  htmlFor="image"
                >
                  <img className="object-cover w-full rounded-xl" src={image.src} alt="" />
                </label>
              )
              : (
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label
                  className="
            h-36
            w-64
            flex
            flex-col
            justify-center
            items-center
            cursor-pointer
            border
            border-black
            rounded-2xl
            xl:w-80
            xl:h-[480px]
            "
                  htmlFor="image"
                >
                  <BsFillCloudUploadFill size={28} />
                  <span className="p-3">Chọn một ảnh</span>
                </label>
              )
          }

          <input hidden id="image" type="file" onChange={(e) => handleUploadImage(e)} />
        </div>
        <div className="w-full mt-5 xl:w-[60%]">
          <Form
            name="basic"
            form={form}
            onFinish={handleAddImage}
            autoComplete="off"
            layout="vertical"
          >
            <div>
              <span className="text-sm mb-2 ml-1 block">Tiêu đề ảnh</span>
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tiêu đề ảnh!',
                  },
                ]}
              >
                <Input className="rounded-2xl px-4 py-2" />
              </Form.Item>
            </div>

            <div>
              <span className="text-sm mb-2 ml-1 block">Chủ đề ảnh</span>
              <Form.Item
                name="topic"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn topic!',
                  },
                ]}
                noStyle={false}
              >

                <Select
                  placeholder="Chọn chủ đề ảnh"
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

            <Form.Item
              name="description"
            >
              <div>
                <span className="text-sm mb-2 ml-1 block">Mô tả</span>
                <Input.TextArea className="rounded-2xl px-4 py-2 h-24 resize-none" />
              </div>
            </Form.Item>
            <Form.Item name="link">
              <div>
                <span className="text-sm mb-2 ml-1 block">Liên kết</span>
                <Input className="rounded-2xl px-4 py-2" />
              </div>
            </Form.Item>
            <div>
              <span className="text-sm mb-2 ml-1 block">Album ảnh</span>
              <Form.Item
                name="album"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn album!',
                  },
                ]}
              >
                <Select
                  placeholder="Chọn Album ảnh"
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
                  Hủy
                </button>
                <Button
                  className="
                fixed top-[11px] right-2 rounded-[24px] bg-red-600 text-white
                flex items-center text-base font-semibold px-4 py-1 h-auto
                xl:static xl:text-center xl:px-8 xl:py-2
                "
                  htmlType="submit"
                >
                  Lưu
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>

  );
};

export default CreateImagePage;

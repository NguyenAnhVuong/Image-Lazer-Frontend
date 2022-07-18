/* eslint-disable no-underscore-dangle */
import { Button, Empty, Modal } from 'antd';
import { useEffect, useState } from 'react';
import homeApi from '../api/homeApi';
import userAPi from '../api/userApi';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import { userActions } from '../features/user/userSlice';
import { topics } from '../models';
import Colection from './Colection';
import PlusButton from './PlusButton';
import { TopicCard } from './User/UserInformation';

const Home = () => {
  const [images, setImages] = useState<any[]>([]);
  const [reRender, setReRender] = useState(false);
  const userRedux = useAppSelector((state: AppState) => state.user.user);
  const dispatch = useAppDispatch();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const searchTopic = useAppSelector((state: AppState) => state.search.topic);
  const [refresh, setRefresh] = useState(false);

  useEffect((): void => {
    const getImagesFromApi = async () => {
      const res = await homeApi.getHomeImage(searchTopic);
      if (res) {
        setImages(res.posts);
      }
    };
    getImagesFromApi();
  }, [searchTopic, refresh]);

  useEffect(() => {
    if (userRedux.id && userRedux.topics) {
      setSelectedTopics(userRedux.topics);
    }
  }, [userRedux]);

  const handleChangeTopic = async (value: string, add: boolean) => {
    const newTopics = [...selectedTopics || []];
    if (add && !newTopics.includes(value)) {
      newTopics.push(value);
    } else if (!add && newTopics.includes(value)) {
      newTopics.splice(newTopics.indexOf(value), 1);
    }
    setSelectedTopics(newTopics);
  };

  const handleSaveTopics = async () => {
    const res = await userAPi.updateTopics({ topic: selectedTopics });
    if (res) {
      dispatch(userActions.getUserStart(userRedux.userName || ''));
      setRefresh(!refresh);
    }
  };

  return (
    <div className="xl:mt-20">
      {
        images.length > 0 ? (
          <Colection
            images={images}
            useToAlbum={false}
            isUserAlbum={false}
            reRender={reRender}
            setReRender={setReRender}
            albumName=""
          />
        ) : (
          <Empty className="mt-20 xl:mt-40" description={<span>Chưa có Ảnh nào!</span>} />
        )
      }

      <PlusButton />
      <Modal
        className="xl:w-[1000px] 2xl:w-[1280px]"
        title={(
          <div className="flex justify-between">
            <span className="text-xl">Chọn chủ đề Ảnh</span>
            <Button
              className={`text-white font-semibold rounded-3xl
              h-auto px-4 py-1 ${selectedTopics.length > 0 ? 'bg-primary cursor-pointer' : 'bg-graybg text-slate-500'}`}
              onClick={handleSaveTopics}
              disabled={!selectedTopics.length}
            >
              Lưu
            </Button>
          </div>
        )}
        footer={null}
        closable={false}
        visible={!!userRedux.id && !userRedux.topics?.length}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {topics.map((topic) => (
            <div key={topic.name} className="flex justify-center">
              <TopicCard
                topic={topic}
                added={selectedTopics.includes(topic.name) || false}
                onClick={() => {
                  if (selectedTopics.includes(topic.name)) {
                    handleChangeTopic(topic.name, false);
                  } else {
                    handleChangeTopic(topic.name, true);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Home;

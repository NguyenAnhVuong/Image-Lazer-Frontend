import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { testActions } from '../features/test/testSlice';

function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(testActions.test());
  }, [dispatch]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}

export default Home;

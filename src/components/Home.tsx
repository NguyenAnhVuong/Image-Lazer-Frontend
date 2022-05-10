import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { testActions } from '../features/test/testSlice';
import { useAppDispatch } from '../app/hooks';

function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(testActions.test());
  }, []);

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

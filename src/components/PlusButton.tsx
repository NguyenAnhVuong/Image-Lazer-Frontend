import { Modal } from 'antd';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoMdAlbums } from 'react-icons/io';
import { Link } from 'react-router-dom';
import CreateAlbumModal from './Album/CreateAlbumModal';

const PlusButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createAlbumModalOpen, setCreateAlbumModalOpen] = useState(false);

  return (
    <>
      <FaPlus
        className="rounded-full bg-white header-shadow cursor-pointer p-4 font-bold hidden
        xl:inline-block fixed right-8 bottom-24 hover:bg-[#efefef]"
        size={56}
        onClick={() => setIsOpen(true)}
      />
      <Modal
        wrapClassName="plus-modal"
        style={{ top: 2000 }}
        visible={isOpen}
        title={null}
        closable={false}
        footer={null}
        mask={false}
        centered
        onCancel={() => setIsOpen(false)}
      >
        <Link
          className="flex items-center text-base font-bold p-2 hover:bg-graybg rounded-xl w-full text-black"
          to="/create-image"
          type="button"
        >
          <FaPlus className="" size={20} />
          <span className="ml-2">Tạo ảnh</span>
        </Link>
        <button
          className="flex items-center text-base font-bold p-2 hover:bg-graybg rounded-xl w-full"
          type="button"
          onClick={() => setCreateAlbumModalOpen(true)}
        >
          <IoMdAlbums className="" size={20} />
          <span className="ml-2">Tạo Album</span>
        </button>
      </Modal>
      <CreateAlbumModal isOpen={createAlbumModalOpen} setIsOpen={setCreateAlbumModalOpen} />
    </>
  );
};

export default PlusButton;

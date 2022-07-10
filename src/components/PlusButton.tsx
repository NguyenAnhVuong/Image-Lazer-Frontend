import { useEffect, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoMdAlbums } from 'react-icons/io';
import { Link } from 'react-router-dom';
import CreateAlbumModal from './Album/CreateAlbumModal';

const PlusButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [createAlbumModalOpen, setCreateAlbumModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <button ref={ref} className="block" type="button" onClick={() => setIsOpen((state) => !state)}>
        <FaPlus
          className="rounded-full bg-white header-shadow cursor-pointer p-4 font-bold hidden
        xl:inline-block fixed right-8 bottom-24 hover:bg-[#efefef]"
          size={56}
        />
      </button>
      <div className={`fixed bg-white bottom-20 right-24 min-w-[200px] header-shadow p-2 rounded-2xl ${isOpen ? 'block' : 'hidden'}`}>
        <Link
          className="flex items-center text-base font-bold p-2 hover:bg-graybg rounded-xl w-full text-black"
          to="/create-image"
          type="button"
        >
          <FaPlus className="" size={20} />
          <span className="ml-2">画像作成</span>
        </Link>
        <button
          className="flex items-center text-base font-bold p-2 hover:bg-graybg rounded-xl w-full"
          type="button"
          onClick={() => setCreateAlbumModalOpen(true)}
        >
          <IoMdAlbums className="" size={20} />
          <span className="ml-2">アルバム作成</span>
        </button>
      </div>
      <CreateAlbumModal isOpen={createAlbumModalOpen} setIsOpen={setCreateAlbumModalOpen} />
    </>
  );
};

export default PlusButton;

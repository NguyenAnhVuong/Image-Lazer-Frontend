import { Modal, Select } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';

export interface ImageAlbumProps {
  selectAlbumModal: boolean;
  setSelectAlbumModal: (value: boolean) => void;
  currentAlbum: string;
  setCurrentAlbum: (value: string) => void;
}

const ListSelectAlbumModal = ({
  selectAlbumModal, setSelectAlbumModal, currentAlbum, setCurrentAlbum,
}: ImageAlbumProps) => {
  const userAlbums = useAppSelector((state: AppState) => state.user.user.albums);

  return (
    <div>
      <Modal
        visible={selectAlbumModal}
        title="アルバム選択"
        footer={null}
        onCancel={() => setSelectAlbumModal(false)}
      >
        <Select
          className="w-full"
          placeholder="アルバムを選択"
          allowClear
          onChange={(value) => { setCurrentAlbum(value); setSelectAlbumModal(false); }}
          value={currentAlbum}
        >
          {
            userAlbums?.map((album) => (
              <Select.Option key={album.id} value={album.name}>
                <img className="w-12 h-12 rounded-xl object-cover" src={album.image?.src} alt="" />
                <span className="font-bold text-base ml-2">{album.name}</span>
              </Select.Option>
            ))
          }
        </Select>
      </Modal>
    </div>
  );
};

export default ListSelectAlbumModal;

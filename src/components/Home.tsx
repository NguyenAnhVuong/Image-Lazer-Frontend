import PhotoAlbum, { RenderPhoto } from 'react-photo-album';
import PlusButton from './PlusButton';

const Home = () => {
  const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

  const unsplashLink = (id: string, width: number, height: number) => `https://source.unsplash.com/${id}/${width}x${height}`;

  const unsplashPhotos = [
    { id: 'Osq7UAVxIOI', width: 1080, height: 780 },
    { id: 'Dhmn6ete6g8', width: 1080, height: 1620 },
    { id: 'RkBTPqPEGDo', width: 1080, height: 720 },
    { id: 'Yizrl9N_eDA', width: 1080, height: 721 },
    { id: 'KG3TyFi0iTU', width: 1080, height: 1620 },
    { id: 'Jztmx9yqjBw', width: 1080, height: 607 },
    { id: '-heLWtuAN3c', width: 1080, height: 608 },
    { id: 'xOigCUcFdA8', width: 1080, height: 720 },
    { id: '1azAjl8FTnU', width: 1080, height: 1549 },
    { id: 'ALrCdq-ui_Q', width: 1080, height: 720 },
    { id: 'twukN12EN7c', width: 1080, height: 694 },
    { id: '9UjEyzA6pP4', width: 1080, height: 1620 },
    { id: 'sEXGgun3ZiE', width: 1080, height: 720 },
    { id: 'S-cdwrx-YuQ', width: 1080, height: 1440 },
    { id: 'q-motCAvPBM', width: 1080, height: 1620 },
    { id: 'Xn4L310ztMU', width: 1080, height: 810 },
    { id: 'ls94iFAQerE', width: 1080, height: 1620 },
    { id: 'X48pUOPKf7A', width: 1080, height: 160 },
    { id: 'GbLS6YVXj0U', width: 1080, height: 810 },
    { id: '9CRd1J1rEOM', width: 1080, height: 720 },
    { id: 'xKhtkhc9HbQ', width: 1080, height: 1440 },
  ];

  const photos = unsplashPhotos.map((photo) => ({
    test: 'test',
    src: unsplashLink(photo.id, photo.width, photo.height),
    width: photo.width,
    height: photo.height,
    images: breakpoints.map((breakpoint) => {
      const height = Math.round((photo.height / photo.width) * breakpoint);
      return {
        src: unsplashLink(photo.id, breakpoint, height),
        width: breakpoint,
        height,
      };
    }),
  }));

  // eslint-disable-next-line max-len
  const renderPhoto: RenderPhoto | any = ({ imageProps: { alt, style, ...restImageProps } }: any) => (
    <div
      className="relative mb-2 rounded-2xl overflow-hidden xl:mb-4 cursor-pointer"
      role="button"
      tabIndex={0}
      style={{
        boxSizing: 'content-box',
        alignItems: 'center',
        width: style?.width,
        paddingBottom: 0,
      }}
      onClick={restImageProps.onClick}
      onKeyDown={restImageProps.onClick}
    >
      <div className="absolute left-0 top-0 right-0 bottom-0 hover:bg-[#0a0a0a49]" />
      <img
        alt={alt}
        style={{
          ...style, width: '100%', padding: 0, marginBottom: 0,
        }}
        {...restImageProps}
      />
    </div>
  );

  return (
    <div className="p-2 xl:px-20">
      <div className="hidden xl:block">
        <PhotoAlbum
          photos={photos}
          layout="columns"
          columns={(containerWidth) => {
            if (containerWidth < 768) return 2;
            if (containerWidth < 1024) return 3;
            if (containerWidth < 1280) return 4;
            if (containerWidth < 1536) return 5;
            if (containerWidth < 1750) return 6;
            return 7;
          }}
          spacing={16}
          targetRowHeight={200}
          renderPhoto={renderPhoto}
          onClick={(event, photo, index) => {
            console.log('event: ', event);
            console.log('photo: ', photo);
            console.log('index: ', index);
          }}
        />
      </div>

      <div className="xl:hidden">
        <PhotoAlbum
          photos={photos}
          layout="columns"
          columns={(containerWidth) => {
            if (containerWidth < 768) return 2;
            if (containerWidth < 1024) return 3;
            if (containerWidth < 1280) return 4;
            if (containerWidth < 1536) return 5;
            if (containerWidth < 1750) return 6;
            return 7;
          }}
          spacing={8}
          targetRowHeight={200}
          renderPhoto={renderPhoto}
          onClick={(event, photo, index) => {
            console.log('event: ', event);
            console.log('photo: ', photo);
            console.log('index: ', index);
          }}
        />
      </div>
      <PlusButton />
    </div>
  );
};

export default Home;

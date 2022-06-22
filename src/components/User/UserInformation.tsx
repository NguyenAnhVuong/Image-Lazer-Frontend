import { useState } from 'react';
import 'antd/dist/antd.css';
import { Menu, Layout } from 'antd';

const { Sider, Content } = Layout;

const items = [
  { label: 'Hồ sơ công khai', key: 'ho-so-cong-khai' },
  { label: 'Thông tin cá nhân', key: 'thong-tin-ca-nhan' },
  { label: 'Quản lý tài khoản', key: 'quan-ly-tai-khoan' },
  { label: 'Điều chỉnh bảng tin nhà của bạn', key: 'dieu-chinh-bang-tin' },
];
const UserInformation = () => {
  const [current, setCurrent] = useState('ho-so-cong-khai');
  const onClick = ({ key }: any) => {
    setCurrent(key);
  };
  return (
    <div
      className="mainContainer"
      style={{
        width: 256,
      }}
    >
      <Layout>
        <Sider>
          <Menu
            className="menu"
            defaultSelectedKeys={[items[0].key]}
            defaultOpenKeys={[items[0].key]}
            mode="inline"
            items={items}
            onClick={onClick}
          />
        </Sider>
        <Content>
          {
            (current === 'ho-so-cong-khai') ? (
              <div>
                Hồ sơ công khai
              </div>
            ) : (
              <div>
                Thông tin cá nhân
              </div>
            )
          }
        </Content>
      </Layout>
    </div>
  );
};

export default UserInformation;

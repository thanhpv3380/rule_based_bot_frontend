import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import StyleLayout from './index.style';
import Sidebar from './Sidebar';

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <StyleLayout>
      <Layout>
        <Sidebar />
        <Layout style={{ marginLeft: 200 }}>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          />
          <Content className="site-content">
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </StyleLayout>
  );
};

export default MainLayout;

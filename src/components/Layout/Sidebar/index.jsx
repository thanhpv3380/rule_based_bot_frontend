import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  BarChartOutlined,
  DatabaseOutlined,
  ProfileOutlined,
  AppstoreOutlined,
  MessageOutlined,
  SmallDashOutlined,
  UnorderedListOutlined,
  BranchesOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import StyleSideBar from './index.style';

const { Sider } = Layout;
const { SubMenu } = Menu;
const pages = [
  {
    title: 'General',
    icon: <HomeOutlined />,
    children: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <BarChartOutlined />,
      },
    ],
  },
  {
    title: 'Data',
    icon: <DatabaseOutlined />,
    children: [
      {
        title: 'Entities',
        href: '/entities',
        icon: <AppstoreOutlined />,
      },
      {
        title: 'Itents',
        href: '/itents',
        icon: <MessageOutlined />,
      },
      {
        title: 'Usersay template',
        href: '/templates/userSays',
        icon: <ProfileOutlined />,
      },
      {
        title: 'Actions',
        href: '/actions',
        icon: <SmallDashOutlined />,
      },
      {
        title: 'Dictionary',
        href: '/dictionary',
        icon: <UnorderedListOutlined />,
      },
    ],
  },
  {
    title: 'Script',
    icon: <FileTextOutlined />,
    children: [
      {
        title: 'Workflow',
        href: '/workflows',
        icon: <BranchesOutlined />,
      },
    ],
  },
];

const Sidebar = () => {
  const [openKey, setOpenKey] = useState('sub1');
  const [activeKey, setActiveKey] = useState('menu101');
  const [collapsed, setCollapsed] = useState(false);
  const [mode, setMode] = useState('inline');

  // const toggle = () => {
  //   setCollapsed(!collapsed);
  //   setMode(!collapsed ? 'vertical' : 'inline');
  // };

  return (
    <StyleSideBar>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {pages.map((page) => (
            <SubMenu key={page.title} icon={page.icon} title={page.title}>
              {page.children.map((el) => (
                <Menu.Item key={el.title} icon={el.icon}>
                  {el.title}
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </Sider>
    </StyleSideBar>
  );
};

export default Sidebar;

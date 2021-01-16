import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  FormOutlined,
  FileImageOutlined,
  SoundOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const menuAction = [
  {
    name: 'Text',
    icon: <FormOutlined />,
  },
  {
    name: 'Image',
    icon: <FileImageOutlined />,
  },
  {
    name: 'Audio',
    icon: <SoundOutlined />,
  },
  {
    name: 'JSON API',
    icon: <GlobalOutlined />,
  },
];
const MenuAction = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
    >
      {menuAction.map((action) => (
        <Menu.Item key={action.name} icon={action.icon}>
          {action.name}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuAction;

import React from 'react';
import { List, Button, Space, Menu, Dropdown, Divider } from 'antd';
import {
  MoreOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import AddText from './AddText';
import StyledApp from './index.style';

const menu = () => {
  return (
    <Menu>
      <Menu.Item>Edit</Menu.Item>
      <Menu.Item>Delete</Menu.Item>
    </Menu>
  );
};
const text = ['text 1', 'text 2'];
const TextBox = () => {
  return (
    <StyledApp>
      <div className="container-title">
        <FormOutlined style={{ fontSize: '20px' }} />
        <div className="title">Text</div>
      </div>
      <div className="container-items">
        {text.map((el) => (
          <div className="container-item">
            <div className="name">{el}</div>
            <div>
              <Dropdown overlay={menu}>
                <MoreOutlined style={{ fontSize: '20px' }} />
              </Dropdown>
            </div>
          </div>
        ))}
      </div>
      <div className="container-add-item">
        <AddText />
      </div>
      <Button block size="large">
        <PlusOutlined />
      </Button>
    </StyledApp>
  );
};

export default TextBox;

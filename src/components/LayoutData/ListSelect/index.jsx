import React from 'react';
import { Menu, Dropdown, Collapse, Space } from 'antd';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import StyledApp from './index.style';
import SearchBox from '../../SearchBox';
import PaginationPanel from '../../Pagination';

const { Panel } = Collapse;

const ListSelect = ({
  handleSearch,
  handleCreate,
  handleCreateGroup,
  handleDelete,
  handleDeleteGroup,
  name,
}) => {
  const menuAdd = () => {
    return (
      <Menu>
        <Menu.Item onClick={handleCreate}>Create {name}</Menu.Item>
        <Menu.Item onClick={handleCreateGroup}>Create Group</Menu.Item>
      </Menu>
    );
  };

  const menuEditBox = (id) => {
    return (
      <Menu>
        <Menu.Item onClick={() => handleDelete(id)}>Delete</Menu.Item>
      </Menu>
    );
  };

  const menuEditGroupBox = (id) => {
    return (
      <Menu>
        <Menu.Item onClick={() => handleDeleteGroup(id)}>Delete</Menu.Item>
      </Menu>
    );
  };

  const genExtra = () => (
    <Dropdown overlay={menuEditGroupBox(1)}>
      <MoreOutlined />
    </Dropdown>
  );

  return (
    <StyledApp>
      <Space direction="vertical" className="w-100">
        <SearchBox handleSearch={handleSearch} />
        <Dropdown overlay={menuAdd}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <PlusOutlined /> Add {name} or Group
          </a>
        </Dropdown>
        <Collapse accordion>
          <Panel header="This is panel header 1" key="1" extra={genExtra()}>
            <Space direction="vertical" className="w-100">
              <div className="box-item">
                <div className="box-item-title">Action 1</div>
                <Dropdown overlay={menuEditBox(1)}>
                  <MoreOutlined />
                </Dropdown>
              </div>
              <div className="box-item">
                <div className="box-item-title">Action 2</div>
                <Dropdown overlay={menuEditBox(2)}>
                  <MoreOutlined />
                </Dropdown>
              </div>
              <PaginationPanel current={1} total={2} />
            </Space>
          </Panel>
        </Collapse>
        <PaginationPanel current={1} total={1} />
      </Space>
    </StyledApp>
  );
};

export default ListSelect;

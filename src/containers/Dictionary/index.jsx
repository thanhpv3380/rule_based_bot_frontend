import React, { useState } from 'react';
import { PageHeader, Button, Table, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import SearchBox from '../../components/SearchBox';
import StyledApp from './index.style';

const Dictionary = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [dictionaries, setDictionaries] = useState([
    {
      id: '43543',
      synonym: 'hn',
      original: 'Ha Noi',
    },
    {
      id: '12343',
      synonym: 'vao',
      original: 'vo',
    },
    {
      id: '12343',
      synonym: 'vao',
      original: 'vo',
    },
    {
      id: '12343',
      synonym: 'vao',
      original: 'vo',
    },
    {
      id: '12343',
      synonym: 'vao',
      original: 'vo',
    },
    {
      id: '12343',
      synonym: 'vao',
      original: 'vo',
    },
    {
      id: '12343',
      synonym: 'vao',
      original: 'vo',
    },
    {
      id: '12343',
      synonym: 'vao',
      original: 'vo',
    },
    {
      id: '12343',
      synonym: 'vao',
      original: 'vo',
    },
    {
      id: '12343',
      synonym: 'vao',
      original: 'vo',
    },
    {
      id: '12343',
      synonym: 'vao',
      original: 'vo432',
    },
  ]);
  const handleSearch = (value) => {
    console.log(value);
  };
  const columns = [
    {
      title: '#',
      key: 'id',
      render: (value, item, index) => {
        return (page - 1) * pageSize + index + 1;
      },
    },
    {
      title: 'Synonym',
      dataIndex: 'synonym',
      key: 'synonym',
    },
    {
      title: 'Original word',
      dataIndex: 'original',
      key: 'original',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Tooltip title="Edit">
              <Button
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record.id)}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id)}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    console.log('delete ' + id);
  };

  const handleEdit = (id) => {
    console.log('edit ' + id);
  };

  return (
    <StyledApp>
      <PageHeader
        ghost={false}
        title="Dictionary"
        extra={[<Button type="primary">Create</Button>]}
      />
      <br />
      <SearchBox handleSearch={handleSearch} />
      <Table
        bordered="true"
        columns={columns}
        dataSource={dictionaries}
        pagination={{
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPageSize(pageSize);
            setPage(page);
          },
        }}
      />
    </StyledApp>
  );
};

export default Dictionary;

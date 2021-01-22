import React, { useState } from 'react';
import { Table, Button, Space, PageHeader, Tooltip, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import StyledApp from './index.style';
import ModalItem from './ModalItem';

const ListParameter = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dictionary, setDictionary] = useState({
    id: '',
    synonym: '',
    original: '',
  });
  const [dictionaries, setDictionaries] = useState([
    {
      id: 1,
      name: 'vo',
      intent: {
        id: 1,
        name: 'intent_1',
      },
    },
    {
      id: 2,
      name: 'hn',
      intent: {
        id: 2,
        name: 'intent_2',
      },
    },
  ]);
  const columns = [
    {
      title: '#',
      key: 'id',
      render: (value, item, index) => {
        return (page - 1) * pageSize + index + 1;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Intent',
      key: 'intent',
      render: (text, record) => {
        return <a>{record.intent.name || ''}</a>;
      },
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
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button shape="circle" icon={<DeleteOutlined />} />
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  const handleShowModal = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setDictionary({
      ...dictionary,
      [e.target.name]: e.target.value,
    });
  };

  const handleAction = () => {
    console.log(dictionary);
    setIsModalVisible(false);
    // const { data } = await apis.dictionary.createDictionary({ synonym, original });
    setDictionary({
      id: '',
      synonym: '',
      original: '',
    });
  };
  return (
    <StyledApp>
      <PageHeader
        className="site-page-header"
        title="Parameters"
        extra={[
          <Button type="primary" size="large" onClick={handleShowModal}>
            Create
          </Button>,
        ]}
      />

      <ModalItem
        dictionary={dictionary}
        handleChange={handleChange}
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
        handleAction={handleAction}
      />

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

export default ListParameter;

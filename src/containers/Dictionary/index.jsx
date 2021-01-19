import React, { useEffect, useState } from 'react';
import { PageHeader, Button, Table, Space, Tooltip, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import SearchBox from '../../components/SearchBox';
import ModalItem from './ModalItem';
import StyledApp from './index.style';
import apis from '../../apis';

const Dictionary = () => {
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
      synonym: 'vo',
      original: 'vao',
    },
    {
      id: 2,
      synonym: 'hn',
      original: 'Ha Noi',
    },
  ]);

  const fetchDictionaries = async () => {
    console.log('call api fetch dictionaries');
    // const { data } = await apis.dictionary.getDictionaries();
    // console.log(data);
  };

  useEffect(() => {
    fetchDictionaries();
  }, []);

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
  const handleSearch = (value) => {
    console.log(value);
  };

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

  const handleDelete = (id) => {
    console.log('delete ' + id);
    // await apis.dictionary.deleteDictionary(id);
  };

  const handleEdit = (id) => {
    const activeDictionary = dictionaries.find(
      (dictionary) => dictionary.id === id,
    );
    setDictionary({ ...activeDictionary });
    setIsModalVisible(true);
  };

  return (
    <StyledApp>
      <PageHeader
        ghost={false}
        title="Dictionary"
        extra={[
          <Button type="primary" onClick={handleShowModal}>
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

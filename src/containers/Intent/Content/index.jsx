import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DoubleRightOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Space,
  Input,
  Typography,
  Table,
  PageHeader,
  Switch,
  Select,
} from 'antd';
import StyledApp from './index.style';

const { Title, Text } = Typography;
const { Search } = Input;

const columns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
    render: (text) => (
      <Input
        prefix={<DoubleRightOutlined className="site-form-item-icon" />}
        placeholder="Borderless"
        bordered={false}
        size="large"
        value={text}
      />
    ),
  },
  {
    title: '',
    dataIndex: '',
    key: 'x',
    render: () => <DeleteOutlined />,
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description:
      'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description:
      'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];

const Content = () => {
  const { t } = useTranslation();

  return (
    <StyledApp>
      <PageHeader
        className="site-page-header"
        title="Training phrases"
        extra={[
          <Input
            size="large"
            placeholder="Add user expression"
            suffix={<SearchOutlined />}
          />,
        ]}
      />
      <Input
        size="large"
        placeholder="Add user expression"
        prefix={<DoubleRightOutlined />}
      />

      <Table columns={columns} dataSource={data} />

      <hr />

      <Title level={5}>Action Mapping</Title>
      <Text type="secondary">
        The MappingAction can be used to directly map intent to action such that
        the mapped action will always be executed
      </Text>
      <br />
      <br />
      <Space direction="vertical">
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          size="large"
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
        <Switch defaultChecked />
      </Space>
    </StyledApp>
  );
};

export default Content;

import React from 'react';
import { Typography, Row, Col, Select, Input, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import StyledApp from './index.style';

const { Text } = Typography;

const JsonApiBox = () => {
  return (
    <StyledApp>
      <div className="container-title">
        <GlobalOutlined style={{ fontSize: '20px' }} />
        <div className="title">JSON API</div>
      </div>

      <Text type="secondary">
        Create integrations with your own server or other 3rd party systems.
      </Text>
      <Space>
        <Select defaultValue="GET" size="large">
          <Option value="GET">GET</Option>
          <Option value="POST">POST</Option>
        </Select>
        <Input placeholder="Type endpoint" size="large" />
      </Space>
      <br />
      <br />
      <Space direction="vertical">
        <Input placeholder="Enter image file URL" size="large" />
        <Input placeholder="Enter Description of image" size="large" />
      </Space>
    </StyledApp>
  );
};

export default JsonApiBox;

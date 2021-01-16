import React from 'react';
import {
  Typography,
  Row,
  Col,
  Select,
  Input,
  Space,
  Divider,
  Button,
} from 'antd';
import {
  GlobalOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import StyledApp from './index.style';

const { Text } = Typography;

const JsonApiBox = () => {
  return (
    <StyledApp>
      <div className="container-title">
        <Space>
          <Space>
            <GlobalOutlined />
            <div className="title">JSON API</div>
          </Space>
          <div class="icon-delete">
            <DeleteOutlined />
          </div>
        </Space>
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
      <Divider orientation="left">API Headers</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          Title
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          Value
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}></Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <Input size="large" />
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <Input size="large" />
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <div class="icon-delete">
            <DeleteOutlined />
          </div>
        </Col>
      </Row>
      <Button block>
        <PlusOutlined /> ADD HEADER
      </Button>
      <Divider orientation="left">API Body</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          Title
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          Value
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}></Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <Input size="large" />
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <Input size="large" />
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <div class="icon-delete">
            <DeleteOutlined />
          </div>
        </Col>
      </Row>
      <Button block>
        <PlusOutlined /> ADD PARAMETER
      </Button>
    </StyledApp>
  );
};

export default JsonApiBox;

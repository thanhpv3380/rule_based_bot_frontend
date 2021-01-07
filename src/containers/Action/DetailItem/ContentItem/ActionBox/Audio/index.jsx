import React from 'react';
import { Typography, Row, Col, Upload, Input, Space } from 'antd';
import { SoundOutlined, PlusOutlined } from '@ant-design/icons';
import StyledApp from './index.style';

const { Text } = Typography;

const AudioBox = () => {
  return (
    <StyledApp>
      <div className="container-title">
        <SoundOutlined style={{ fontSize: '20px' }} />
        <div className="title">Audio</div>
      </div>

      <Space direction="vertical" size="medium">
        <Text type="secondary">Send an audio link in the chat.</Text>
        <Space>
          <Text>Example:</Text>
          <Text type="secondary">https://dl.dropbox.com/s/sample.mp3</Text>
        </Space>
      </Space>

      <Space direction="vertical">
        <Input placeholder="Enter image file URL" size="large" />
        <Input placeholder="Enter Description of image" size="large" />
      </Space>
    </StyledApp>
  );
};

export default AudioBox;

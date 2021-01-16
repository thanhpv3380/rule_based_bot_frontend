import React from 'react';
import { Typography, Input, Space } from 'antd';
import { SoundOutlined, DeleteOutlined } from '@ant-design/icons';
import StyledApp from './index.style';

const { Text } = Typography;

const AudioBox = () => {
  return (
    <StyledApp>
      <div className="container-title">
        <Space>
          <Space>
            <SoundOutlined />
            <div className="title">Audio</div>
          </Space>
          <div class="icon-delete">
            <DeleteOutlined />
          </div>
        </Space>
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

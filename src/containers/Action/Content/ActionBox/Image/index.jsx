import React from 'react';
import { Typography, Row, Col, Upload, Input, Space } from 'antd';
import {
  FileImageOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import StyledApp from './index.style';

const { Title } = Typography;

const ImageBox = () => {
  return (
    <StyledApp>
      <div className="container-title">
        <Space>
          <Space>
            <FileImageOutlined />
            <div className="title">Image</div>
          </Space>
          <div class="icon-delete">
            <DeleteOutlined />
          </div>
        </Space>
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // beforeUpload={beforeUpload}
          >
            <div>
              <PlusOutlined />
              <div className="mt-8">Upload</div>
            </div>
          </Upload>
        </Col>
        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
          <Space direction="vertical">
            <Input placeholder="Enter image file URL" size="large" />
            <Input placeholder="Enter Description of image" size="large" />
          </Space>
        </Col>
      </Row>
    </StyledApp>
  );
};

export default ImageBox;

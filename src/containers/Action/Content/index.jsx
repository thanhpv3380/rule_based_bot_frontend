import React, { useState } from 'react';
import { Row, Col, Space, Affix } from 'antd';
import MenuAction from './MenuAction';
import TextBox from './ActionBox/Text';
import ImageBox from './ActionBox/Image';
import AudioBox from './ActionBox/Audio';
import JsonApiBox from './ActionBox/JsonApi';
import StyledApp from './index.style';

const ContentItem = () => {
  return (
    <StyledApp>
      <Row gutter={[16, 16]}>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Affix offsetTop={10}>
            <MenuAction />
          </Affix>
        </Col>
        <Col xs={21} sm={21} md={21} lg={21} xl={21}>
          <Space direction="vertical" size="large">
            <TextBox />
            <ImageBox />
            <AudioBox />
            <JsonApiBox />
          </Space>
        </Col>
      </Row>
    </StyledApp>
  );
};

export default ContentItem;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Tooltip, Space, Select, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import StyledApp from './index.style';

import ContentItem from './ContentItem';
import { useTheme } from 'styled-components';

const { Option } = Select;

const DetailItem = () => {
  const { t } = useTranslation();
  return (
    <StyledApp>
      <div className="container-info-item">
        <Input
          placeholder="Enter your username"
          suffix={
            <Tooltip title="Name can only contain character, number and underscore">
              <InfoCircleOutlined />
            </Tooltip>
          }
          size="large"
        />
        <Select defaultValue="lucy" style={{ width: 120 }} size="large">
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Button type="primary" size="large">
          Save Action
        </Button>
      </div>
      <div className="container-content">
        <ContentItem />
      </div>
    </StyledApp>
  );
};

export default DetailItem;

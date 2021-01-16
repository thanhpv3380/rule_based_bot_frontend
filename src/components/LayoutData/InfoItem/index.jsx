import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Tooltip, Select, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import StyledApp from './index.style';

const { Option } = Select;
const InfoItem = () => {
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
    </StyledApp>
  );
};

export default InfoItem;

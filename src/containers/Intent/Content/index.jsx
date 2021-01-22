import React from 'react';
import { useTranslation } from 'react-i18next';
import { Space, Input, Typography, Switch, Select } from 'antd';
import StyledApp from './index.style';
import ListPattern from './ListPattern';
import ListParameter from './ListParameter';

const { Title, Text } = Typography;

const Content = ({ handleChangeInput }) => {
  const { t } = useTranslation();

  return (
    <StyledApp>
      <ListPattern />

      <hr />

      <ListParameter />

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
          placeholder="Select a Action"
          optionFilterProp="children"
          size="large"
        >
          <Option value="jack">Action 1</Option>
          <Option value="lucy">Action 2</Option>
          <Option value="tom">Action 3</Option>
        </Select>
        <Switch defaultChecked />
      </Space>
    </StyledApp>
  );
};

export default Content;

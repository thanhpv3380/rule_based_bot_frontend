import React from 'react';
import { Space, Input, Button } from 'antd';
import StyledApp from './index.style';

const AddText = () => {
  return (
    <StyledApp>
      <Space>
        <Input placeholder="Type content" size="large" />
        <Button size="large">Add</Button>
        <Button size="large">Cancel</Button>
      </Space>
    </StyledApp>
  );
};

export default AddText;

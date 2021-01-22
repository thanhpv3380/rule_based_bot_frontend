import React, { useState } from 'react';
import { Modal, Input, Typography, Space, Select } from 'antd';
import StyledApp from './index.style';

const { Option } = Select;
const { Title, Text } = Typography;

const ModalItem = ({
  dictionary,
  isModalVisible,
  handleCloseModal,
  handleChange,
  handleAction,
}) => {
  return (
    <StyledApp>
      <Modal
        title={
          <>
            <Title level={5}>Add Synonym</Title>
            <Text type="secondary">Words will be converted to lowercase</Text>
          </>
        }
        okText={!dictionary.id ? 'Create' : 'Update'}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onOk={handleAction}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Type name parameter"
            size="large"
            name="Parameter"
            disabled={dictionary.id}
            value={dictionary.synonym || ''}
            onChange={handleChange}
          />
          <Select defaultValue="lucy" size="large" onChange={handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Space>
      </Modal>
    </StyledApp>
  );
};

export default ModalItem;

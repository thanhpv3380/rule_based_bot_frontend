import React, { useState } from 'react';
import { Modal, Input, Typography, Space } from 'antd';
import StyledApp from './index.style';

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
            placeholder="Synonym"
            size="large"
            name="synonym"
            disabled={dictionary.id}
            value={dictionary.synonym || ''}
            onChange={handleChange}
          />
          <Input
            placeholder="Original Word"
            size="large"
            name="original"
            value={dictionary.original || ''}
            onChange={handleChange}
          />
        </Space>
      </Modal>
    </StyledApp>
  );
};

export default ModalItem;

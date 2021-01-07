import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
import MenuItem from './MenuItem';
import DetailItem from './DetailItem';
import StyledApp from './index.style';

const Action = () => {
  const { t } = useTranslation();

  const handleSearch = (value) => {
    console.log(value);
  };

  const handleCreateAction = (e) => {
    console.log('create action');
  };

  const handleCreateGroup = (e) => {
    console.log('create group action');
  };
  const handleDeleteAction = (id) => {
    console.log('delete action');
  };
  const handleDeleteGroupAction = (id) => {
    console.log('delete group action');
  };

  return (
    <StyledApp>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <MenuItem
            handleSearch={handleSearch}
            handleCreateAction={handleCreateAction}
            handleCreateGroup={handleCreateGroup}
            handleDeleteAction={handleDeleteAction}
            handleDeleteGroupAction={handleDeleteGroupAction}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <DetailItem />
        </Col>
      </Row>
    </StyledApp>
  );
};

export default Action;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Space } from 'antd';
import StyledApp from './index.style';
import ListSelect from './ListSelect';
import InfoItem from './InfoItem';

const Layout = ({
  handleSearch,
  handleCreate,
  handleCreateGroup,
  handleDelete,
  handleDeleteGroup,
  name,
  content,
}) => {
  const { t } = useTranslation();

  return (
    <StyledApp>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <ListSelect
            handleSearch={handleSearch}
            handleCreate={handleCreate}
            handleCreateGroup={handleCreateGroup}
            handleDelete={handleDelete}
            handleDeleteGroup={handleDeleteGroup}
            name={name}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <Space direction="vertical">
            <InfoItem />
            <div className="container-content">{content}</div>
          </Space>
        </Col>
      </Row>
    </StyledApp>
  );
};

export default Layout;

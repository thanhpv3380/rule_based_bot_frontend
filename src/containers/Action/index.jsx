import React from 'react';
import { useTranslation } from 'react-i18next';
import StyledApp from './index.style';
import LayoutData from '../../components/LayoutData';
import Content from './Content';

const Action = () => {
  const { t } = useTranslation();

  const handleSearch = (value) => {
    console.log(value);
  };

  const handleCreate = (e) => {
    console.log('create action');
  };

  const handleCreateGroup = (e) => {
    console.log('create group action');
  };
  const handleDelete = (id) => {
    console.log('delete action');
  };
  const handleDeleteGroup = (id) => {
    console.log('delete group action');
  };

  return (
    <StyledApp>
      <LayoutData
        handleSearch={handleSearch}
        handleCreate={handleCreate}
        handleCreateGroup={handleCreateGroup}
        handleDelete={handleDelete}
        handleDeleteGroup={handleDeleteGroup}
        name="Intent"
        content={<Content />}
      />
    </StyledApp>
  );
};

export default Action;

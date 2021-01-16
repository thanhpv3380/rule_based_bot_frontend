import React from 'react';
import { useTranslation } from 'react-i18next';
import StyledApp from './index.style';
import LayoutData from '../../components/LayoutData';
import Content from './Content';

const Intent = () => {
  const { t } = useTranslation();

  const handleSearch = (value) => {
    console.log(value);
  };

  const handleCreate = (e) => {
    console.log('create intent');
  };

  const handleCreateGroup = (e) => {
    console.log('create group intent');
  };
  const handleDelete = (id) => {
    console.log('delete intent');
  };
  const handleDeleteGroup = (id) => {
    console.log('delete group intent');
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

export default Intent;

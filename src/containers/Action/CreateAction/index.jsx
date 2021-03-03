import React from 'react';
import { useTranslation } from 'react-i18next';
import ItemInfoHeader from '../../../components/ItemInfoHeader';

const CreateAction = ({ handleCreate }) => {
  const { t } = useTranslation();
  return (
    <>
      <ItemInfoHeader handleCreate={handleCreate} />
    </>
  );
};

export default CreateAction;

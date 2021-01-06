import React from 'react';
import { useTranslation } from 'react-i18next';
import StyledApp from './index.style';

const Action = () => {
  const { t } = useTranslation();
  return <StyledApp>Action</StyledApp>;
};

export default Action;

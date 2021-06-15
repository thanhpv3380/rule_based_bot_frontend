import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './index.style';

const EmptyPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  const classes = useStyles();

  return <div className={classes.root}>No data</div>;
};

export default EmptyPage;

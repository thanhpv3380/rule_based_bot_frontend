import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useStyles from './index.style';

const EmptyPage = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const match = useRouteMatch();
  const title = match.path.split('/').pop();
  return <div className={classes.root}>You have not choose any {title}</div>;
};

export default EmptyPage;

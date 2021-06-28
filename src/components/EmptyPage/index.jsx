import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Fab from '@material-ui/core/Fab';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import Popover from '@material-ui/core/Popover';
import useStyles from './index.style';
import { App } from './test';
import { Paper, Typography } from '@material-ui/core';

const EmptyPage = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const match = useRouteMatch();
  const title = match.path.split('/').pop();

  return (
    <Paper className={classes.paper}>
      <div className={classes.root}>
        <Typography variant="h6" className={classes.text}>
          {t(`you_have_not_choose_any_${title}`)}
        </Typography>
      </div>
    </Paper>
  );
};

export default EmptyPage;

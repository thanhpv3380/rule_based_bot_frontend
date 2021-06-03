import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useConfirm } from 'material-ui-confirm';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { Typography, Button, Box, Grid } from '@material-ui/core';
import useStyles from './index.style';
import apis from '../../../apis';

const listBtn = [
  {
    name: 'Export as Zip',
    description: 'Create file backup of bot',
  },
  {
    name: 'restore from zip',
    description:
      'Replace the current bot version with a new one. All the intents and entities in the older version will be deleted.',
  },
  {
    name: 'import as zip',
    description:
      'Upload and import new intents and entities where the ones with the same name will be replaced with the newer version.',
  },
];

const ExportAndImport = ({ bot }) => {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  const history = useHistory();
  const confirm = useConfirm();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      {listBtn.map((el) => (
        <>
          <Grid item xs={3} className={classes.itemLeft}>
            <Button size="large" className={classes.btn} fullWidth>
              {el.name}
            </Button>
          </Grid>
          <Grid item xs={8} className={classes.itemRight}>
            <Typography>{el.description}</Typography>
          </Grid>{' '}
        </>
      ))}
    </Grid>
  );
};

export default ExportAndImport;

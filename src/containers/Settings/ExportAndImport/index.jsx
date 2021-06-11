import React, { useState } from 'react';
// import { useHistory } from 'react-router';
// import { useConfirm } from 'material-ui-confirm';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography, Button, Grid } from '@material-ui/core';
import useStyles from './index.style';
import apis from '../../../apis';

const ExportAndImport = ({ bot }) => {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  // const history = useHistory();
  const botId = useSelector((state) => state.bot.bot.id);
  // const confirm = useConfirm();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const exportFile = async () => {
    window.location.href = `${process.env.REACT_APP_API_DOMAIN}/api/v1/bots/${botId}/export-file`;
  };


  const handleImportFile = async (e) => {
    const data = await apis.bot.importFile(botId, e.target.files[0]);
    if (data.status) {
      enqueueSnackbar('Import bot success', { variant: 'success' });
    } else {
      enqueueSnackbar('Import bot failed', { variant: 'error' });
    }
  };

  const listBtn = [
    {
      name: 'Export as Zip',
      description: 'Create file backup of bot',
      action: exportFile,
      type: 'button',
    },
    {
      name: 'restore from zip',
      description:
        'Replace the current bot version with a new one. All the intents and entities in the older version will be deleted.',
      action: '',
    },
    {
      id: 'uploadFile',
      name: 'import as zip',
      description:
        'Upload and import new intents and entities where the ones with the same name will be replaced with the newer version.',
      // action: importFile,
      type: 'file',
      component: 'span',
      onChange: handleImportFile,
    },
  ];

  return (
    <Grid container className={classes.container}>
      {listBtn.map((el) => (
        <>
          <Grid item xs={3} className={classes.itemLeft}>
            <input
              className={classes.input}
              id={el.id}
              multiple
              type="file"
              onChange={el.onChange}
            />
            <label htmlFor={el.id}>
              <Button
                size="large"
                className={classes.btn}
                fullWidth
                onClick={el.action}
                component={el.component}
              >
                {el.name}
              </Button>
            </label>
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

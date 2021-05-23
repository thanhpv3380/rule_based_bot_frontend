import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useConfirm } from 'material-ui-confirm';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { Typography, Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import useStyles from './index.style';
import apis from '../../../apis';

const DeleteBot = ({ bot }) => {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  const history = useHistory();
  const confirm = useConfirm();
  const { enqueueSnackbar } = useSnackbar();
  const [isDeleting, setDeleting] = useState(false);
  const classes = useStyles();
  const handleDelete = async (e) => {
    e.preventDefault();
    confirm({ description: `Do you want to remove bot ${bot.id}?` }).then(
      async () => {
        setDeleting(true);
        enqueueSnackbar('Delete can take several minutes', {
          variant: 'warning',
        });
        const data = await apis.bot.deleteBot(bot && bot.id);
        if (data && data.status) {
          enqueueSnackbar('Delete bot success', { variant: 'success' });
          history.push('/dashboard');
        } else {
          enqueueSnackbar('Delete bot failed', { variant: 'error' });
          setDeleting(false);
        }
      },
    );
  };
  return (
    <>
      <Typography variant="body1">
        DANGER ZONE - Are you sure you want to delete this bot? This will
        destroy the bot with all corresponding data and cannot be undone!
      </Typography>
      {!isDeleting ? (
        <Button className={classes.dangerButton} onClick={handleDelete}>
          <DeleteIcon fontSize="small" className={classes.dangerIcon} />
          Delete
        </Button>
      ) : (
        <Button disabled variant="contained">
          Waiting
        </Button>
      )}
    </>
  );
};

export default DeleteBot;

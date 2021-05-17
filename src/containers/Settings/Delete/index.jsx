import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import useStyles from './index.style';

const DeleteBot = () => {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  const classes = useStyles();
  const handleDelete = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Typography variant="body1">
        DANGER ZONE - Are you sure you want to delete this bot? This will
        destroy the bot with all corresponding data and cannot be undone!
      </Typography>
      <Button className={classes.dangerButton} onClick={handleDelete}>
        <DeleteIcon fontSize="small" className={classes.dangerIcon} />
        Delete
      </Button>
    </>
  );
};

export default DeleteBot;

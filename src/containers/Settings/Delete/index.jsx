import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useConfirm } from 'material-ui-confirm';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { Typography, Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import useStyles from './index.style';
import apis from '../../../apis';
import actions from '../../../redux/actions';

const DeleteBot = ({ bot }) => {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  const history = useHistory();
  const confirm = useConfirm();
  const dispatch = useDispatch();
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
          dispatch(actions.bot.removeBot());
          history.push('/');
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
        {t(
          'DANGER_ZONE_-_Are_you_sure_you_want_to_delete_this_bot?_This_will_destroy_the_bot_with_all_corresponding_data_and_cannot_be_undone',
        )}
      </Typography>
      {!isDeleting ? (
        <Button className={classes.dangerButton} onClick={handleDelete}>
          <DeleteIcon fontSize="small" className={classes.dangerIcon} />
          {t('delete')}
        </Button>
      ) : (
        <Button disabled variant="contained">
          {t('waiting')}
        </Button>
      )}
    </>
  );
};

export default DeleteBot;

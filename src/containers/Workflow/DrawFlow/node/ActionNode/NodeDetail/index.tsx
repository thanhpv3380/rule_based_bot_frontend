import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Modal, Paper, Grid } from '@material-ui/core';
import useStyles from './index.style';
import DetailAction from '../../../../../Action/DetailAction';
import apis from '../../../../../../apis';
import textDefault from '../../../../../../constants/textDefault';

interface ActionNodeDetailProps {
  open: boolean;
  handleCloseEdit: Function;
}

const ActionNodeDetail = (props: ActionNodeDetailProps) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { open, handleCloseEdit } = props;
  const [groupAndItems, setGroupAndItems] = useState([]);

  const fetchGroupAndItems = async () => {
    const data = await apis.groupAction.getGroupAndItems();
    if (data.status) {
      console.log(data);
      setGroupAndItems(data.result.groupActions);
    } else {
      enqueueSnackbar(textDefault.FETCH_DATA_FAILED, {
        variant: 'error',
      });
    }
  };

  const handleUpdate = () => {
    console.log('update action in flow');
  };

  useEffect(() => {
    fetchGroupAndItems();
  }, []);

  return (
    <Modal
      open={open}
      className={classes.modal}
      onClose={() => handleCloseEdit()}
    >
      <Paper className={classes.root}>
        <Grid className={classes.content}>
          <DetailAction
            groupItems={groupAndItems}
            flowActionId="605101e64450020015e15ae1"
            handleUpdate={handleUpdate}
          />
        </Grid>
      </Paper>
    </Modal>
  );
};

export default ActionNodeDetail;

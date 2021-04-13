import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import {
  CanvasWidget,
  Action,
  ActionEvent,
  InputType,
} from '@projectstorm/react-canvas-core';
import { Modal, Paper, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './index.style';
import DetailAction from '../../../../../Action/DetailAction';
import apis from '../../../../../../apis';
import textDefault from '../../../../../../constants/textDefault';

interface ActionNodeDetailProps {
  open: boolean;
  setOpen: Function;
}

const ActionNodeDetail = (props: ActionNodeDetailProps) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { open, setOpen } = props;
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
      onClose={() => {
        setOpen(false);
      }}
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

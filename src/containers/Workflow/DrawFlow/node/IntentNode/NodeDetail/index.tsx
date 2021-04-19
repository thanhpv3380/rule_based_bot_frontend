import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Modal, Paper } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import IntentDetail from '../../../../../Intent/DetailIntent';
import IntentCreate from '../../../../../Intent/CreateIntent';
import apis from '../../../../../../apis';
import useStyle from './index.style';
import textDefault from '../../../../../../constants';
interface IntentNodeDetail {
  open: boolean;
  handleCloseEdit: Function;
  intentId?: string;
}

const IntentNodeDetail = (props: IntentNodeDetail) => {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const { open, handleCloseEdit, intentId } = props;
  const [groupAndItems, setGroupAndItems] = useState([]);
  const [groupIdSelected, setGroupIdSelected] = useState();

  const fetchGroupAndItems = async (keyword) => {
    const data = await apis.groupIntent.getGroupAndItems({ keyword });
    if (data.status) {
      setGroupAndItems(data.result.groupIntents);
    } else {
      enqueueSnackbar(textDefault.FETCH_DATA_FAILED, {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchGroupAndItems('');
  }, []);

  const handleUpdate = (data, oldGroupAction) => {
    const newGroupAndItems = [...groupAndItems];
    const intentData = {
      id: data.id,
      name: data.name,
      groupIntent: data.groupIntent,
      actions: data.actions,
    };
    const pos = newGroupAndItems.findIndex((el) => el.id === data.groupIntent);
    newGroupAndItems[pos].status = true;
    const childrenPos = newGroupAndItems[pos].children.findIndex(
      (el) => el.id === data.id,
    );
    if (childrenPos < 0) {
      const tempPos = newGroupAndItems.findIndex(
        (el) => el.id === oldGroupAction,
      );
      const newItems = newGroupAndItems[tempPos].children.filter(
        (el) => el.id !== data.id,
      );
      newGroupAndItems[tempPos] = {
        ...newGroupAndItems[tempPos],
        children: [...newItems],
      };
      newGroupAndItems[pos].children.unshift(intentData);
    } else {
      newGroupAndItems[pos].children[childrenPos] = intentData;
    }
    setGroupAndItems(newGroupAndItems);
  };
  const handleCreateItem = (data) => {
    const newGroupAndItems = [...groupAndItems];
    const pos = newGroupAndItems.findIndex((el) => el.id === data.groupIntent);
    newGroupAndItems[pos].children.unshift({
      id: data.id,
      name: data.name,
      groupIntent: data.groupIntent,
      // intents: data.actions,
    });
    newGroupAndItems[pos].status = true;
    setGroupAndItems(newGroupAndItems);
    // history.push(`/bot/${botId}/intents/detail/${data.id}`);
  };
  return (
    <Modal
      open={open}
      className={classes.modal}
      onClose={() => handleCloseEdit()}
    >
      <Paper className={classes.root}>
        <Grid className={classes.content}>
          {intentId ? (
            <IntentDetail
              groupItems={groupAndItems}
              flowIntentId={intentId}
              handleUpdate={handleUpdate}
            />
          ) : (
            <IntentCreate
              groupItems={groupAndItems}
              groupIntentId={groupIdSelected}
              handleCreate={handleCreateItem}
            />
          )}
        </Grid>
      </Paper>
    </Modal>
  );
};

export default IntentNodeDetail;

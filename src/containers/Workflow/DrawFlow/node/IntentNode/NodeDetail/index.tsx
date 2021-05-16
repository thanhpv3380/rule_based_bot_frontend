import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Modal, Paper, Box, Typography } from '@material-ui/core';
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
  handleCreateItem: Function;
}

const IntentNodeDetail = (props: IntentNodeDetail) => {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const { open, handleCloseEdit, intentId, handleCreateItem } = props;
  const [groupAndItems, setGroupAndItems] = useState([]);
  const [groupIdSelected, setGroupIdSelected] = useState();
  const [currentIntentId, setCurrentIntentId] = useState<string>();
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
    setCurrentIntentId(intentId);
    fetchGroupAndItems('');
  }, [open]);

  const handleUpdate = (data, oldGroupAction) => {
    console.log('update intent in flow');
  };

  const handleCreate = (data) => {
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
    setCurrentIntentId(data.id);
    handleCreateItem(data);
  };
  return (
    <Modal
      open={open}
      className={classes.modal}
      onClose={() => handleCloseEdit()}
    >
      <div className={classes.root}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Intent Detail
          </Typography>
        </Box>
        <Box className={classes.content}>
          {currentIntentId ? (
            <IntentDetail
              groupItems={groupAndItems}
              flowIntentId={intentId}
              handleUpdate={handleUpdate}
            />
          ) : (
            <IntentCreate
              groupItems={groupAndItems}
              groupIntentId={groupIdSelected}
              handleCreate={handleCreate}
            />
          )}
        </Box>
      </div>
    </Modal>
  );
};

export default IntentNodeDetail;

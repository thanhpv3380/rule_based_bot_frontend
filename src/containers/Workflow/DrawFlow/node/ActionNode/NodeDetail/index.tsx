import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Modal, Paper, Typography, Box } from '@material-ui/core';
import useStyles from './index.style';
import DetailAction from '../../../../../Action/DetailAction';
import CreateAction from '../../../../../Action/CreateAction';
import apis from '../../../../../../apis';
import textDefault from '../../../../../../constants/textDefault';
import groupType from '../../../../../../constants/group';

interface ActionNodeDetailProps {
  open: boolean;
  handleCloseEdit: Function;
  actionId?: string;
  handleCreateItem: Function;
}

const ActionNodeDetail = (props: ActionNodeDetailProps) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { open, handleCloseEdit, actionId, handleCreateItem } = props;
  const [currentActionId, setCurrentActionId] = useState<string>();
  const [groupAndItems, setGroupAndItems] = useState([]);
  const [groupSingleId, setGroupSingleId] = useState<string>();
  const fetchGroupAndItems = async () => {
    const data = await apis.groupAction.getGroupAndItems();
    if (data.status) {
      const groupSingle = data.result.groupActions.find(
        (el) => el.groupType === groupType.GROUP_SINGLE,
      );
      setGroupSingleId(groupSingle?.id);
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
    setCurrentActionId(actionId);
    fetchGroupAndItems();
  }, [open]);

  const handleCreate = (data) => {
    const newGroupAndItems = [...groupAndItems];
    const pos = newGroupAndItems.findIndex((el) => el.id === data.groupAction);
    newGroupAndItems[pos].children.unshift({
      id: data.id,
      name: data.name,
      groupAction: data.groupAction,
      actions: data.actions,
    });
    newGroupAndItems[pos].status = true;
    setGroupAndItems(newGroupAndItems);
    setCurrentActionId(data.id);
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
            Action Detail
          </Typography>
        </Box>
        <Box className={classes.content}>
          {currentActionId ? (
            <DetailAction
              groupItems={groupAndItems}
              flowActionId={currentActionId}
              handleUpdate={handleUpdate}
            />
          ) : (
            <CreateAction
              groupItems={groupAndItems}
              groupId={groupSingleId}
              handleCreate={handleCreate}
            />
          )}
        </Box>
      </div>
    </Modal>
  );
};

export default ActionNodeDetail;

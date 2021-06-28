/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import ItemInfoHeader from '../../../components/ItemInfoHeader';
import useStyles from './index.style';
import apis from '../../../apis';
import textDefault from '../../../constants/textDefault';
import { generateTitleItem } from '../../../utils/generateTitle';
import groupConstant from '../../../constants/group';

const CreateWorkFlow = ({ groupItems, groupId, handleCreate }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [workflowData, setWorkflowData] = useState({
    name: '',
    groupWorkflow: '',
  });

  useEffect(() => {
    setWorkflowData({
      name: generateTitleItem('Workflow'),
      groupWorkflow: groupId,
    });
  }, []);

  useEffect(() => {
    const temp = groupItems.find(
      (el) => el.groupType === groupConstant.GROUP_SINGLE,
    );
    setWorkflowData({
      name: generateTitleItem('Workflow'),
      groupWorkflow: groupId || (temp && temp.id),
    });
  }, [groupItems]);

  useEffect(() => {
    setWorkflowData({
      name: generateTitleItem('Workflow'),
      groupWorkflow: groupId,
    });
  }, [groupId]);

  const handleChangeInfoHeader = (e) => {
    if (e.target.name === 'groupId') {
      setWorkflowData({
        ...workflowData,
        groupWorkflow: e.target.value,
      });
    }
    if (e.target.name === 'name') {
      setWorkflowData({
        ...workflowData,
        name: e.target.value,
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = await apis.workflow.createWorkflow({
      name: workflowData.name,
      groupWorkflow: workflowData.groupWorkflow,
      nodes: [],
    });
    if (data && data.status) {
      handleCreate(data.result.workflow);
      enqueueSnackbar(textDefault.CREATE_SUCCESS, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(data.message || textDefault.CREATE_FAILED, {
        variant: 'error',
      });
    }
  };

  return (
    <Paper className={classes.root}>
      <ItemInfoHeader
        name={workflowData.name || ''}
        groupId={workflowData.groupWorkflow}
        groupItems={groupItems}
        handleSave={handleSave}
        handleChange={handleChangeInfoHeader}
      />
      <div className={classes.content}>
        {/* <Button variant="outlined" color="primary">
          Workflow
        </Button> */}
      </div>
    </Paper>
  );
};

export default CreateWorkFlow;

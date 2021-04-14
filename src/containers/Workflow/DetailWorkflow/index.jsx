/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import ItemInfoHeader from '../../../components/ItemInfoHeader';
import useStyles from './index.style';
import apis from '../../../apis';
import textDefault from '../../../constants/textDefault';

const CreateWorkFlow = ({ groupItems, handleUpdate }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const botId = useSelector((state) => state.bot.bot);
  const [workflowData, setWorkflowData] = useState({
    name: '',
    groupWorkflow: '',
  });
  const [currentWorkflowId, setCurrentWorkflowId] = useState();

  const fetchWorkflow = async (id) => {
    const data = await apis.workflow.getWorkflow(id);
    if (data && data.status) {
      setWorkflowData(data.result.workflow);
    } else {
      enqueueSnackbar(textDefault.FETCH_DATA_FAILED, {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    const listUrl = window.location.href.split('/');
    const itemId = listUrl[listUrl.length - 1];
    setCurrentWorkflowId(itemId);
    fetchWorkflow(itemId);
  }, [window.location.href]);

  const handleChangeInfoHeader = (e) => {
    if (e.target.name === 'groupId') {
      setWorkflowData({
        ...workflowData,
        groupAction: e.target.value,
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
    const data = await apis.action.updateAction(currentWorkflowId, {
      name: workflowData.name,
      nodes: [],
      groupWorkflow: workflowData.groupWorkflow,
    });
    if (data.status) {
      handleUpdate(data.result.workflow, workflowData.groupWorkflow);
      setWorkflowData(data.result.workflow);
      enqueueSnackbar(textDefault.UPDATE_SUCCESS, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(textDefault.UPDATE_FAILED, {
        variant: 'error',
      });
    }
  };

  const handleOpenDrawFlow = (e) => {
    e.preventDefault();
    history.push(`/bot/${botId}/draw-workflows/${workflowData.id}`);
  };

  return (
    <>
      <ItemInfoHeader
        name={workflowData.name || ''}
        groupId={workflowData.groupWorkflow}
        groupItems={groupItems}
        handleSave={handleSave}
        handleChange={handleChangeInfoHeader}
      />
      <div className={classes.content}>
        <Button variant="outlined" color="primary" onClick={handleOpenDrawFlow}>
          Workflow
        </Button>
      </div>
    </>
  );
};

export default CreateWorkFlow;

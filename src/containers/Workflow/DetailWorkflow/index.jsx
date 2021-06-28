/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Button, Box, Paper } from '@material-ui/core';
import ItemInfoHeader from '../../../components/ItemInfoHeader';
import useStyles from './index.style';
import apis from '../../../apis';
import ParametersModal from './ParametersModal';
import Loading from '../../../components/Loading';

const DetailWorkflow = ({ groupItems, handleUpdate }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const botId = useSelector((state) => state.bot.bot.id);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isFetchData, setIsFetchData] = useState(false);
  const [oldGroupId, setOldGroupId] = useState();
  const [workflowData, setWorkflowData] = useState({
    name: '',
    groupWorkflow: '',
  });
  const [currentWorkflowId, setCurrentWorkflowId] = useState();

  const fetchWorkflow = async (id) => {
    const data = await apis.workflow.getWorkflowById(id);
    if (data && data.status) {
      const { workflow } = data.result;
      setWorkflowData(workflow);
      setOldGroupId(
        typeof workflow.groupWorkflow === 'object'
          ? workflow.groupWorkflow.id
          : workflow.groupWorkflow,
      );
      setIsFetchData(true);
    } else {
      enqueueSnackbar(t('fetch_data_failed'), {
        variant: 'error',
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const listUrl = window.location.href.split('/');
    const itemId = listUrl[listUrl.length - 1];
    setCurrentWorkflowId(itemId);
    fetchWorkflow(itemId);
  }, [window.location.href]);

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
    const data = await apis.workflow.updateWorkflow(currentWorkflowId, {
      name: workflowData.name,
      nodes: [],
      groupWorkflow: workflowData.groupWorkflow,
    });
    if (data && data.status) {
      handleUpdate(data.result.workflow, oldGroupId);
      setOldGroupId(data.result.workflow.groupWorkflow);
      setWorkflowData(data.result.workflow);
      enqueueSnackbar(t('update_workflow_success'), {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(t('update_workflow_failed'), {
        variant: 'error',
      });
    }
  };

  const handleOpenParametersModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const handleCloseParametersModal = () => {
    setOpenModal(false);
  };

  const handleOpenDrawFlow = (e) => {
    e.preventDefault();
    history.push(`/bot/${botId}/draw-workflows/${workflowData.id}`);
  };

  if (isLoading) {
    return <Loading />;
  }
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
        {isFetchData && (
          <>
            <Box display="flex">
              <Box mr={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={handleOpenParametersModal}
                >
                  {t('parameters')}
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={handleOpenDrawFlow}
                >
                  {t('workflow')}
                </Button>
              </Box>
            </Box>

            <ParametersModal
              open={openModal}
              handleCloseModal={handleCloseParametersModal}
            />
          </>
        )}
      </div>
    </Paper>
  );
};

export default DetailWorkflow;

/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Card, Divider, CardContent } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import TranningPhrases from '../components/tranningPhrases';
import Parameters from '../components/parameter';
import ActionMapping from '../components/actionMapping';
import ContentHeader from '../../../components/contentHeader';
import apis from '../../../apis';
import useStyles from './index.style';

function CreateIntent() {
  const classes = useStyles();
  const history = useHistory();
  const methods = useForm({
    defaultValues: {},
    mode: 'all',
  });
  const { enqueueSnackbar } = useSnackbar();
  const [intent, setIntent] = useState({});
  const [groupSelect, setGroupSelect] = useState({});
  const [groups, setGroups] = useState();

  const fetchGroupIntents = async () => {
    const { results } = await apis.groupIntent.getGroupIntents();
    if (results.groupIntents) {
      const notIsGroup = results.groupIntents.find((group) => !group.isGroup);
      const isGroups = results.groupIntents.filter((group) => group.isGroup);
      if (notIsGroup) {
        notIsGroup.name = 'Not is group';
        isGroups.push(notIsGroup);
      }
      setGroups(isGroups);
    }
  };

  const fetchIntent = async (id) => {
    const { result } = await apis.intent.getIntent(id);
    setIntent(result);
  };

  useEffect(() => {
    fetchGroupIntents();
  }, []);

  const handleKeyDown = async (e) => {
    if (e.keyCode === 13) {
      const { value } = e.target;
      intent.patterns = [value];
      intent.groupIntentId = groupSelect.id;
      const { result, status, message } = await apis.intent.createIntent(
        intent,
      );
      if (status === 1) {
        history.push(`/intents/detail/${result.id}`);
        // fetchIntent();
      } else {
        enqueueSnackbar(message, {
          variant: 'error',
        });
      }
    }
  };

  const handleChangeGroup = (e) => {
    const { value } = e.target;
    setGroupSelect(value);
  };

  const handleOnChangeNameIntent = (e) => {
    const { value } = e.target;
    setIntent({
      ...intent,
      name: value,
    });
  };

  const handleChangeParameter = (e, field) => {
    const { value, name } = e.target;
    if (field === 'name' && intent.parameters) {
      const newParameter = intent.parameters.map((item) => {
        if (item.name === name) {
          item.name = value;
          return item;
        }
        return item;
      });
      setIntent({
        ...intent,
        parameters: newParameter,
      });
    } else {
      const newParameter = intent.parameters.map((item) => {
        if (item.name === name) {
          item.entity = value.id ? value.id : null;
          return item;
        }
        return item;
      });
      setIntent({
        ...intent,
        parameters: newParameter,
      });
    }
  };

  const handleAddParameter = async (data) => {
    console.log(data);
  };

  const handleSubmit = async () => {
    const newIntent = {
      name: intent.name,
      patterns: intent.patterns,
      isMappingAction: intent.isMappingAction,
      parameters: intent.parameters,
      groupIntentId: groupSelect.id ? groupSelect.id : null,
    };
    const { status, result } = await apis.intent.createIntent(newIntent);
    if (status === 1) {
      enqueueSnackbar('Create intent success', {
        variant: 'success',
      });
      // fetchIntent();
      history.push(`/intents/${result.id}`);
      fetchIntent(result.id);
    } else {
      enqueueSnackbar('Cannot fetch data', {
        variant: 'error',
      });
    }
  };

  return (
    <Card>
      <ContentHeader
        groups={groups}
        item={intent}
        handleChangeGroup={handleChangeGroup}
        handleOnChangeName={handleOnChangeNameIntent}
        groupSelect={groupSelect}
        handleSubmit={handleSubmit}
      />
      <CardContent className={classes.cardContent}>
        <TranningPhrases
          intent={intent}
          handleKeyDown={handleKeyDown}
          // handleDelete={handleDeleteUsersay}
        />
        <br />
        <Divider />
        <br />
        <FormProvider {...methods}>
          <Parameters
            intent={intent}
            handleChange={handleChangeParameter}
            // handleDelete={handleDeleteParameter}
            handleAddParameter={handleAddParameter}
          />
        </FormProvider>
        <br />
        <Divider />
        <br />
        <ActionMapping />
      </CardContent>
    </Card>
  );
}

export default CreateIntent;

/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Card, Divider, CardContent } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import TranningPhrases from '../components/tranningPhrases';
import Parameters from '../components/parameter';
import ActionMapping from '../components/actionMapping';
import ContentHeader from '../../../components/contentHeader';
import apis from '../../../apis';
import useStyles from './index.style';

function IntentDetail() {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {},
    mode: 'all',
  });
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [intent, setIntent] = useState({});
  // const [currentGroup, setCurrentGroup] = useState(null);
  const [groupSelect, setGroupSelect] = useState();
  const [patterns, setPatterns] = useState();
  const [userExpression, setUserExpression] = useState();
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
      isGroups.find((group) => {
        if (group.intents) {
          group.intents.find((item) => {
            if (item.id === id) {
              setGroupSelect(group);
            }
          });
        }
      });
      setGroups(isGroups);
    }
  };

  const fetchIntent = async () => {
    const { result, status } = await apis.intent.getIntent(id);
    if (status === 1 && result) {
      setIntent(result);
      setPatterns(result.patterns);
    }
  };

  useEffect(() => {
    fetchGroupIntents();
    fetchIntent();
  }, [id]);

  const handleKeyDown = async (e) => {
    if (e.keyCode === 13) {
      const { value } = e.target;
      await apis.intent.addUsersay(id, value);
      fetchIntent();
      setUserExpression('');
    }
  };

  const handleDeleteUsersay = async (usersay) => {
    const { status, code } = await apis.intent.removeUsersay(id, usersay);
    if (status === 1 && !code) {
      enqueueSnackbar('Delete usersay success', {
        variant: 'success',
      });
    } else {
      enqueueSnackbar('Cannot fetch data', {
        variant: 'error',
      });
    }
    fetchIntent();
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
    if (intent.parameters) {
      if (field === 'name') {
        const newParameter = intent.parameters.map((item) => {
          if (item.name && item.name === name) {
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
            item.entity = value && value.id;
            return item;
          }
          return item;
        });
        setIntent({
          ...intent,
          parameters: newParameter,
        });
      }
    }
  };

  const handleDeleteParameter = async (parameter) => {
    const { status } = await apis.intent.removeParameter(id, parameter);
    if (status === 1) {
      enqueueSnackbar('Remove parameter success', {
        variant: 'success',
      });
    } else {
      enqueueSnackbar('Cannot fetch data', {
        variant: 'error',
      });
    }
    fetchIntent();
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
    const { status } = await apis.intent.updateIntent(id, newIntent);
    if (status === 1) {
      enqueueSnackbar('Update intent success', {
        variant: 'success',
      });
      fetchIntent();
    } else {
      enqueueSnackbar('Cannot fetch data', {
        variant: 'error',
      });
    }
  };

  const handleSearchPattern = (e) => {
    const { value } = e.target;
    const newPattern = intent.patterns.filter(
      (item) => item.indexOf(value) >= 0,
    );
    setPatterns(newPattern);
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
          patterns={patterns}
          userExpression={userExpression}
          handleKeyDown={handleKeyDown}
          handleDelete={handleDeleteUsersay}
          handleChangeSearch={handleSearchPattern}
        />
        <br />
        <Divider />
        <br />
        <FormProvider {...methods}>
          <Parameters
            intent={intent}
            handleChange={handleChangeParameter}
            handleDelete={handleDeleteParameter}
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

export default IntentDetail;

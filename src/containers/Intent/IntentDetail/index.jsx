import React, { useEffect, useState } from 'react';
import { Card, Divider, CardContent } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import TranningPhrases from '../components/tranningPhrases';
import Parameters from '../components/parameter';
import ActionMapping from '../components/actionMapping';
import ContentHeader from '../../../components/contentHeader';
import apis from '../../../apis';
import useStyles from './index.style';
import LayoutBody from '../components/LayoutBody';
import groupDefault from '../../../enums/groupDefault';

function IntentDetail() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const methods = useForm({
    defaultValues: {},
    mode: 'all',
  });
  const { enqueueSnackbar } = useSnackbar();
  const [noneGroups, setNoneGroup] = useState();
  const [groups, setGroups] = useState();
  const [intent, setIntent] = useState({});
  // const [currentGroup, setCurrentGroup] = useState(null);
  const [groupSelect, setGroupSelect] = useState();

  const fetchGroupIntents = async () => {
    const { results } = await apis.groupIntent.getGroupIntents();
    if (results.groupIntents) {
      const notAGroups = await results.groupIntents.filter(
        (group) => !group.isGroup,
      );
      const isGroups = await results.groupIntents
        .filter((group) => group.isGroup)
        .map((item) => {
          let open = false;
          if (item.intents.find((element) => element.id === id)) {
            setGroupSelect(item);
            open = true;
          }
          return {
            ...item,
            open,
          };
        });
      setNoneGroup(notAGroups);
      setGroups(isGroups);
    }
  };

  const fetchIntent = async () => {
    const { result } = await apis.intent.getIntent(id);
    setIntent(result);
  };

  useEffect(() => {
    fetchGroupIntents();
    fetchIntent();
  }, []);

  const handleKeyDown = async (e) => {
    console.log(e, ' detail');
    if (e.keyCode === 13) {
      const { value } = e.target;
      await apis.intent.addUsersay(id, value);
      fetchIntent();
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

  const handleSearchIntent = async (e) => {
    const { value } = e.target;
    const { results } = await apis.groupIntent.search(value);
    if (results.groupIntents) {
      const notAGroups = results.groupIntents.filter((group) => !group.isGroup);
      const isGroups = results.groupIntents
        .filter((group) => group.isGroup)
        .map((item) => {
          const statusOldGroup = groups.find(
            (oldGroup) => oldGroup.id === item.id,
          );
          return {
            ...item,
            open: statusOldGroup ? statusOldGroup.open : false,
          };
        });
      setNoneGroup(notAGroups);
      setGroups(isGroups);
    } 
  };

  const handleClickIntent = (data) => {
    history.push(`/intents/${data.id}`);
    fetchIntent();
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

  const handleClickGroup = (data) => {
    const newGroups = groups.map((item) => {
      if (item.name === data.name) {
        // if (!item.open) {
        //   setCurrentGroup(item);
        // } else {
        //   setCurrentGroup(null);
        // }
        if (item.intents.length !== 0) {
          return {
            ...item,
            open: !item.open,
          };
        }
        return item;
      }
      return item;
    });
    setGroups(newGroups);
  };

  const handleCreateGroup = async (name) => {
    if (!name || name === null || name === '') {
      enqueueSnackbar('Name cannot be empty', {
        variant: 'warning',
      });
    } else {
      const { status } = await apis.groupIntent.createGroupIntent(name);
      if (status === 1) {
        fetchGroupIntents();
      }
    }
  };

  const handleCreateIntent = () => {
    history.push('/intents/createIntent');
    setIntent(null);
  };

  return (
    <LayoutBody
      noneGroups={noneGroups}
      groups={groups}
      handleSearch={handleSearchIntent}
      handleClickGroup={handleClickGroup}
      handleClickIntent={handleClickIntent}
      handleCreateGroup={handleCreateGroup}
      handleCreateIntent={handleCreateIntent}
    >
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
            handleDelete={handleDeleteUsersay}
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
    </LayoutBody>
  );
}

export default IntentDetail;

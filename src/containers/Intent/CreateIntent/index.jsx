/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Card, Divider, CardContent } from '@material-ui/core';
import { useSnackbar } from 'notistack';
// import { useSelector } from 'react-redux';
import TranningPhrases from '../components/patterns';
import Parameters from '../components/parameter';
import ActionMapping from '../components/actionMapping';
import ItemInfoHeader from '../../../components/ItemInfoHeader';
import apis from '../../../apis';
import useStyles from './index.style';
import { generateTitleItem } from '../../../utils/generateTitle';
import groupConstant from '../../../constants/group';

function CreateIntent(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  // const botId = useSelector((state) => state.bot.bot);
  const { groupItems, groupIntentId, handleCreate } = props;
  const [intent, setIntent] = useState({
    name: '',
    groupIntent: '',
  });
  const [actions, setActions] = useState([]);

  const fetchActions = async () => {
    const data = await apis.action.getActions();

    if (data && data.status) {
      setActions(data.result.actions);
    } else {
      enqueueSnackbar('Fetch actions failed', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchActions();
  }, []);

  useEffect(() => {
    const temp = groupItems.find(
      (el) => el.groupType === groupConstant.GROUP_SINGLE,
    );
    setIntent({
      name: generateTitleItem('Intent'),
      groupIntent: groupIntentId || (temp && temp.id),
    });
  }, [groupItems]);

  const handleKeyDown = async (value) => {
    intent.patterns = [value];
    const data = await apis.intent.createIntent(intent);
    if (data && data.status) {
      handleCreate(data.result);
    } else {
      enqueueSnackbar((data && data.message) || 'Create intent failed', {
        variant: 'error',
      });
    }
  };

  const handleChangeInfoHeader = (e) => {
    if (e.target.name === 'groupId') {
      setIntent({
        ...intent,
        groupIntent: e.target.value,
      });
    }
    if (e.target.name === 'name') {
      setIntent({
        ...intent,
        name: e.target.value,
      });
    }
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

  const handleSave = async () => {
    const newIntent = {
      name: intent.name,
      patterns: intent.patterns,
      isMappingAction: intent.isMappingAction,
      parameters: intent.parameters,
      groupIntent: intent.groupIntent || null,
    };
    const data = await apis.intent.createIntent(newIntent);
    if (data && data.status) {
      handleCreate(data.result);
      enqueueSnackbar('Create intent success', {
        variant: 'success',
      });
      // history.push(`/intents/${data.result.id}`);
    } else {
      enqueueSnackbar('Create intent failed', {
        variant: 'error',
      });
    }
  };

  // Function component Parameters
  const handleChangeCheckBoxParameter = (position) => {
    const newIntent = { ...intent };
    newIntent.parameters[position].required = !newIntent.parameters[position]
      .required;
    setIntent(newIntent);
  };

  const handleAcceptEditParameter = (data, pos) => {
    const newIntent = { ...intent };
    newIntent.parameters[pos] = data;
    setIntent(newIntent);
  };

  const handleAcceptAddParameter = (data) => {
    const newIntent = { ...intent };
    const newParameter = {
      ...data,
    };
    if (!newIntent.parameters) {
      newIntent.parameters = [newParameter];
    } else {
      newIntent.parameters.push(newParameter);
    }
    setIntent(newIntent);
  };

  // Function component actionMapping
  const handleChangeIsMappingAction = (e) => {
    setIntent({
      ...intent,
      isMappingAction: e.target.checked,
    });
  };

  const handleChangeAction = (action) => {
    setIntent({
      ...intent,
      mappingAction: action,
    });
  };

  return (
    <Card>
      <ItemInfoHeader
        name={intent && intent.name}
        groupItems={groupItems}
        handleSave={handleSave}
        groupId={intent && intent.groupIntent}
        handleChange={handleChangeInfoHeader}
      />
      <CardContent className={classes.cardContent}>
        <TranningPhrases intent={intent} handleKeyDown={handleKeyDown} />
        <br />
        <Divider />
        <br />
        <Parameters
          intent={intent}
          actions={actions}
          handleChange={handleChangeParameter}
          handleChangeCheckBox={handleChangeCheckBoxParameter}
          handleAcceptEdit={handleAcceptEditParameter}
          handleAcceptAddParameter={handleAcceptAddParameter}
        />
        <br />
        <Divider />
        <br />
        <ActionMapping
          actions={actions}
          handleChangeIsMappingAction={handleChangeIsMappingAction}
          handleChangeAction={handleChangeAction}
        />
      </CardContent>
    </Card>
  );
}

export default CreateIntent;

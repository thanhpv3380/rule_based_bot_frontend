/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Card, Divider, CardContent } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      enqueueSnackbar(t('create_intent_success'), {
        variant: 'success',
      });
    } else {
      switch (data.code) {
        case 1005:
          enqueueSnackbar(t('intent_name_existed'), {
            variant: 'error',
          });
          break;
        default:
          enqueueSnackbar(t('create_intent_failed'), {
            variant: 'error',
          });
          break;
      }
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
      parameters: intent.parameters.map((el) => {
        return {
          id: el.id,
          parameterName: el.parameterName,
          required: el.required || false,
          entity: el.entity.id,
          response: {
            actionAskAgain:
              el.response &&
              el.response.actionAskAgain &&
              el.response.actionAskAgain.id,
            numberOfLoop: el.response.numberOfLoop,
            actionBreak: el.response.actionBreak && el.response.actionBreak.id,
          },
        };
      }),
      groupIntent: intent.groupIntent || null,
    };
    const data = await apis.intent.createIntent(newIntent);
    if (data && data.status) {
      handleCreate(data.result);
      enqueueSnackbar(t('create_intent_success'), {
        variant: 'success',
      });
      // history.push(`/intents/${data.result.id}`);
    } else {
      switch (data.code) {
        case 1005:
          enqueueSnackbar(t('intent_name_existed'), {
            variant: 'error',
          });
          break;
        default:
          enqueueSnackbar(t('create_intent_failed'), {
            variant: 'error',
          });
          break;
      }
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
    let checkName = false;
    let checkEntity = false;
    if (newIntent.parameters) {
      for (let i = 0; i < newIntent.parameters.length; i += 1) {
        const el = newIntent.parameters[i];
        if (el.parameterName === data.parameterName) {
          checkName = true;
        }
        if (el.entity.id === data.entity.id) {
          checkEntity = true;
        }
      }
      if (checkName) {
        enqueueSnackbar(t('parameter_name_existed'), {
          variant: 'error',
        });
      }
      if (checkEntity) {
        enqueueSnackbar(t('entity_existed'), {
          variant: 'error',
        });
      }
      if (checkName || checkEntity) {
        return false;
      }
    }

    const newParameter = {
      ...data,
    };
    if (!newIntent.parameters) {
      newIntent.parameters = [newParameter];
    } else {
      newIntent.parameters.push(newParameter);
    }
    setIntent(newIntent);
    return true;
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
          parameters={intent.parameters}
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

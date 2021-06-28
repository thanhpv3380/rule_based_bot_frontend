/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Card, Divider, CardContent } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import TrainingPhrases from '../components/patterns';
import Parameters from '../components/parameter';
import ActionMapping from '../components/actionMapping';
import ItemInfoHeader from '../../../components/ItemInfoHeader';
import apis from '../../../apis';
import useStyles from './index.style';
import Loading from '../../../components/Loading';

function IntentDetail({ groupItems, handleUpdate, flowIntentId }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [intent, setIntent] = useState({});
  const [patterns, setPatterns] = useState();
  const [actions, setActions] = useState([]);
  const [oldGroupId, setOldGroupId] = useState();
  const [currentIntentId, setCurrentIntentId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchIntent = async (intentId) => {
    const data = await apis.intent.getIntent(intentId);
    if (data && data.status) {
      setIntent({ ...data.result, parameters: data.result.parameters || [] });
      setPatterns(data.result.patterns);
      setOldGroupId(
        typeof data.result.groupIntent === 'object'
          ? data.result.groupIntent.id
          : data.result.groupIntent,
      );
    } else {
      enqueueSnackbar(t('fetch_data_failed'), {
        variant: 'error',
      });
    }
    setIsLoading(false);
  };

  const fetchActions = async () => {
    const data = await apis.action.getActions();
    if (data.status) {
      setActions(data.result.actions);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (flowIntentId) {
      setCurrentIntentId(flowIntentId);
      fetchIntent(flowIntentId);
    } else {
      const listUrl = window.location.href.split('/');
      const itemId = listUrl[listUrl.length - 1];
      setCurrentIntentId(itemId);
      fetchIntent(itemId);
    }
  }, [window.location.href]);

  useEffect(() => {
    fetchActions();
  }, []);

  // function component itemInfoHeader
  const handleSave = async () => {
    const parameters =
      intent.parameters &&
      intent.parameters.map((el) => {
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
      });
    const newIntent = {
      name: intent.name,
      patterns,
      parameters,
      isMappingAction: intent.isMappingAction,
      groupIntent: intent.groupIntent,
      mappingAction: intent.mappingAction && intent.mappingAction.id,
    };
    const data = await apis.intent.updateIntent(currentIntentId, newIntent);
    if (data.status) {
      const { result } = data;
      enqueueSnackbar(t('update_intent_success'), {
        variant: 'success',
      });
      handleUpdate(result, oldGroupId);
      setOldGroupId(result.groupIntent);
    } else {
      const { code } = data;
      switch (code) {
        case 1005:
          enqueueSnackbar(t('intent_name_existed'), {
            variant: 'error',
          });
          break;
        default:
          enqueueSnackbar(t('update_intent_failed'), {
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

  // Component TrainingPhrases
  const handleKeyDown = async (value) => {
    const newPatterns = [...patterns];
    if (newPatterns.includes(value)) {
      enqueueSnackbar(t('patterns_existed'), {
        variant: 'error',
      });
    } else {
      const data = await apis.intent.addUsersay(currentIntentId, value);
      if (data && data.status) {
        newPatterns.push(value);
        setPatterns(newPatterns);
      } else {
        const { code } = data;
        switch (code) {
          case 1006:
            enqueueSnackbar(t('intent_not_existed'), {
              variant: 'error',
            });
            break;
          default:
            enqueueSnackbar(t('add_pattern_failed'), {
              variant: 'error',
            });
            break;
        }
      }
    }
  };

  const handleDeleteUsersay = async (usersay) => {
    const data = await apis.intent.removeUsersay(currentIntentId, usersay);
    if (data && data.status) {
      const newIntent = { ...intent };
      const newPatterns = newIntent.patterns.filter((el) => el !== usersay);
      newIntent.patterns = newPatterns;
      setIntent(newIntent);
      setPatterns(newPatterns);
      enqueueSnackbar(t('delete_pattern_success'), {
        variant: 'success',
      });
    } else {
      const { code } = data;
      switch (code) {
        case 1006:
          enqueueSnackbar(t('intent_not_existed'), {
            variant: 'error',
          });
          break;
        case 404:
          enqueueSnackbar(t('pattern_not_found'), {
            variant: 'error',
          });
          break;
        default:
          enqueueSnackbar(t('add_pattern_failed'), {
            variant: 'error',
          });
          break;
      }
    }
  };

  const handleSearchPattern = (e) => {
    const { value } = e.target;
    const newPattern = intent.patterns.filter(
      (item) => item.indexOf(value) >= 0,
    );
    setPatterns(newPattern);
  };

  const handleChangePattern = (e, pos) => {
    const { value } = e.target;
    const newPatterns = [...patterns];
    const newIntent = { ...intent };
    newPatterns[pos] = value;
    setPatterns(newPatterns);
    setIntent(newIntent);
  };

  // function component Parameter
  const handleChangeCheckBoxParameter = (position) => {
    const newIntent = { ...intent };
    newIntent.parameters[position].required = !newIntent.parameters[position]
      .required;
    setIntent(newIntent);
  };

  const checkParameterExisted = (newIntent, data, pos) => {
    let checkName = false;
    let checkEntity = false;
    let checkExist = false;
    for (let i = 0; i < newIntent.parameters.length; i++) {
      const el = newIntent.parameters[i];
      if (pos === i) {
        continue;
      }
      if (el.parameterName === data.parameterName) {
        checkName = true;
      }
      if (el.entity && el.entity.id === data.entity.id) {
        checkEntity = true;
      }
    }
    if (checkName) {
      enqueueSnackbar(t('parameter_name_existed'), {
        variant: 'error',
      });
      checkExist = true;
    }
    if (checkEntity) {
      enqueueSnackbar(t('entity_existed'), {
        variant: 'error',
      });
      checkExist = true;
    }
    return checkExist;
  };

  const checkParameterNull = (data) => {
    let checkNull = false;
    if (!data.entity.id) {
      enqueueSnackbar(t('entity_can_not_be_empty'), {
        variant: 'error',
      });
      checkNull = true;
    }
    if (!data.parameterName) {
      enqueueSnackbar(t('parameter_name_can_not_be_empty'), {
        variant: 'error',
      });
      checkNull = true;
    }
    return checkNull;
  };

  const handleAcceptEditParameter = (data, pos) => {
    const newIntent = { ...intent };
    const checkNull = checkParameterNull(data);

    if (checkNull) {
      return false;
    }
    const checkExist = checkParameterExisted(newIntent, data, pos);

    if (checkExist) {
      return false;
    }
    newIntent.parameters[pos] = data;
    setIntent(newIntent);
    return true;
  };

  const handleAcceptAddParameter = (data) => {
    const newIntent = { ...intent };
    let checkName = false;
    let checkEntity = false;
    for (let i = 0; i < newIntent.parameters.length; i++) {
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

    const newParameter = {
      ...data,
    };
    newIntent.parameters.push(newParameter);
    setIntent(newIntent);
    return true;
  };

  const handleDeleteParameter = async (position) => {
    const newIntent = { ...intent };
    newIntent.parameters.splice(position, 1);
    setIntent(newIntent);
  };

  // Function component actionMapping
  const handleChangeIsMappingAction = (e) => {
    e.preventDefault();
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

  if (isLoading) {
    return <Loading />;
  }
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
        <TrainingPhrases
          intent={intent}
          patterns={patterns}
          handleKeyDown={handleKeyDown}
          handleDelete={handleDeleteUsersay}
          handleChangeSearch={handleSearchPattern}
          handleChangePattern={handleChangePattern}
        />
        <br />
        <Divider />
        <br />
        <Parameters
          parameters={intent.parameters}
          actions={actions}
          handleDelete={handleDeleteParameter}
          handleChangeCheckBox={handleChangeCheckBoxParameter}
          handleAcceptEdit={handleAcceptEditParameter}
          handleAcceptAddParameter={handleAcceptAddParameter}
        />
        <br />
        <Divider />
        <br />
        <ActionMapping
          actions={actions}
          actionData={intent && intent.mappingAction}
          isMappingAction={intent && intent.isMappingAction}
          handleChangeIsMappingAction={handleChangeIsMappingAction}
          handleChangeAction={handleChangeAction}
        />
      </CardContent>
    </Card>
  );
}

export default IntentDetail;

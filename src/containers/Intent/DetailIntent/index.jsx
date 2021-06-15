/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Card, Divider, CardContent } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import TrainingPhrases from '../components/patterns';
import Parameters from '../components/parameter';
import ActionMapping from '../components/actionMapping';
import ItemInfoHeader from '../../../components/ItemInfoHeader';
import apis from '../../../apis';
import useStyles from './index.style';

function IntentDetail({ groupItems, handleUpdate, flowIntentId }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [intent, setIntent] = useState({});
  const [patterns, setPatterns] = useState();
  const [actions, setActions] = useState([]);
  const [oldGroupId, setOldGroupId] = useState();
  const [currentIntentId, setCurrentIntentId] = useState();

  const fetchIntent = async (intentId) => {
    const data = await apis.intent.getIntent(intentId);
    if (data.status) {
      setIntent({ ...data.result, parameters: data.result.parameters || [] });
      setPatterns(data.result.patterns);
      setOldGroupId(
        typeof data.result.groupIntent === 'object'
          ? data.result.groupIntent.id
          : data.result.groupIntent,
      );
    }
  };

  const fetchActions = async () => {
    const data = await apis.action.getActions();
    if (data.status) {
      setActions(data.result.actions);
    }
  };

  useEffect(() => {
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
      enqueueSnackbar('Update intent success', {
        variant: 'success',
      });
      console.log(result);
      handleUpdate(result, oldGroupId);
      setOldGroupId(result.groupIntent);
    } else {
      const { code } = data;
      enqueueSnackbar(`Cannot fetch data  ${code}`, {
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

  // Component TrainingPhrases
  const handleKeyDown = async (value) => {
    const data = await apis.intent.addUsersay(currentIntentId, value);
    if (data && data.status) {
      const newPatterns = [...patterns];
      newPatterns.push(value);
      setPatterns(newPatterns);
    }
  };

  const handleDeleteUsersay = async (usersay) => {
    const data = await apis.intent.removeUsersay(currentIntentId, usersay);
    if (data.status) {
      const newIntent = { ...intent };
      const newPatterns = newIntent.patterns.filter((el) => el !== usersay);
      newIntent.patterns = newPatterns;
      setIntent(newIntent);
      setPatterns(newPatterns);
      enqueueSnackbar('Delete usersay success', {
        variant: 'success',
      });
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
      enqueueSnackbar('Parameter name existed', {
        variant: 'error',
      });
      checkExist = true;
    }
    if (checkEntity) {
      enqueueSnackbar('Entity existed', {
        variant: 'error',
      });
      checkExist = true;
    }
    return checkExist;
  };

  const checkParameterNull = (data) => {
    let checkNull = false;
    if (!data.entity.id) {
      enqueueSnackbar('Entity can not be empty!', {
        variant: 'error',
      });
      checkNull = true;
    }
    if (!data.parameterName) {
      enqueueSnackbar('Parameter name can not be empty!', {
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
      enqueueSnackbar('Parameter name existed', {
        variant: 'error',
      });
    }
    if (checkEntity) {
      enqueueSnackbar('Entity existed', {
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
          intent={intent}
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

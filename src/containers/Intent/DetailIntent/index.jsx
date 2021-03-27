/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Card, Divider, CardContent } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import TranningPhrases from '../components/tranningPhrases';
import Parameters from '../components/parameter';
import ActionMapping from '../components/actionMapping';
import ItemInfoHeader from '../../../components/ItemInfoHeader';
import apis from '../../../apis';
import useStyles from './index.style';

function IntentDetail(props) {
  const classes = useStyles();
  const { intentId } = useParams();
  const { groupItems, handleUpdate } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [intent, setIntent] = useState({});
  // const [groupSelect, setGroupSelect] = useState();
  const [patterns, setPatterns] = useState();
  const [actions, setActions] = useState([]);

  const fetchIntent = async () => {
    const data = await apis.intent.getIntent(intentId);
    if (data.status) {
      setIntent({ ...data.result, parameters: data.result.parameters || [] });
      setPatterns(data.result.patterns);
    }
  };

  const fetchActions = async () => {
    const data = await apis.action.getActions();

    if (data.status) {
      setActions(data.result.actions);
    }
  };

  useEffect(() => {
    fetchIntent();
    fetchActions();
  }, [intentId]);

  // function component itemInfoHeader
  const handleSave = async () => {
    const parameters =
      intent.parameters &&
      intent.parameters.map((el) => {
        return {
          parameterName: el.parameterName,
          required: el.required,
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
    console.log(newIntent);
    const data = await apis.intent.updateIntent(intentId, newIntent);
    if (data.status) {
      const { result } = data;
      enqueueSnackbar('Update intent success', {
        variant: 'success',
      });
      handleUpdate(result, intent.groupIntent);
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

  // Component TranningPhrases
  const handleKeyDown = async (value) => {
    const data = await apis.intent.addUsersay(intentId, value);
    if (data.status) {
      const newPatterns = [...patterns];
      newPatterns.push(value);
      setPatterns(newPatterns);
    }

    // setUserExpression();
  };

  const handleDeleteUsersay = async (usersay) => {
    const data = await apis.intent.removeUsersay(intentId, usersay);
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

  const handleAcceptEditParameter = (data, pos) => {
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
      return false;
    }
    if (checkEntity) {
      enqueueSnackbar('Entity existed', {
        variant: 'error',
      });
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
      return false;
    }
    if (checkEntity) {
      enqueueSnackbar('Entity existed', {
        variant: 'error',
      });
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
        <TranningPhrases
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

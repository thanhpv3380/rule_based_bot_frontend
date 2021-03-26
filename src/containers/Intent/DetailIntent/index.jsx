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

// const parametersTest = [
//   {
//     id: 1,
//     required: false,
//     parameterName: 'Address',
//     entity: {
//       id: '604846064b55013ee876f670',
//       name: 'Address',
//     },
//     response: {},
//   },
//   {
//     id: 2,
//     required: false,
//     parameterName: 'Email',
//     entity: {
//       id: '604846064b55013ee876f670',
//       name: 'Address',
//     },
//     response: {},
//   },
// ];

function IntentDetail(props) {
  const classes = useStyles();
  const { id } = useParams();
  const { groupItems, handleUpdate } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [intent, setIntent] = useState({});
  // const [groupSelect, setGroupSelect] = useState();
  const [patterns, setPatterns] = useState();
  const [userExpression, setUserExpression] = useState();
  const [actions, setActions] = useState([]);

  const fetchIntent = async () => {
    const data = await apis.intent.getIntent(id);
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
  }, [id]);

  const handleSave = async (name, groupIntent) => {
    console.log(intent.parameters);
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
      name,
      patterns,
      parameters,
      isMappingAction: intent.isMappingAction,
      groupIntent,
      mappingAction: intent.mappingAction && intent.mappingAction.id,
    };
    console.log(newIntent);
    const data = await apis.intent.updateIntent(id, newIntent);
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

  // Component TranningPhrases
  const handleKeyDown = async (e) => {
    if (e.keyCode === 13) {
      const { value } = e.target;
      const data = await apis.intent.addUsersay(id, value);
      if (data.status) {
        const newPatterns = [...patterns];
        newPatterns.push(value);
        setPatterns(newPatterns);
      }
    }
    // setUserExpression();
  };

  const handleDeleteUsersay = async (usersay) => {
    const data = await apis.intent.removeUsersay(id, usersay);
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
    newIntent.parameters.push(newParameter);
    setIntent(newIntent);
  };

  const handleDeleteParameter = async (position) => {
    const newIntent = { ...intent };
    newIntent.parameters.splice(position, 1);
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
    console.log(intent);
  };
  return (
    <Card>
      <ItemInfoHeader
        name={intent && intent.name}
        groupItems={groupItems}
        handleSave={handleSave}
        groupId={intent && intent.groupIntent}
      />
      <CardContent className={classes.cardContent}>
        <TranningPhrases
          intent={intent}
          patterns={patterns}
          userExpression={userExpression}
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

/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
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
  const [groupSelect, setGroupSelect] = useState();
  const [patterns, setPatterns] = useState();
  const [userExpression, setUserExpression] = useState();
  const [groups, setGroups] = useState();
  const [selection, setSelection] = useState(null);

  const fetchGroupIntents = async () => {
    const data = await apis.groupIntent.getGroupAndItems({ keyword: '' });
    if (data && data.status) {
      const { result } = data;
      result.groupIntents.find((group) => {
        if (group.children) {
          group.children.find((item) => {
            if (item.id === id) {
              setGroupSelect(group);
            }
          });
        }
      });
      setGroups(result.groupIntents);
    }
  };

  const setPatternAndEl = (data) => {
    const newPatterns = data.map((el) => {
      const { usersay } = el;
      if (el.parameters && el.parameters.length !== 0) {
        const parameterSort = el.parameters.sort((a, b) => {
          return usersay.indexOf(a) < usersay.indexOf(b);
        });
        const newParameters = [];
        let i = 0;
        while (i < parameterSort.length) {
          const parameter = parameterSort[i];
          const indexStart = usersay.indexOf(parameter.value);
          if (i === 0) {
            if (indexStart === 0) {
              const newParameter = {
                ...parameter,
                isEntity: true,
              };
              newParameters.push(newParameter);
            } else {
              const parameterBefore = {
                value: usersay.slice(0, indexStart),
                isEntity: false,
              };
              newParameters.push(parameterBefore);

              const newParameter = {
                ...parameter,
                isEntity: true,
              };
              newParameters.push(newParameter);
            }
          } else {
            const indexEndBefore =
              el.usersay.indexOf(parameterSort[i - 1].value) +
              parameterSort[i - 1].value.length;

            const parameterBefore = {
              value: usersay.slice(indexEndBefore, indexStart),
              isEntity: false,
            };
            newParameters.push(parameterBefore);

            const newParameter = {
              ...parameter,
              isEntity: true,
            };
            newParameters.push(newParameter);
          }
          i += 1;
        }
        return {
          ...el,
          parameters: newParameters,
          anchorEl: null,
          openTable: false,
        };
      }
      const parameter = {
        value: usersay,
        isEntity: false,
      };
      return {
        ...el,
        anchorEl: null,
        openTable: false,
        parameters: [parameter],
      };
    });
    console.log(newPatterns);
    setPatterns(newPatterns);
  };

  const fetchIntent = async () => {
    const { result, status } = await apis.intent.getIntent(id);
    if (status === 1 && result) {
      setIntent(result);
      if (result.patterns) {
        setPatternAndEl(result.patterns);
      }
    }
  };

  useEffect(() => {
    fetchGroupIntents();
    fetchIntent();
  }, [id]);

  const handleKeyDown = async (e) => {
    if (e.keyCode === 13) {
      const { value } = e.target;

      const data = await apis.intent.addUsersay(id, {
        usersay: value,
      });
      if (data.status) {
        const {
          result: { pattern },
        } = data;
        const parameter = {
          isEntity: false,
          value: pattern.usersay,
        };
        const newPatterns = [...patterns];
        const newPattern = {
          ...pattern,
          anchorEl: null,
          openTable: false,
          parameters: [parameter],
        };
        newPatterns.push(newPattern);
        setPatterns(newPatterns);
      }
      setUserExpression('');
    }
  };

  const handleDeleteUsersay = async (usersay) => {
    const data = await apis.intent.removeUsersay(id, usersay);
    if (data.status) {
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
    const parameter = {
      name: data.name,
      entity: data.id,
    };

    const { status } = await apis.intent.addParameter(id, parameter);
    if (status === 1) {
      fetchIntent();
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    console.log(patterns);
    const newPatterns = patterns.map((el) => {
      const parameters = el.parameters
        .filter((item) => item.isEntity)
        .map((item) => {
          return {
            id: item.id,
            name: item.name,
            entity: item.entity.id,
            value: item.value,
          };
        });
      return {
        id: el.id,
        usersay: el.usersay,
        parameters,
      };
    });
    const newIntent = {
      name: intent.name,
      patterns: newPatterns,
      isMappingAction: intent.isMappingAction,
      groupIntentId: groupSelect.id ? groupSelect.id : null,
      mappingAction: intent.mappingAction && intent.mappingAction.id,
    };
    console.log(newIntent);
    const data = await apis.intent.updateIntent(id, newIntent);
    if (data.status) {
      const { result } = data;
      enqueueSnackbar('Update intent success', {
        variant: 'success',
      });
      // setIntent(result);
      // setPatterns(result.patterns);
    } else {
      const { code } = data;
      enqueueSnackbar(`Cannot fetch data  ${code}`, {
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

  const tryFindPositionSelectEnd = (
    selectionEnd,
    usersay,
    newParameters,
    i,
  ) => {
    if (i < newParameters.length) {
      const posStart = usersay.indexOf(newParameters[i].value);
      const posEnd = posStart + newParameters[i].value.length;
      if (selectionEnd < posEnd) {
        const newParameter = {
          value: usersay.slice(selectionEnd, posEnd),
          isEntity: false,
        };
        newParameters[i] = newParameter;
      } else {
        tryFindPositionSelectEnd(selectionEnd, usersay, i + 1);
        newParameters.splice(i, 1);
      }
    }
  };

  const handleMouseUpUsersay = (e, data) => {
    e.preventDefault();
    const selectionObj = window.getSelection && window.getSelection();
    const value = selectionObj.toString();
    const newPatterns = patterns.map((el) => {
      if (el.id === data.id) {
        // const check = el.parameters.find((item) => item.isEntity);
        if (el.parameters.length >= 1) {
          return {
            ...el,
            openTable: true,
          };
        }
        return {
          ...el,
          openTable: false,
        };
      }
      return {
        ...el,
        openTable: false,
      };
    });
    setPatterns(newPatterns);
    e.preventDefault();
    if (value) {
      const pos = newPatterns.findIndex((el) => data.id === el.id);
      newPatterns[pos].anchorEl = e.currentTarget;

      setPatterns(newPatterns);
      setSelection(value);
    }
  };

  const handleClickEntity = async (e, data, entity) => {
    e.preventDefault();
    const { usersay } = data;
    let selectionStart = usersay.indexOf(selection);
    let selectionEnd = selectionStart + selection.length;
    while (usersay[selectionStart - 1] !== ' ' && selectionStart !== 0) {
      selectionStart -= 1;
    }
    while (usersay[selectionEnd] !== ' ' && selectionEnd !== usersay.length) {
      selectionEnd += 1;
    }
    const newParameters = data.parameters;
    const trySetParameter = async (i) => {
      const curentParameter = newParameters[i];
      const indexStart = usersay.indexOf(curentParameter.value);
      const indexEnd = indexStart + curentParameter.value.length;
      if (i < newParameters.length) {
        if (selectionStart >= indexStart) {
          if (selectionStart <= indexEnd) {
            if (selectionEnd <= indexEnd) {
              if (selectionStart > indexStart) {
                const firstParameter = {
                  value: usersay.slice(indexStart, selectionStart),
                  isEntity: false,
                };
                newParameters.splice(i, 0, firstParameter);
              }
              i += 1;
              const parameter = {
                value: usersay.slice(selectionStart, selectionEnd),
                entity,
                isEntity: true,
                name: entity.name,
              };
              newParameters[i] = parameter;
              i += 1;
              if (selectionEnd < indexEnd) {
                const lastParameter = {
                  value: usersay.slice(selectionEnd, indexEnd),
                  isEntity: false,
                };
                newParameters.splice(i, 0, lastParameter);
              }
            } else {
              if (selectionStart > indexStart) {
                const firstParameter = {
                  value: usersay.slice(indexStart, selectionStart),
                  isEntity: false,
                };
                newParameters[i] = firstParameter;
              }
              const newParameter = {
                name: entity.name,
                value: usersay.slice(selectionStart, selectionEnd),
                entity,
                isEntity: true,
              };
              i += 1;
              newParameters.splice(i, 0, newParameter);
              await tryFindPositionSelectEnd(
                selectionEnd,
                usersay,
                newParameters,
                i + 1,
              );
            }
          } else {
            trySetParameter(i + 1);
          }
        }
      }
    };
    await trySetParameter(0);
    const newPattern = [...patterns];
    const pos = newPattern.findIndex((el) => data.id === el.id);
    newPattern[pos].parameters = newParameters;
    newPattern[pos].anchorEl = null;
    setPatterns(newPattern);
    setSelection(null);
  };

  const handleCloseMenuEntity = (el) => {
    const newPatterns = [...patterns];
    const pos = newPatterns.findIndex((item) => el.id === item.id);
    newPatterns[pos].anchorEl = null;
    setPatterns(newPatterns);
  };

  const handleChangePattern = (e, data) => {
    e.preventDefault();
    const newUsersay = e.target.innerText;
    const { parameters, usersay } = data;
    const newParameters = [...parameters];
    for (let i = 0; i < newParameters.length; i++) {
      const el = parameters[i];
      const indexChangeStart = newUsersay.indexOf(el.value);
      const indexCurrentStart = usersay.indexOf(el.value);
      if (indexChangeStart >= 0) {
        if (indexCurrentStart > indexChangeStart) {
          if (el.isEntity) {
            const parameterBefore = {
              isEntity: false,
              value: newUsersay.slice(indexCurrentStart, indexChangeStart),
            };
            newParameters[i] = parameterBefore;
            newParameters.splice(i, 0, el);
            break;
          } else {
            const parameter = {
              isEntity: false,
              value: newUsersay.slice(
                indexChangeStart,
                indexCurrentStart + el.value.length,
              ),
            };
            newParameters[i] = parameter;
            break;
          }
        } else if (indexCurrentStart < indexChangeStart) {
          const indexAfterStart = usersay.indexOf(parameters[i + 1].value);
          if (indexChangeStart <= indexAfterStart) {
            if (el.isEntity) {
              const indexCurrentEnd = indexCurrentStart + el.value.length;
              const parameterAfter = {
                isEntity: false,
                value: newUsersay.slice(indexCurrentEnd, indexAfterStart),
              };
              newParameters.splice(i, 0, parameterAfter);
              break;
            } else {
              const parameter = {
                isEntity: false,
                value: newUsersay.slice(indexCurrentStart, indexAfterStart),
              };
              newParameters[i] = parameter;
              break;
            }
          }
        }
      } else if (i + 1 !== newParameters.length) {
        const indexAfterChangeStart = newUsersay.indexOf(
          parameters[i + 1].value,
        );
        if (indexCurrentStart === indexAfterChangeStart) {
          newParameters.splice(i, 1);
          break;
        }
        const paramerter = {
          ...el,
          value: newUsersay.slice(indexCurrentStart, indexAfterChangeStart),
        };
        newParameters[i] = paramerter;
        break;
      } else {
        const paramerter = {
          ...el,
          value: newUsersay,
        };
        newParameters[i] = paramerter;
      }
    }
    const newPatterns = [...patterns];
    const pos = patterns.findIndex((el) => el.id === data.id);
    newPatterns[pos].usersay = newUsersay;
    newPatterns[pos].parameters = newParameters;
    setPatterns(newPatterns);
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
          handleChangePattern={handleChangePattern}
          handleMouseUpUsersay={handleMouseUpUsersay}
          handleClickEntity={handleClickEntity}
          handleCloseMenuEntity={handleCloseMenuEntity}
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
        <ActionMapping
          action={intent && intent.mappingAction}
          isMappingAction={intent && intent.isMappingAction}
          handleChangeIsMappingAction={handleChangeIsMappingAction}
          handleChangeAction={handleChangeAction}
        />
      </CardContent>
    </Card>
  );
}

export default IntentDetail;

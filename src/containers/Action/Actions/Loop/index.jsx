/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  Loop as LoopIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';
import useStyles from './index.style';
import MenuToggle from '../../../../components/MenuToggle';
import apis from '../../../../apis';
import textDefault from '../../../../constants/textDefault';

const ActionLoop = ({
  actionId,
  item,
  handleDeleteLoop,
  handleChangeLoopInfo,
}) => {
  const classes = useStyles();
  const dense = false;
  const { enqueueSnackbar } = useSnackbar();
  const [isAddIntent, setIsAddIntent] = useState(false);
  const [isAddParameter, setIsAddParameter] = useState(false);
  const [editIntent, setEditIntent] = useState(null);
  const [editParameter, setEditParameter] = useState(null);

  const [actions, setActions] = useState([]);
  const [intents, setIntents] = useState([]);
  const [parameters, setParameters] = useState([]);

  const [loopInfo, setLoopInfo] = useState(null);

  const fetchActions = async () => {
    const params = {
      fields: 'name',
      sort: 'name_desc',
    };
    const data = await apis.action.getActions(params);
    if (data && data.status) {
      setActions(data.result.actions);
    } else {
      enqueueSnackbar(textDefault.FETCH_DATA_FAILED, {
        variant: 'error',
      });
    }
  };

  const fetchIntents = async () => {
    const params = {
      fields: 'name',
      sort: 'name_desc',
    };
    const data = await apis.intent.getIntents(params);
    if (data && data.status) {
      setIntents(data.result);
    } else {
      enqueueSnackbar(textDefault.FETCH_DATA_FAILED, {
        variant: 'error',
      });
    }
  };

  const fetchSlots = async () => {
    const data = await apis.slot.getSlots();
    if (data && data.status) {
      setParameters(data.result.slots);
    } else {
      enqueueSnackbar(textDefault.FETCH_DATA_FAILED, {
        variant: 'warning',
      });
    }
  };

  useEffect(() => {
    fetchIntents();
    fetchActions();
    fetchSlots();
  }, []);

  const handleOpenAddParameter = (e) => {
    e.preventDefault();
    setEditParameter(null);
    setIsAddParameter(true);
    setLoopInfo({
      ...loopInfo,
      parameter: null,
    });
  };

  const handleOpenAddIntent = (e) => {
    e.preventDefault();
    setEditIntent(null);
    setIsAddIntent(true);
    setLoopInfo({
      ...loopInfo,
      intent: null,
    });
  };

  const handleCancelAddParameter = (e) => {
    e.preventDefault();
    setIsAddParameter(false);
  };

  const handleCancelAddIntent = (e) => {
    e.preventDefault();
    setIsAddIntent(false);
  };

  const handleCancelEditParameter = (e) => {
    e.preventDefault();
    setEditParameter(null);
  };

  const handleCancelEditIntent = (e) => {
    e.preventDefault();
    setEditIntent(null);
  };

  const handleAddParameter = (e) => {
    e.preventDefault();
    let newParameters = (item && item.parameters) || [];
    if (!loopInfo || !loopInfo.parameter) {
      enqueueSnackbar('Invalid slot value', {
        variant: 'warning',
      });
      return;
    }
    if (newParameters.indexOf(loopInfo.parameter) >= 0) {
      enqueueSnackbar('Slot value is duplicated', {
        variant: 'warning',
      });
      return;
    }
    newParameters = [...newParameters, loopInfo.parameter];
    handleChangeLoopInfo(actionId, 'parameters', newParameters);
    setIsAddParameter(false);
  };

  const handleAddIntent = (e) => {
    e.preventDefault();
    let newIntents = (item && item.intents) || [];
    if (!loopInfo || !loopInfo.intent) {
      enqueueSnackbar('Invalid slot value', {
        variant: 'warning',
      });
      return;
    }
    if (newIntents.indexOf(loopInfo.intent) >= 0) {
      enqueueSnackbar('Slot value is duplicated', {
        variant: 'warning',
      });
      return;
    }
    newIntents = [...newIntents, loopInfo.intent];
    handleChangeLoopInfo(actionId, 'intents', newIntents);
    setIsAddIntent(false);
  };

  const handleChange = (name) => (event, value) => {
    console.log({ name, value });
    setLoopInfo({
      ...loopInfo,
      [name]: value && value.id,
    });
  };

  const handlePrevEditIntent = (e, id) => {
    const newIntents = (item && item.intents) || [];

    console.log(newIntents[id]);
    setLoopInfo({
      ...loopInfo,
      intent: newIntents[id],
    });
    setEditIntent(id);
    setIsAddIntent(false);
  };
  const handleEditIntent = (id) => (e) => {
    e.preventDefault();
    const newIntents = (item && item.intents) || [];
    if (!loopInfo || !loopInfo.intent) {
      enqueueSnackbar('Invalid slot value', {
        variant: 'warning',
      });
      return;
    }
    const pos = newIntents.indexOf(loopInfo.intent);
    if (pos >= 0 && pos !== id) {
      enqueueSnackbar('Slot value is duplicated', {
        variant: 'warning',
      });
      return;
    }
    newIntents[id] = loopInfo.intent;
    handleChangeLoopInfo(actionId, 'intents', [...newIntents]);
    setEditIntent(null);
  };

  const handlePrevDeleteIntent = (e, id) => {
    const newIntents = (item && item.intents) || [];
    newIntents.splice(id, 1);
    handleChangeLoopInfo(actionId, 'intents', [...newIntents]);
    setEditIntent(null);
    setIsAddIntent(false);
  };

  const itemIntentMenus = [
    {
      heading: 'Edit',
      event: handlePrevEditIntent,
    },
    {
      heading: 'Delete',
      event: handlePrevDeleteIntent,
    },
  ];

  const handlePrevEditParameter = (e, id) => {
    const newParameters = (item && item.parameters) || [];
    setLoopInfo({
      ...loopInfo,
      parameter: newParameters[id],
    });
    setEditParameter(id);
    setIsAddParameter(false);
  };

  const handleEditParameter = (id) => (e) => {
    e.preventDefault();
    const newParameters = (item && item.parameters) || [];
    if (!loopInfo || !loopInfo.parameter) {
      enqueueSnackbar('Invalid slot value', {
        variant: 'warning',
      });
      return;
    }
    const pos = newParameters.indexOf(loopInfo.parameter);
    if (pos >= 0 && pos !== id) {
      enqueueSnackbar('Slot value is duplicated', {
        variant: 'warning',
      });
      return;
    }
    newParameters[id] = loopInfo.parameter;
    handleChangeLoopInfo(actionId, 'parameters', [...newParameters]);
    setEditParameter(null);
  };

  const handlePrevDeleteParameter = (e, id) => {
    const newParameters = (item && item.parameters) || [];
    newParameters.splice(id, 1);
    handleChangeLoopInfo(actionId, 'parameters', [...newParameters]);
    setEditParameter(null);
    setIsAddParameter(false);
  };

  const itemParameterMenus = [
    {
      heading: 'Edit',
      event: handlePrevEditParameter,
    },
    {
      heading: 'Delete',
      event: handlePrevDeleteParameter,
    },
  ];
  return (
    <>
      <Box display="flex">
        <Box display="flex" flexGrow={1}>
          <Box display="flex">
            <Box mr={0.5}>
              <LoopIcon />
            </Box>
            <Box ml={0.5}>
              <Typography variant="button" display="block" gutterBottom>
                Loop
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteLoop(actionId)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Box className={classes.box} mb={2} mt={2}>
        <Typography gutterBottom>Condition out loop</Typography>
        <Grid container spacing={3} className={classes.boxContent}>
          <Grid item xs={4} className={classes.alignCenterFlex}>
            <Box display="flex">
              <Box mr={1}>
                <Typography gutterBottom>Select intents</Typography>
              </Box>
              <Tooltip title="The user statements must contain all the declared intent set">
                <InfoIcon />
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <List dense={dense}>
              {item &&
                Array.isArray(item.intents) &&
                item.intents.map((el, index) => {
                  if (editIntent === index) {
                    return (
                      <Box className={classes.alignCenterFlex}>
                        <Autocomplete
                          fullWidth
                          options={intents}
                          getOptionLabel={(ele) => ele.name}
                          onChange={handleChange('intent')}
                          defaultValue={intents.find(
                            (ele) => ele.id === (loopInfo && loopInfo.intent),
                          )}
                          getOptionSelected={(option) => {
                            return option.id === (loopInfo && loopInfo.intent);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Intent"
                              variant="outlined"
                            />
                          )}
                        />
                        <Box display="flex" ml={1}>
                          <Box m={0.5}>
                            <Button
                              color="primary"
                              size="small"
                              onClick={handleEditIntent(index)}
                            >
                              Add
                            </Button>
                          </Box>
                          <Box m={0.5}>
                            <Button
                              color="primary"
                              size="small"
                              onClick={handleCancelEditIntent}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    );
                  }
                  const intent =
                    intents && intents.find((ele) => ele.id === el);
                  const name = (intent && intent.name) || '';
                  return (
                    <ListItem key={index}>
                      <ListItemText>{name}</ListItemText>
                      <ListItemSecondaryAction>
                        <MenuToggle
                          id={index}
                          icon={<MoreVertIcon />}
                          menus={itemIntentMenus}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
            </List>
            {isAddIntent ? (
              <Box className={classes.alignCenterFlex}>
                <Autocomplete
                  fullWidth
                  options={intents}
                  getOptionLabel={(el) => el.name}
                  onChange={handleChange('intent')}
                  getOptionSelected={(option) =>
                    option.id === (loopInfo && loopInfo.intent)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Intent" variant="outlined" />
                  )}
                />
                <Box display="flex" ml={1}>
                  <Box m={0.5}>
                    <Button
                      color="primary"
                      size="small"
                      onClick={handleAddIntent}
                    >
                      Add
                    </Button>
                  </Box>
                  <Box m={0.5}>
                    <Button
                      color="primary"
                      size="small"
                      onClick={handleCancelAddIntent}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Button
                color="primary"
                className={classes.btnAdd}
                onClick={handleOpenAddIntent}
              >
                <AddIcon />
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.boxContent}>
          <Grid item xs={4} className={classes.alignCenterFlex}>
            <Box display="flex">
              <Box mr={1}>
                <Typography gutterBottom>Select params</Typography>
              </Box>
              <Tooltip title="The user statements must contain all the declared parameters">
                <InfoIcon />
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <List dense={dense}>
              {item &&
                Array.isArray(item.parameters) &&
                item.parameters.map((el, index) => {
                  if (editParameter === index) {
                    return (
                      <Box className={classes.alignCenterFlex}>
                        <Autocomplete
                          fullWidth
                          options={parameters}
                          getOptionLabel={(ele) => ele.name}
                          onChange={handleChange('parameter')}
                          defaultValue={parameters.find(
                            (ele) =>
                              ele.id === (loopInfo && loopInfo.parameter),
                          )}
                          getOptionSelected={(option) =>
                            option.id === (loopInfo && loopInfo.parameter)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Parameter"
                              variant="outlined"
                            />
                          )}
                        />
                        <Box display="flex">
                          <Box m={0.5}>
                            <Button
                              color="primary"
                              size="small"
                              onClick={handleEditParameter(index)}
                            >
                              Add
                            </Button>
                          </Box>
                          <Box m={0.5}>
                            <Button
                              color="primary"
                              size="small"
                              onClick={handleCancelEditParameter}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    );
                  }
                  const param =
                    parameters && parameters.find((ele) => ele.id === el);
                  const name = (param && param.name) || '';
                  return (
                    <ListItem key={index}>
                      <ListItemText>{name}</ListItemText>
                      <ListItemSecondaryAction>
                        <MenuToggle
                          id={index}
                          icon={<MoreVertIcon />}
                          menus={itemParameterMenus}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
            </List>
            {isAddParameter ? (
              <Box className={classes.alignCenterFlex}>
                <Autocomplete
                  fullWidth
                  options={parameters}
                  getOptionLabel={(el) => el.name}
                  onChange={handleChange('parameter')}
                  getOptionSelected={(option) =>
                    option.id === (loopInfo && loopInfo.parameter)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Parameter"
                      variant="outlined"
                    />
                  )}
                />
                <Box display="flex">
                  <Box m={0.5}>
                    <Button
                      color="primary"
                      size="small"
                      onClick={handleAddParameter}
                    >
                      Add
                    </Button>
                  </Box>
                  <Box m={0.5}>
                    <Button
                      color="primary"
                      size="small"
                      onClick={handleCancelAddParameter}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Button
                color="primary"
                className={classes.btnAdd}
                onClick={handleOpenAddParameter}
              >
                <AddIcon />
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.box}>
        <Grid container spacing={3} className={classes.boxContent}>
          <Grid item xs={4} className={classes.alignCenterFlex}>
            <Typography gutterBottom>Action ask again</Typography>
          </Grid>
          <Grid item xs={8}>
            <Autocomplete
              fullWidth
              options={actions}
              getOptionLabel={(el) => el.name}
              onChange={(event, value) => {
                handleChangeLoopInfo(actionId, 'actionAskAgain', value.id);
              }}
              getOptionSelected={(option) =>
                option.id === (item && item.actionAskAgain)
              }
              renderInput={(params) => (
                <TextField {...params} label="Actions" variant="outlined" />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className={classes.boxContent}>
          <Grid item xs={4} className={classes.alignCenterFlex}>
            <Typography gutterBottom>Number repeat</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="outlined-number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              name="numberOfLoop"
              value={(item && item.numberOfLoop) || ''}
              onChange={(e) => {
                handleChangeLoopInfo(
                  actionId,
                  'numberOfLoop',
                  // eslint-disable-next-line radix
                  parseInt(e.target.value),
                );
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className={classes.boxContent}>
          <Grid item xs={4} className={classes.alignCenterFlex}>
            <Typography gutterBottom>Action when too number repeat</Typography>
          </Grid>
          <Grid item xs={8}>
            <Autocomplete
              fullWidth
              options={actions}
              getOptionLabel={(el) => el.name}
              onChange={(event, value) => {
                handleChangeLoopInfo(actionId, 'actionFail', value.id);
              }}
              getOptionSelected={(option) =>
                option.id === (item && item.actionFail)
              }
              renderInput={(params) => (
                <TextField {...params} label="Actions" variant="outlined" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ActionLoop;

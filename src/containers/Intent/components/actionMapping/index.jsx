import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, Switch } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './index.style';
import apis from '../../../../apis';

function ActionMapping(props) {
  const classes = useStyles();

  const {
    action,
    isMappingAction,
    handleChangeIsMappingAction,
    handleChangeAction,
  } = props;
  const [actions, setActions] = useState([]);

  const fetchActions = async () => {
    const { result } = await apis.action.getActions();
    if (result) {
      setActions(result.actions);
    }
  };

  useEffect(() => {
    fetchActions();
  }, []);

  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography variant="h6">Action Mapping</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h7">
          The MappingAction can be used to directly map intent to action such
          that the mapped action will always be executed
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Autocomplete
          onChange={(event, newValue) => {
            handleChangeAction(newValue);
          }}
          options={actions}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              placeholder="Enter action name"
              classes={{
                root: classes.textInput,
              }}
            />
          )}
          value={action || {}}
        />
      </Grid>
      <Grid item className={classes.gridItem}>
        <Switch
          checked={isMappingAction || false}
          onChange={handleChangeIsMappingAction}
        />
        <Typography variant="h7">Enable action mapping this intent</Typography>
      </Grid>
    </Grid>
  );
}

export default ActionMapping;

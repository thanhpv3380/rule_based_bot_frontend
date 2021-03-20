import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, Switch } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './index.style';
import apis from '../../../../apis';

function ActionMapping() {
  const classes = useStyles();

  const [actions, setActions] = useState([]);

  const fetchActions = async () => {
    const { result } = await apis.action.getActions();

    if (results) {
      setActions(results.actions);
    }
  };

  useEffect(() => {
    //fetchActions();
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
      <Grid item xs={12} style={{ marginTop: 5 }}>
        <Autocomplete
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
        />
      </Grid>
      <Grid item style={{ marginTop: 5 }}>
        <Switch />
        <Typography variant="h7">Enable action mapping this intent</Typography>
      </Grid>
    </Grid>
  );
}

export default ActionMapping;

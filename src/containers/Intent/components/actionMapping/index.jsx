import React from 'react';
import { Grid, TextField, Typography, Switch } from '@material-ui/core';
import useStyles from './index.style';

function ActionMapping() {
  const classes = useStyles();

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
        <TextField
          fullWidth
          id="outlined-basic"
          variant="outlined"
          placeholder="Enter action name"
          classes={{
            root: classes.textInput,
          }}
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

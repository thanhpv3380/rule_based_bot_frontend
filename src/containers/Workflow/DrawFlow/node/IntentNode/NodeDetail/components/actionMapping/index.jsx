import React from "react";
import { Grid, TextField, Typography, Switch } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useStyles from "./index.style";

function ActionMapping(props) {
  const classes = useStyles();
  const {} = props;

  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography variant="h6">Action Mapping</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          The MappingAction can be used to directly map intent to action such
          that the mapped action will always be executed
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Autocomplete
          style={{ backgroundColor: "#ffff", borderRadius: 10 }}
          options={[]}
          // getOptionLabel={(option) => (option ? option.name : '')}
          getOptionLabel={(option) => {
            return option.name;
          }}
          onChange={(event, newValue) => {
            // handleChangeAction(newValue);
          }}
          value={{ name: "" }}
          renderInput={(params) => (
            <TextField
              {...params}
              style={{ backgroundColor: "#ffff", borderRadius: 10 }}
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
      <Grid item className={classes.gridItem}>
        <Switch
        // checked={isMappingAction || false}
        // onChange={handleChangeIsMappingAction}
        />
        <Typography variant="subtitle1">
          Enable action mapping this intent
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ActionMapping;

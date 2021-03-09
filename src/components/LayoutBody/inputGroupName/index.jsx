import React, { useState } from 'react';
import { Grid, ListItemText, TextField } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './index.style';

function LayoutBody(props) {
  const { group, handleAcceptGroup, handleCloseInputGroup } = props;
  const classes = useStyles();
  const [groupName, setGroupName] = useState();
  const handleChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleClickAcceptGroup = (name) => {
    handleAcceptGroup(name, group);
    setGroupName('');
  };
  return (
    <ListItemText>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={11}>
          <TextField
            onChange={handleChange}
            fullWidth
            className={classes.inputItem}
          />
        </Grid>
        <Grid item xs={1}>
          <CheckIcon onClick={() => handleClickAcceptGroup(groupName)} />
          <CloseIcon onClick={handleCloseInputGroup} />
        </Grid>
      </Grid>
    </ListItemText>
  );
}

export default LayoutBody;

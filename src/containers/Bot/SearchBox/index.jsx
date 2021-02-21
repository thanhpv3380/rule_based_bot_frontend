import React from 'react';
import { Grid, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './index.style';

function SearchBox(props) {
  const classes = useStyles();
  const { handleOnChange } = props;
  return (
    <Grid item xs={6}>
      <TextField
        className={classes.margin}
        placeholder="search"
        id="input-with-icon-textfield"
        onChange={handleOnChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          classes: { underline: classes.underline },
        }}
      />
    </Grid>
  );
}

export default SearchBox;

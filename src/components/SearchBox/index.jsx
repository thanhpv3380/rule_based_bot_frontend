import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './index.style';

function SearchBox(props) {
  const classes = useStyles();
  const { handleOnChange, placeholder, isStartPositionIcon } = props;
  return (
    <div>
      {isStartPositionIcon ? (
        <TextField
          className={classes.margin}
          placeholder={placeholder}
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
      ) : (
        <TextField
          className={classes.margin}
          placeholder={placeholder}
          id="input-with-icon-textfield"
          onChange={handleOnChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
            classes: { underline: classes.underline },
          }}
        />
      )}
    </div>
  );
}

export default SearchBox;

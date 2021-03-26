import React from 'react';
import { TextField } from '@material-ui/core';
import textDefault from '../../../../constants/textDefault';

const RegexEntity = ({ item, handleChange }) => {
  return (
    <TextField
      id="outlined-basic"
      label={textDefault.REGEX_FUNCTION}
      variant="outlined"
      fullWidth
      value={item}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};
export default RegexEntity;
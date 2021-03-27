import React from 'react';
import { TextField, Box } from '@material-ui/core';
import textDefault from '../../../../constants/textDefault';

const RegexEntity = ({ item, handleChange }) => {
  return (
    <Box mt={3}>
      <TextField
        id="outlined-basic"
        label={textDefault.REGEX_FUNCTION}
        variant="outlined"
        fullWidth
        value={item}
        onChange={(e) => handleChange(e.target.value)}
      />
    </Box>
  );
};
export default RegexEntity;

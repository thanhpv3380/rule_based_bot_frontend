import React from 'react';
import { TextField } from '@material-ui/core';

const SearchBox = ({ handleSearch }) => {
  return (
    <TextField
      fullWidth
      id="outlined-basic"
      placeholder="Search"
      variant="outlined"
      size="small"
      onChange={handleSearch}
    />
  );
};
export default SearchBox;

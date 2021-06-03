import React from 'react';
import { TextField } from '@material-ui/core';

const SearchBox = ({ handleSearch, size = 'small' }) => {
  return (
    <TextField
      fullWidth
      placeholder="Search"
      variant="outlined"
      size={size}
      onChange={handleSearch}
    />
  );
};
export default SearchBox;

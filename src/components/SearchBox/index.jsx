import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchBox = ({ handleSearch }) => {
  return (
    <Search
      placeholder="type search text"
      onSearch={handleSearch}
      enterButton
      size="large"
    />
  );
};

export default SearchBox;

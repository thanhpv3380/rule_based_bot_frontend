import React from 'react';
import { Button, Box } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import SearchBox from './SearchBox';
import ListGroup from './ListGroup';

const LayoutListGroup = ({ title }) => {
  return (
    <>
      <SearchBox />
      <Box component="span" display="block" p={1} bgcolor="background.paper" />
      <Button startIcon={<AddIcon />} size="small">
        Add {title} or Group
      </Button>
      <ListGroup />
    </>
  );
};
export default LayoutListGroup;

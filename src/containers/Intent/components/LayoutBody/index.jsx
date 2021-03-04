import React from 'react';
import { Grid, Box } from '@material-ui/core';
import GroupIntent from './group';

function LayoutBody(props) {
  const {
    children,
    noneGroups,
    groups,
    handleSearch,
    handleClickGroup,
    handleClickIntent,
    handleCreateGroup,
    handleCreateIntent,
  } = props;
  
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <GroupIntent
            noneGroups={noneGroups}
            groups={groups}
            handleSearch={handleSearch}
            handleClickGroup={handleClickGroup}
            handleClickIntent={handleClickIntent}
            handleCreateGroup={handleCreateGroup}
            handleCreateIntent={handleCreateIntent}
          />
        </Grid>
        <Grid item xs={8}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}

export default LayoutBody;

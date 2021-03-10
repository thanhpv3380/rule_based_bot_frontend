import React from 'react';
import { Grid, Box } from '@material-ui/core';
import GroupIntent from './group';

function LayoutBody(props) {
  const {
    children,
    title,
    noneGroups,
    groups,
    handleSearch,
    handleClickGroup,
    handleClickIntent,
    handleCreateGroup,
    handleCreateItem,
  } = props;

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <GroupIntent
            title={title}
            noneGroups={noneGroups}
            groups={groups}
            handleSearch={handleSearch}
            handleClickGroup={handleClickGroup}
            handleClickIntent={handleClickIntent}
            handleCreateGroup={handleCreateGroup}
            handleCreateItem={handleCreateItem}
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

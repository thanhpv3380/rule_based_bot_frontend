import React from 'react';
import { Grid, Box } from '@material-ui/core';
import Group from './group';

function LayoutBody(props) {
  const {
    children,
    title,
    noneGroups,
    groups,
    handleSearch,
    handleClickGroup,
    handleClickItem,
    handleCreateGroup,
    handleCreateItem,
  } = props;

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Group
            title={title}
            noneGroups={noneGroups}
            groups={groups}
            handleSearch={handleSearch}
            handleClickGroup={handleClickGroup}
            handleClickItem={handleClickItem}
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

import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
} from '@material-ui/core';
import { List as ListIcon, Search as SearchIcon } from '@material-ui/icons';
import useStyles from './index.style';

function SearchBox({ keySearch, handleSearch, handleToggleModal }) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <ListIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          List Bot
        </Typography>
        <Button variant="contained" onClick={handleToggleModal}>
          Create
        </Button>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={keySearch}
            onChange={handleSearch}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default SearchBox;

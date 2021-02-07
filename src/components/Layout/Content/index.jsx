import React from 'react';
import { IconButton, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './index.style';

export default function Content({
  children,
  displaySideBar,
  handleSidebarToggle,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {displaySideBar && (
        <Hidden smDown>
          <IconButton
            onClick={handleSidebarToggle}
            className={classes.menuIcon}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      )}
      {children}
    </div>
  );
}

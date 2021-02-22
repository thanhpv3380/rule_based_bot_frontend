import React from 'react';
import { IconButton, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './index.style';

export default function Content({
  children,
  displaySideBar,
  handleSidebarToggle,
  isLayout,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {displaySideBar && isLayout &&(
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

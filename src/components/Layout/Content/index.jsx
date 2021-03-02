import React from 'react';
import { IconButton, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import useStyles from './index.style';

const Content = ({
  children,
  displaySideBar,
  handleSidebarToggle,
  isLayout,
  className,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {displaySideBar && isLayout && (
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
};

export default Content;

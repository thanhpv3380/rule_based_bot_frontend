import React from 'react';
import { IconButton, Hidden, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import useStyles from './index.style';
import LayoutListGroup from './LayoutListGroup';

const Content = ({
  children,
  displaySideBar,
  handleSidebarToggle,
  isLayout,
  className,
  isLayoutListGroup,
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

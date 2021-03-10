/* eslint-disable react/no-array-index-key */
import React from 'react';
import { IconButton, MenuItem, Menu } from '@material-ui/core';
import useStyles from './index.style';

const MenuToggle = ({ id, icon, menus }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        size="small"
      >
        {icon}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={open}
        onClose={handleClose}
      >
        {menus &&
          menus.map((menu, index) => (
            <MenuItem
              key={index}
              onClick={(e) => {
                handleClose(e);
                menu.event(e, id);
              }}
            >
              {menu.heading}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default MenuToggle;

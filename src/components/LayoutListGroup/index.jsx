import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Box,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Grid,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import SearchBox from '../SearchBox';
import GroupItem from './GroupItem';
import useStyles from './index.style';

const LayoutListGroup = ({ title, groupItems, handleOpenCreate, children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleOpenCreateSingle = () => {
    handleToggle();
    handleOpenCreate();
  };

  const handleOpenCreateGroup = () => {
    handleToggle();
    alert('create group');
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <>
          <SearchBox />
          <Box component="span" display="block" bgcolor="background.paper" />
          <div>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              startIcon={<AddIcon />}
            >
              Add {title} or group
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
              className={classes.popper}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleOpenCreateSingle}>
                          Create Action
                        </MenuItem>
                        <MenuItem onClick={handleOpenCreateGroup}>
                          Create Group
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          {groupItems.map((groupItem) => (
            <GroupItem groupItem={groupItem} />
          ))}
        </>
      </Grid>
      <Grid item xs={8}>
        {children}
      </Grid>
    </Grid>
  );
};
export default LayoutListGroup;

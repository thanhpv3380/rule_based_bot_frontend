import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Popper,
  IconButton,
  MenuItem,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
  LabelImportant as LabelImportantIcon,
} from '@material-ui/icons';
import useStyles from './index.style';

const GroupItem = ({ groupItem }) => {
  const classes = useStyles();
  const botId = useSelector((state) => state.bot.bot);
  const [expanded, setExpanded] = useState(false);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClickMore = (e) => {
    e.stopPropagation();
    handleToggle();
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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.moreIcon}>
            <IconButton
              aria-label="delete"
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              size="small"
              onClick={handleClickMore}
            >
              <MoreVertIcon />
            </IconButton>
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
                        <MenuItem>Add</MenuItem>
                        <MenuItem>Delete</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          <Typography className={classes.heading}>{groupItem.name}</Typography>
        </AccordionSummary>
        <AccordionDetails classes={classes.accordionDetails}>
          {groupItem.children.length >= 0 ? (
            <List
              component="nav"
              aria-label="main mailbox folders"
              className={classes.listItem}
            >
              {groupItem.children.map((el) => (
                <Link
                  to={`/bot/${botId}/actions/detail/${el.id}`}
                  className={classes.link}
                >
                  <ListItem button divider>
                    <ListItemIcon>
                      <LabelImportantIcon />
                    </ListItemIcon>
                    <ListItemText primary={el.name} />
                    <MoreVertIcon />
                  </ListItem>
                </Link>
              ))}
            </List>
          ) : (
            <div>no data</div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default GroupItem;

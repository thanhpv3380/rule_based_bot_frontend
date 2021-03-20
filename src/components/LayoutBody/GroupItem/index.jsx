/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {
  Card,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Menu,
  MenuItem,
  List,
} from '@material-ui/core';
import NotesIcon from '@material-ui/icons/Notes';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
// import CheckIcon from '@material-ui/icons/Check';
// import CloseIcon from '@material-ui/icons/Close';
import useStyles from './index.style';
import InputGroupName from '../inputGroupName';

function GroupItem(props) {
  const classes = useStyles();
  const {
    handleClickGroup,
    handleClickItem,
    group,
    handleOpenEditGroup,
    handleCloseOptionGroup,
    handleOpenOptionGroup,
    handleCloseEditGroup,
    handleUpdateGroupName,
    handleDeleteGroup,
    handleDeleteItem,
  } = props;

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseHover = () => {
    setIsHovering(!isHovering);
  };

  const handleClickOpenEditGroup = async (data) => {
    // await handleCloseOptionGroup(data);
    await handleOpenEditGroup(data);
  };

  return (
    <div>
      {!group.open ? (
        <ListItem className={classes.listItem} button>
          <ListItemIcon onClick={() => handleClickGroup(group)}>
            <ExpandMore />
          </ListItemIcon>
          {group.openEdit ? (
            <InputGroupName
              group={group}
              handleAcceptGroup={handleUpdateGroupName}
              handleCloseInputGroup={() => handleCloseEditGroup(group)}
            />
          ) : (
            <ListItemText
              primary={group.name}
              onClick={() => handleClickGroup(group)}
            />
          )}
          {!group.openEdit && (
            <MoreVertIcon onClick={(e) => handleOpenOptionGroup(e, group)} />
          )}
          <Menu
            anchorEl={group.openOption}
            keepMounted
            open={Boolean(group.openOption)}
            onClose={() => handleCloseOptionGroup(group)}
            classes={{ paper: classes.muiMenuPaper }}
            style={{
              top: 40,
              left: -50,
            }}
          >
            <MenuItem
              value={10}
              onClick={() => handleClickOpenEditGroup(group)}
            >
              Change name
            </MenuItem>
            <MenuItem value={20} onClick={() => handleDeleteGroup(group)}>
              delete
            </MenuItem>
          </Menu>
        </ListItem>
      ) : (
        <List className={classes.listRoot}>
          <ListItem
            className={classes.listItemNameGroup}
            button
            classes={{
              button: classes.button,
            }}
          >
            <ListItemIcon onClick={() => handleClickGroup(group)}>
              <ExpandLess />
            </ListItemIcon>
            {group.openEdit ? (
              <InputGroupName
                group={group}
                handleAcceptGroup={handleUpdateGroupName}
                handleCloseInputGroup={() => handleCloseEditGroup(group)}
              />
            ) : (
              <ListItemText
                primary={group.name}
                onClick={() => handleClickGroup(group)}
              />
            )}
            {!group.openEdit && (
              <MoreVertIcon onClick={(e) => handleOpenOptionGroup(e, group)} />
            )}
            <Menu
              anchorEl={group.openOption}
              keepMounted
              open={Boolean(group.openOption)}
              onClose={() => handleCloseOptionGroup(group)}
              classes={{ paper: classes.muiMenuPaper }}
              style={{
                top: 40,
                left: -50,
              }}
            >
              <MenuItem
                value={10}
                onClick={() => handleClickOpenEditGroup(group)}
              >
                Change name
              </MenuItem>
              <MenuItem value={20} onClick={() => handleDeleteGroup(group)}>
                delete
              </MenuItem>
            </Menu>
          </ListItem>
          <Divider className={classes.divider} />
          <Collapse in={group.open} timeout="auto" unmountOnExit>
            {group.children.map((item) => {
              return (
                <Card className={classes.groupRoot} elevation={5}>
                  <ListItem
                    button
                    onClick={() => handleClickItem(item)}
                    onMouseEnter={handleMouseHover}
                    onMouseLeave={handleMouseHover}
                  >
                    <ListItemIcon>
                      <NotesIcon />
                    </ListItemIcon>

                    <ListItemText primary={item.name} />
                    {isHovering && (
                      <DeleteIcon
                        onClick={() => handleDeleteItem(item.id, group)}
                      />
                    )}
                  </ListItem>
                </Card>
              );
            })}
          </Collapse>
        </List>
      )}
    </div>
  );
}

export default GroupItem;

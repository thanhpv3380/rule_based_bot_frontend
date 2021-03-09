/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Card,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  // Select,
  Link,
  Menu,
  MenuItem,
  // ListItemSecondaryAction,
  // Button,
  List,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NotesIcon from '@material-ui/icons/Notes';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './index.style';

function Group(props) {
  const classes = useStyles();
  const {
    title,
    handleClickGroup,
    handleClickItem,
    handleSearch,
    noneGroups,
    groups,
    handleCreateGroup,
    handleCreateItem,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  // const [openOptionEdit, setOpenOptionEdit] = React.useState(null);

  // const handleOpenOptionEdit = (e) => {
  //   setOpenOptionEdit(e.currentTarget);
  // };

  // const handleCloseOptionEdit = () => {
  //   setOpenOptionEdit(null);
  // };

  const [nameGroup, setNameGroup] = React.useState();

  const handleChangeNameGroupCreate = (e) => {
    const { value } = e.target;
    setNameGroup(value);
  };

  const handleClickOption = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseOption = () => {
    setAnchorEl(null);
  };

  const handleOpenCreateGroup = () => {
    setOpenCreateGroup(true);
    handleCloseOption();
  };

  const handleCloseCreateGroup = () => {
    setOpenCreateGroup(false);
  };

  const handleClickCreateGroup = async (name) => {
    await handleCreateGroup(name);
    handleCloseCreateGroup();
  };

  const handleClickCreateItem = async () => {
    handleCreateItem();
    handleCloseOption();
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="search"
        classes={{
          root: classes.textSearch,
        }}
        onChange={handleSearch}
      />
      <Link
        className={classes.link}
        component="button"
        variant="subtitle1"
        color="inherit"
      >
        <Grid item container direction="row">
          <Grid item>
            <AddIcon onClick={handleClickOption} />
          </Grid>
          <Grid item>
            <Typography onClick={handleClickOption}>
              Add intent or group
            </Typography>
          </Grid>
        </Grid>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseOption}
          classes={{ paper: classes.muiMenuPaper }}
          // className={classes.muiMenu}
          style={{
            top: 40,
            left: 70,
          }}
        >
          <MenuItem value={10} onClick={handleClickCreateItem}>
            Create intent
          </MenuItem>
          <MenuItem value={20} onClick={handleOpenCreateGroup}>
            Create group
          </MenuItem>
        </Menu>
      </Link>
      {openCreateGroup && (
        <ListItem
          className={classes.listItem}
          button
          // onClick={() => handleClickGroup(group)}
        >
          <ListItemIcon>
            <ExpandMore />
          </ListItemIcon>
          <ListItemText>
            <Grid container spacing={2} className={classes.gridItemAddGroup}>
              <Grid item xs={11}>
                <TextField
                  onChange={handleChangeNameGroupCreate}
                  fullWidth
                  className={classes.textAddGroup}
                />
              </Grid>
              <Grid item xs={1}>
                <CheckIcon onClick={() => handleClickCreateGroup(nameGroup)} />
                <CloseIcon onClick={handleCloseCreateGroup} />
              </Grid>
            </Grid>
          </ListItemText>
        </ListItem>
      )}

      {noneGroups &&
        noneGroups.map((noneGroup) => (
          // <Link href={`/intents/${noneGroup.id}`}>
          <Card
            className={classes.groupRoot}
            elevation={5}
            // onClick={() => handleClickIntent(noneGroup.intents)}
          >
            <ListItem button onClick={handleClickItem}>
              <ListItemIcon>
                <NotesIcon />
              </ListItemIcon>
              <ListItemText
                primary={noneGroup.intents && noneGroup[title][0].name}
              />
            </ListItem>
          </Card>
          // </Link>
        ))}
      {groups &&
        groups.map((group) => {
          if (!group.open) {
            return (
              <ListItem
                className={classes.listItem}
                button
                onClick={() => handleClickGroup(group)}
              >
                <ListItemIcon>
                  <ExpandMore />
                </ListItemIcon>
                <ListItemText primary={group.name} />
                <MoreVertIcon />
              </ListItem>
            );
          }
          return (
            <List className={classes.listRoot}>
              <ListItem
                className={classes.listItemNameGroup}
                button
                classes={{
                  button: classes.button,
                }}
                onClick={() => handleClickGroup(group)}
              >
                <ListItemIcon>
                  <ExpandLess />
                </ListItemIcon>
                <ListItemText primary={group.name} />
                <MoreVertIcon />
              </ListItem>
              <Divider className={classes.divider} />
              <Collapse in={group.open} timeout="auto" unmountOnExit>
                {group[title].map((item) => {
                  return (
                    // <Link to={`/${}/${intent.id}`}>
                    <Card className={classes.groupRoot} elevation={5}>
                      <ListItem button onClick={() => handleClickItem(item)}>
                        <ListItemIcon>
                          <NotesIcon />
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItem>
                    </Card>
                    // </Link>
                  );
                })}
              </Collapse>
            </List>
          );
        })}
    </div>
  );
}

export default Group;

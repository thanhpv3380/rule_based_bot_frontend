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
  List, // TODO lucs đâof ko có
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
    // children,
    handleClickGroup,
    handleClickIntent,
    handleSearch,
    noneGroups,
    groups,
    handleCreateGroup,
    handleCreate,
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
    setAnchorEl(null);
  };

  const handleCloseCreateGroup = () => {
    setOpenCreateGroup(false);
  };

  const handleClickCreateGroup = async (name) => {
    await handleCreateGroup(name);
    handleCloseCreateGroup();
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
        style={{ margin: 10 }}
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
          <MenuItem value={10} onClick={handleCreate}>
            Create intent
          </MenuItem>
          <MenuItem value={20} onClick={handleOpenCreateGroup}>
            Create group
          </MenuItem>
        </Menu>
      </Link>
      {openCreateGroup && (
        <ListItem
          style={{
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: 5,
            width: '100%',
            margin: '20px 10px 10px 0px',
            height: 60,
          }}
          button
          // onClick={() => handleClickGroup(group)}
        >
          <ListItemIcon>
            <ExpandMore />
          </ListItemIcon>
          <ListItemText>
            <Grid container spacing={2} style={{ marginTop: '0.5%' }}>
              <Grid item xs={11}>
                <TextField
                  onChange={handleChangeNameGroupCreate}
                  fullWidth
                  style={{ marginTop: '3%' }}
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
          <Card
            className={classes.groupRoot}
            elevation={5}
            onClick={() => handleClickIntent(noneGroup.intens)} // TODO chỗ này chưa biết sửa ntn
          >
            <ListItem button>
              <ListItemIcon>
                <NotesIcon />
              </ListItemIcon>
              <ListItemText primary={noneGroup.intens[0].name} />
            </ListItem>
          </Card>
        ))}

      <Card className={classes.groupRoot} elevation={5}>
        <ListItem button>
          <ListItemIcon>
            <NotesIcon />
          </ListItemIcon>
          <ListItemText primary="test" />
        </ListItem>
      </Card>
      {groups &&
        groups.map((group) => {
          if (!group.open) {
            return (
              <ListItem
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  borderRadius: 5,
                  width: '99%',
                  margin: '20px 0px 10px 0px',
                  height: 60,
                  background: '#f5f5f5',
                }}
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
            <List
              style={{
                border: '1px solid rgb(0 0 0 / 23%)',
                borderRadius: 5,
                margin: '20px 0px 10px 0px',
                background: '#f5f5f5',
              }}
            >
              <ListItem
                style={{ height: 42 }}
                button
                classes={{
                  button: classes.button,
                }}
                onClick={() => handleClickGroup(group)}
              >
                <ListItemIcon>
                  <ExpandLess />
                </ListItemIcon>
                <ListItemText primary="tên group" />
                <MoreVertIcon />
              </ListItem>
              <Divider style={{ margin: '8px 16px 0px 16px' }} />
              <Collapse in={group.open} timeout="auto" unmountOnExit>
                {group.intents.map((intent) => {
                  return (
                    <Card className={classes.groupRoot} elevation={5}>
                      <ListItem button>
                        <ListItemIcon>
                          <NotesIcon />
                        </ListItemIcon>
                        <ListItemText primary={intent.name} />
                      </ListItem>
                    </Card>
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

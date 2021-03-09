import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Box,
  TextField,
  Button,
  Menu,
  Typography,
  ListItem,
  MenuItem,
  ListItemIcon,
  Card,
  ListItemText,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NotesIcon from '@material-ui/icons/Notes';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './index.style';
import GroupItem from './GroupItem';
import InputGroupName from './inputGroupName';

function LayoutBody(props) {
  const {
    children,
    title,
    noneGroups,
    groups,
    handleSearch,
    handleClickGroup,
    handleCreateGroup,
    handleCreateItem,
    handleOpenEditGroup,
    handleCloseOptionGroup,
    handleOpenOptionGroup,
    handleCloseEditGroup,
    handleUpdateGroupName,
    handleDeleteGroup,
  } = props;
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  // const [isHovering, setIsHovering] = useState(false);
  // const [nameGroup, setNameGroup] = React.useState();

  // const handleMouseHover = () => {
  //   setIsHovering(!isHovering);
  // };

  // const handleChangeNameGroupCreate = (e) => {
  //   const { value } = e.target;
  //   setNameGroup(value);
  // };

  const handleClickItem = (data) => {
    history.push(`/${title}/detail/${data.id}`);
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
    const open = await handleCreateGroup(name);
    setOpenCreateGroup(open);
  };

  const handleClickCreateItem = async () => {
    handleCreateItem();
    handleCloseOption();
  };
  console.log(noneGroups);
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="search"
            classes={{
              root: classes.textSearch,
            }}
            onChange={handleSearch}
          />
          <Button
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
                  Add {title} or group
                </Typography>
              </Grid>
            </Grid>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseOption}
              classes={{ paper: classes.muiMenuPaper }}
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
          </Button>
          {openCreateGroup && (
            <ListItem className={classes.listItem} button>
              <ListItemIcon>
                <ExpandMore />
              </ListItemIcon>
              <InputGroupName
                handleAcceptGroup={handleClickCreateGroup}
                handleCloseInputGroup={handleCloseCreateGroup}
              />
            </ListItem>
          )}
          {noneGroups &&
            noneGroups[title] &&
            noneGroups[title].map((item) => (
              <Card className={classes.groupRoot} elevation={5}>
                <ListItem button>
                  <ListItemIcon onClick={() => handleClickItem(item)}>
                    <NotesIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item && item.name}
                    onClick={() => handleClickItem(item)}
                  />
                  <DeleteIcon />
                </ListItem>
              </Card>
            ))}
          {groups &&
            groups.map((group) => (
              <GroupItem
                title={title}
                handleClickGroup={handleClickGroup}
                handleClickItem={handleClickItem}
                group={group}
                handleOpenEditGroup={handleOpenEditGroup}
                handleCloseOptionGroup={handleCloseOptionGroup}
                handleOpenOptionGroup={handleOpenOptionGroup}
                handleCloseEditGroup={handleCloseEditGroup}
                handleUpdateGroupName={handleUpdateGroupName}
                handleDeleteGroup={handleDeleteGroup}
              />
            ))}
        </Grid>
        <Grid item xs={8}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}

export default LayoutBody;

import React, { useState, useEffect } from 'react';
import {
  Card,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  TablePagination,
} from '@material-ui/core';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
  Notes as NotesIcon,
} from '@material-ui/icons';

import MenuToggle from '../../MenuToggle';
import useStyles from './index.style';

const GroupItem = ({
  groupItem,
  itemSelected,
  handleChangeNameGroup,
  handleAddItem,
  handleDeleteGroup,
  handleDeleteItem,
  handleToggleClickGroup,
  handleClickItem,
}) => {
  const classes = useStyles();
  const [hoveringItemId, setHoveringItemId] = useState();
  const [isChange, setIsChange] = useState(false);
  const [nameGroup, setNameGroup] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    count: 100,
  });

  const handleToggleHover = (id) => {
    setHoveringItemId(id);
  };

  const handleChangePage = async (event, newPage) => {
    setPagination({
      ...pagination,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({
      ...pagination,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      count: groupItem.children.length,
    });
  }, [groupItem.children.length]);

  const handleToggleGroup = (e) => {
    e.stopPropagation();
    setIsChange((prev) => !prev);
  };

  const handleUpdateChangeNameGroup = async (e) => {
    e.stopPropagation();
    await handleChangeNameGroup(groupItem.id, nameGroup);
    handleToggleGroup(e);
  };

  const handleAddItemInGroup = (e, id) => {
    e.stopPropagation();
    handleAddItem(id);
  };

  const handleChangeName = (e) => {
    e.stopPropagation();
    setNameGroup(groupItem.name);
    setIsChange(true);
  };

  const handlePrevDeleteGroup = (e, id) => {
    e.stopPropagation();
    handleDeleteGroup(id);
  };

  const handlePrevDeleteItem = (e, id) => {
    e.stopPropagation();
    handleDeleteItem(groupItem.id, id);
  };

  const groupMenus = [
    {
      heading: 'Add',
      event: handleAddItemInGroup,
    },
    {
      heading: 'Change Name',
      event: handleChangeName,
    },
    {
      heading: 'Delete',
      event: handlePrevDeleteGroup,
      isHidden: groupItem.children.length > 0,
    },
  ];

  const itemMenus = [
    {
      heading: 'Delete',
      event: handlePrevDeleteItem,
    },
  ];

  return (
    <div>
      {isChange ? (
        <List
          className={
            groupItem.groupType !== 1
              ? classes.listRoot
              : classes.listRootSystem
          }
        >
          <ListItem
            className={classes.listItemNameGroup}
            classes={{
              button: classes.button,
            }}
          >
            <ListItemText>
              <TextField
                fullWidth
                id="outlined-basic"
                placeholder="Name Group"
                size="small"
                value={nameGroup}
                onChange={(e) => setNameGroup(e.target.value)}
              />
            </ListItemText>
            <IconButton
              aria-label="edit"
              size="small"
              onClick={handleUpdateChangeNameGroup}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              aria-label="close"
              size="small"
              onClick={handleToggleGroup}
            >
              <CloseIcon />
            </IconButton>
          </ListItem>
        </List>
      ) : (
        <List
          className={
            groupItem.groupType !== 1
              ? classes.listRoot
              : classes.listRootSystem
          }
        >
          <ListItem
            className={classes.listItemNameGroup}
            // classes={{
            //   button: classes.button,
            // }}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleClickGroup(groupItem.id);
            }}
          >
            <ListItemIcon>
              {groupItem.status ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemIcon>
            <ListItemText primary={groupItem.name} />
            <MenuToggle
              id={groupItem.id}
              icon={<MoreVertIcon />}
              menus={groupMenus}
            />
          </ListItem>
          {groupItem.status && groupItem.children.length > 0 && (
            <>
              <Divider className={classes.divider} />
              <Collapse in={groupItem.status} timeout="auto" unmountOnExit>
                {groupItem.children
                  .slice(
                    pagination.rowsPerPage * pagination.page,
                    pagination.rowsPerPage * pagination.page +
                      pagination.rowsPerPage,
                  )
                  .map((item) => (
                    <Card
                      key={item.id}
                      className={[
                        classes.groupRoot,
                        itemSelected === item.id && classes.itemSelected,
                      ]}
                      elevation={5}
                    >
                      <ListItem
                        onClick={() => handleClickItem(item.id)}
                        onMouseEnter={() => handleToggleHover(item.id)}
                        onMouseLeave={() => handleToggleHover()}
                      >
                        <ListItemIcon>
                          <NotesIcon />
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                        {hoveringItemId === item.id && (
                          <MenuToggle
                            id={item.id}
                            icon={<MoreVertIcon />}
                            menus={itemMenus}
                          />
                        )}
                      </ListItem>
                    </Card>
                  ))}
                <TablePagination
                  component="div"
                  rowsPerPageOptions={[5]}
                  count={pagination.count}
                  page={pagination.page}
                  rowsPerPage={pagination.rowsPerPage}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Collapse>
            </>
          )}
        </List>
      )}
    </div>
  );
};

export default GroupItem;

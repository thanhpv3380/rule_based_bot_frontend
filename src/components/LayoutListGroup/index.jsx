import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
  TablePagination,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import SearchBox from '../SearchBox';
import GroupItem from './GroupItem';
import GroupSingleItem from './GroupSingleItem';
import CreateGroupItem from './CreateGroupItem';
import useStyles from './index.style';

const LayoutListGroup = ({
  title,
  groupItems,
  handleSearch,
  handleCreateItem,
  handleDeleteItem,
  handleCreateGroup,
  handleChangeNameGroup,
  handleDeleteGroup,
  handleAddItemInGroup,
  handleToggleGroup,
  handleClickItem,
  children,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isCreateGroup, setIsCreateGroup] = useState(false);
  const [open, setOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState();
  const [groupsSingle, setGroupsSingle] = useState({
    data: [],
    start: 0,
    end: 0,
  });
  const [groups, setGroups] = useState({
    data: [],
    start: 0,
    end: 0,
  });
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    count: 100,
  });
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

  const calcPagination = (newGroups, newGroupsSingle) => {
    const start = pagination.page * pagination.rowsPerPage;
    const end = start + pagination.rowsPerPage;
    let startGroupSingle = 0;
    let endGroupSingle = 0;
    let startGroup = 0;
    let endGroup = 0;

    const groupSingleLength =
      (newGroupsSingle[0] &&
        newGroupsSingle[0].children &&
        newGroupsSingle[0].children.length) ||
      0;
    const groupLength = (newGroups && newGroups.length) || 0;

    if (groupSingleLength > start) {
      startGroupSingle = start;
      if (groupSingleLength > end) {
        endGroupSingle = end;
      } else {
        endGroupSingle = groupSingleLength;
        endGroup =
          groupLength > end - endGroupSingle
            ? end - endGroupSingle
            : groupLength;
      }
    } else {
      startGroup = start - groupSingleLength;
      endGroup =
        groupLength > startGroup + pagination.rowsPerPage
          ? startGroup + pagination.rowsPerPage
          : groupLength;
    }
    return {
      startGroupSingle,
      endGroupSingle,
      startGroup,
      endGroup,
    };
  };

  useEffect(() => {
    const {
      startGroupSingle,
      endGroupSingle,
      startGroup,
      endGroup,
    } = calcPagination(groups.data, groupsSingle.data);

    setGroupsSingle({
      ...groupsSingle,
      start: startGroupSingle,
      end: endGroupSingle,
    });
    setGroups({
      ...groups,
      start: startGroup,
      end: endGroup,
    });
  }, [pagination.page]);

  useEffect(() => {
    const newGroups = groupItems.filter((el) => el.groupType <= 2);
    const newGroupsSingle = groupItems.filter((el) => el.groupType === 3);
    const {
      startGroupSingle,
      endGroupSingle,
      startGroup,
      endGroup,
    } = calcPagination(newGroups, newGroupsSingle);
    setGroupsSingle({
      ...groupsSingle,
      data: newGroupsSingle,
      start: startGroupSingle,
      end: endGroupSingle,
    });
    setGroups({
      ...groups,
      data: newGroups,
      start: startGroup,
      end: endGroup,
    });
    setPagination({
      ...pagination,
      count:
        (newGroupsSingle[0] &&
          newGroupsSingle[0].children &&
          newGroupsSingle[0].children.length) + newGroups.length,
    });
  }, [groupItems]);

  useEffect(() => {
    const listUrl = window.location.href.split('/');
    const itemId = listUrl[listUrl.length - 1];
    setItemSelected(itemId);
  }, [window.location.href]);

  const handleToggleCreateGroup = () => {
    setIsCreateGroup((prev) => !prev);
  };

  const handleOpenCreateSingle = () => {
    handleToggle();
    handleCreateItem();
  };

  const handleOpenCreateGroup = () => {
    handleToggle();
    setIsCreateGroup(true);
  };

  const handlePrevCreateGroup = async (name) => {
    await handleCreateGroup(name);
    setIsCreateGroup((prev) => !prev);
  };

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} md={4} lg={4} xl={4}>
        <>
          <SearchBox handleSearch={handleSearch} size="medium" />
          <Box component="span" display="block" bgcolor="background.paper" />
          <div>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              startIcon={<AddIcon />}
            >
              {t(`add_${title}_or_group`)}
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
                          {t(`create_${title}`)}
                        </MenuItem>
                        <MenuItem onClick={handleOpenCreateGroup}>
                          {t('create_group')}
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          {isCreateGroup && (
            <CreateGroupItem
              handleCreateGroup={handlePrevCreateGroup}
              handleToggleCreateGroup={handleToggleCreateGroup}
            />
          )}
          {groupsSingle &&
            groupsSingle.data &&
            groupsSingle.data.map((groupItem) => (
              <GroupSingleItem
                pagination={groupsSingle}
                groupItem={groupItem}
                itemSelected={itemSelected}
                key={groupItem.id}
                handleDeleteItem={handleDeleteItem}
                handleClickItem={handleClickItem}
              />
            ))}
          {groups &&
            groups.data &&
            groups.data
              .slice(groups.start, groups.end)
              .map((groupItem) => (
                <GroupItem
                  groupItem={groupItem}
                  itemSelected={itemSelected}
                  key={groupItem.id}
                  handleChangeNameGroup={handleChangeNameGroup}
                  handleDeleteItem={handleDeleteItem}
                  handleDeleteGroup={handleDeleteGroup}
                  handleAddItem={handleAddItemInGroup}
                  handleToggleClickGroup={handleToggleGroup}
                  handleClickItem={handleClickItem}
                />
              ))}
          <TablePagination
            component="div"
            rowsPerPageOptions={[5]}
            count={pagination.count || 0}
            page={pagination.page}
            rowsPerPage={pagination.rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      </Grid>
      <Grid container item xs={12} md={8} lg={8} xl={8}>
        <Paper className={classes.children}>{children}</Paper>
      </Grid>
    </Grid>
  );
};
export default LayoutListGroup;

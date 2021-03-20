/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import apis from '../../apis';
import routes from '../../constants/route';
import textDefault from '../../constants/textDefault';
import groupConstant from '../../constants/group';
import LayoutBody from '../../components/LayoutBody';
import EmptyPage from '../../components/EmptyPage';
import DetailIntent from './DetailIntent';
import CreateIntent from './CreateIntent';

const Intent = () => {
  // const classes = useStyles();
  const history = useHistory();
  const botId = useSelector((state) => state.bot.bot);
  const { enqueueSnackbar } = useSnackbar();
  const [searchKey, setSearchKey] = useState();
  const [singleGroups, setSingleGroup] = useState();
  const [groups, setGroups] = useState();

  const fetchGroupIntents = async (keyword) => {
    const data = await apis.groupIntent.getGroupAndItems({ keyword });
    if (data && data.status) {
      const { result } = data;
      const singleGroup = result.groupIntents.find(
        (el) => el.groupType === groupConstant.GROUP_SINGLE,
      );
      const groupsFound = result.groupIntents
        .filter((el) => el.groupType === groupConstant.GROUP)
        .map((el) => ({
          ...el,
          open: false,
        }));
      setSingleGroup(singleGroup);
      setGroups(groupsFound);
    } else {
      enqueueSnackbar(textDefault.FETCH_DATA_FAILED, {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchGroupIntents();
  }, []);

  const handleSearchIntent = async (e) => {
    const { value } = e.target;
    setSearchKey(value);
    fetchGroupIntents(value);
  };

  const handleClickGroup = (data) => {
    const newGroups = [...groups];
    const pos = newGroups.findIndex((el) => el.id === data.id);
    if (newGroups[pos].children && newGroups[pos].children.length !== 0) {
      newGroups[pos] = {
        ...newGroups[pos],
        open: !newGroups[pos].open,
      };
    }
    setGroups(newGroups);
  };

  const handleOpenEditGroup = (data) => {
    const newGroups = [...groups];
    const pos = newGroups.findIndex((item) => item.id === data.id);
    newGroups[pos] = {
      ...newGroups[pos],
      openEdit: true,
      openOption: null,
    };
    setGroups(newGroups);
  };

  const handleCloseEditGroup = (data) => {
    const newGroups = [...groups];
    const pos = newGroups.findIndex((item) => item.id === data.id);
    newGroups[pos] = {
      ...newGroups[pos],
      openEdit: false,
    };

    setGroups(newGroups);
  };

  const handleCreateGroup = async (name) => {
    if (!name || !name.trim()) {
      enqueueSnackbar('Name cannot be empty', {
        variant: 'warning',
      });
      return true;
    }
    const data = await apis.groupIntent.createGroupIntent({ name });
    if (!data.status) {
      enqueueSnackbar('Create group failed', {
        variant: 'warning',
      });
      return true;
    }
    const newGroups = [...groups];
    newGroups.unshift({ ...data.result.groupIntent, open: false });
    setGroups(newGroups);
    return false;
  };

  const handleCreateIntent = () => {
    history.push(`/bot/${botId}/intents/createIntent`);
  };

  const handleOpenOptionGroup = (e, data) => {
    const newGroups = [...groups];
    const pos = newGroups.findIndex((item) => item.id === data.id);
    newGroups[pos] = {
      ...newGroups[pos],
      openOption: e.currentTarget,
    };
    setGroups(newGroups);
  };

  const handleCloseOptionGroup = (data) => {
    const newGroups = [...groups];
    const pos = newGroups.findIndex((item) => item.id === data.id);
    newGroups[pos] = {
      ...newGroups[pos],
      openOption: null,
    };
    setGroups(newGroups);
  };

  const handleUpdateGroupName = async (groupName, group) => {
    const data = await apis.groupIntent.updateGroupIntent(group.id, {
      name: groupName,
    });
    if (data.status) {
      const newGroups = [...groups];
      const pos = newGroups.findIndex((item) => item.id === group.id);
      newGroups[pos] = {
        ...newGroups[pos],
        name: groupName,
        openEdit: false,
      };
      setGroups(newGroups);
    } else {
      enqueueSnackbar('Update group name failed', {
        variant: 'warning',
      });
    }
  };

  const handleDeleteGroup = async (group) => {
    const data = await apis.groupIntent.deleteGroupIntent(group.id);
    if (data.status) {
      const newGroup = groups.filter((item) => item.id !== group.id);
      setGroups(newGroup);
    } else {
      enqueueSnackbar('Delete group failed', {
        variant: 'warning',
      });
    }
  };

  const handleDeleteIntent = async (id, group) => {
    const data = await apis.intent.deleteIntent(id);
    if (data.status) {
      const newGroups = [...groups];
      const pos = newGroups.findIndex((el) => el.id === group.id);
      const newItems = newGroups[pos].children.filter((el) => el.id !== id);
      newGroups[pos].children = newItems;
      setGroups(newGroups);
    } else {
      enqueueSnackbar('Delete item failed', {
        variant: 'warning',
      });
    }
  };

  return (
    <LayoutBody
      title={textDefault.INTENTS.INTENTS_TITLE}
      singleGroups={singleGroups}
      groups={groups}
      handleClickGroup={handleClickGroup}
      handleCreateGroup={handleCreateGroup}
      handleCreateItem={handleCreateIntent}
      handleSearch={handleSearchIntent}
      handleOpenEditGroup={handleOpenEditGroup}
      handleOpenOptionGroup={handleOpenOptionGroup}
      handleCloseOptionGroup={handleCloseOptionGroup}
      handleCloseEditGroup={handleCloseEditGroup}
      handleUpdateGroupName={handleUpdateGroupName}
      handleDeleteGroup={handleDeleteGroup}
      handleDeleteItem={handleDeleteIntent}
    >
      <Route
        exact
        path={routes.INTENT_BOT.CREATE_INTENT}
        component={CreateIntent}
      />
      <Route
        exact
        path={routes.INTENT_BOT.DETAIL_INTENT}
        component={DetailIntent}
      />
      <Route exact path={routes.INTENT_BOT.INTENT} component={EmptyPage} />
    </LayoutBody>
  );
};

export default Intent;

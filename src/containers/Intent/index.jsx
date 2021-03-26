/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import apis from '../../apis';
import routes from '../../constants/route';
import textDefault from '../../constants/textDefault';
import LayoutListGroup from '../../components/LayoutListGroup';
import EmptyPage from '../../components/EmptyPage';
import DetailIntent from './DetailIntent';
import CreateIntent from './CreateIntent';

let timeOutId = null;

const Intent = () => {
  const { t } = useTranslation();
  const match = useRouteMatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const botId = useSelector((state) => state.bot.bot);
  // eslint-disable-next-line no-unused-vars
  const [searchKey, setSearchKey] = useState();
  const [groupIdSelected, setGroupIdSelected] = useState(null);
  const [groupAndItems, setGroupAndItems] = useState([]);

  const fetchGroupAndItems = async (keyword) => {
    const data = await apis.groupIntent.getGroupAndItems({ keyword });
    if (data.status) {
      setGroupAndItems(data.result.groupIntents);
    } else {
      enqueueSnackbar(textDefault.FETCH_DATA_FAILED, {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchGroupAndItems();
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchKey(value);
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => fetchGroupAndItems(value), 500);
  };

  const handleOpenCreateItem = (id) => {
    setGroupIdSelected(id || null);
    history.push(`${match.url}/create`);
  };

  const handleCreateItem = (data) => {
    const newGroupAndItems = [...groupAndItems];
    const pos = newGroupAndItems.findIndex((el) => el.id === data.groupIntent);
    newGroupAndItems[pos].children.unshift({
      id: data.id,
      name: data.name,
      groupIntent: data.groupIntent,
      // intents: data.actions,
    });
    newGroupAndItems[pos].status = true;
    setGroupAndItems(newGroupAndItems);
    history.push(`/bot/${botId}/intents/detail/${data.id}`);
  };

  const handleUpdateItem = (data, oldGroupAction) => {
    const newGroupAndItems = [...groupAndItems];
    const intentData = {
      id: data.id,
      name: data.name,
      groupIntent: data.groupIntent,
      actions: data.actions,
    };
    const pos = newGroupAndItems.findIndex((el) => el.id === data.groupIntent);
    newGroupAndItems[pos].status = true;
    const childrenPos = newGroupAndItems[pos].children.findIndex(
      (el) => el.id === data.id,
    );
    if (childrenPos < 0) {
      const tempPos = newGroupAndItems.findIndex(
        (el) => el.id === oldGroupAction,
      );
      const newItems = newGroupAndItems[tempPos].children.filter(
        (el) => el.id !== data.id,
      );
      newGroupAndItems[tempPos] = {
        ...newGroupAndItems[tempPos],
        children: [...newItems],
      };
      newGroupAndItems[pos].children.unshift(intentData);
    } else {
      newGroupAndItems[pos].children[childrenPos] = intentData;
    }
    setGroupAndItems(newGroupAndItems);
  };

  const handleCreateGroup = async (value) => {
    const data = await apis.groupIntent.createGroupIntent({ name: value });
    if (data.status) {
      const newGroupAndItems = [...groupAndItems];
      newGroupAndItems.unshift({
        ...data.result.groupIntent,
        children: [],
      });
      setGroupAndItems(newGroupAndItems);
      enqueueSnackbar(textDefault.CREATE_SUCCESS, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(textDefault.CREATE_FAILED, {
        variant: 'error',
      });
    }
  };

  const handleChangeNameGroup = async (groupId, value) => {
    const data = await apis.groupIntent.updateGroupAction(groupId, {
      name: value,
    });
    if (data.status) {
      const newGroupAndItems = [...groupAndItems];
      const pos = newGroupAndItems.findIndex((el) => el.id === groupId);
      newGroupAndItems[pos] = {
        ...newGroupAndItems[pos],
        updatedAt: data.result.groupIntent.updatedAt,
        name: data.result.groupIntent.name,
      };
      setGroupAndItems(newGroupAndItems);
      enqueueSnackbar(textDefault.UPDATE_SUCCESS, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(textDefault.UPDATE_FAILED, {
        variant: 'error',
      });
    }
  };

  const handleDeleteGroup = async (id) => {
    const data = await apis.groupIntent.deleteGroupIntent(id);
    if (data.status) {
      const newGroupAndItems = groupAndItems.filter((el) => el.id !== id);
      setGroupAndItems(newGroupAndItems);
      enqueueSnackbar(textDefault.DELETE_SUCCESS, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(textDefault.DELETE_FAILED, {
        variant: 'error',
      });
    }
  };

  const handleDeleteItem = async (groupId, itemId) => {
    const data = await apis.intent.deleteIntent(itemId);
    if (data.status) {
      const newGroupAndItems = [...groupAndItems];
      const pos = newGroupAndItems.findIndex((el) => el.id === groupId);
      const newItems = newGroupAndItems[pos].children.filter(
        (el) => el.id !== itemId,
      );
      newGroupAndItems[pos] = {
        ...newGroupAndItems[pos],
        children: [...newItems],
      };
      setGroupAndItems(newGroupAndItems);
      enqueueSnackbar(textDefault.DELETE_SUCCESS, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(textDefault.DELETE_FAILED, {
        variant: 'error',
      });
    }
  };

  const handleToggleGroup = (id) => {
    const newGroupAndItems = [...groupAndItems];
    const pos = newGroupAndItems.findIndex((el) => el.id === id);
    newGroupAndItems[pos] = {
      ...newGroupAndItems[pos],
      status: !newGroupAndItems[pos].status,
    };
    setGroupAndItems(newGroupAndItems);
  };

  const handleClickItem = (id) => {
    history.push(`/bot/${botId}/intents/detail/${id}`);
  };

  return (
    <LayoutListGroup
      groupItems={groupAndItems}
      title="intent"
      handleSearch={handleSearch}
      handleCreateItem={handleOpenCreateItem}
      handleDeleteItem={handleDeleteItem}
      handleCreateGroup={handleCreateGroup}
      handleChangeNameGroup={handleChangeNameGroup}
      handleDeleteGroup={handleDeleteGroup}
      handleAddItemInGroup={handleOpenCreateItem}
      handleToggleGroup={handleToggleGroup}
      handleClickItem={handleClickItem}
    >
      <Route exact path={routes.INTENT_BOT.CREATE_INTENT}>
        <CreateIntent
          groupItems={groupAndItems}
          groupIntentId={groupIdSelected}
          handleCreate={handleCreateItem}
        />
      </Route>
      <Route exact path={routes.INTENT_BOT.DETAIL_INTENT}>
        <DetailIntent
          groupItems={groupAndItems}
          handleUpdate={handleUpdateItem}
        />
      </Route>
      <Route exact path={routes.INTENT_BOT.INTENT} component={EmptyPage} />
    </LayoutListGroup>
  );
};

export default Intent;

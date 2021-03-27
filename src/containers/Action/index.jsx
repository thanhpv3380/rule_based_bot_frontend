import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import EmptyPage from '../../components/EmptyPage';
import LayoutListGroup from '../../components/LayoutListGroup';
import routes from '../../constants/route';
import CreateAction from './CreateAction';
import ActionDetail from './DetailAction';
import apis from '../../apis';
import textDefault from '../../constants/textDefault';
import groupConstant from '../../constants/group';

let timeOutId = null;

function Action() {
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
    const data = await apis.groupAction.getGroupAndItems(keyword);
    if (data.status) {
      setGroupAndItems(data.result.groupActions);
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
    const temp = groupAndItems.find(
      (el) => el.groupType === groupConstant.GROUP_SINGLE,
    );
    setGroupIdSelected(id || temp.id);
    history.push(`${match.url}/create`);
  };

  const handleCreateItem = (data) => {
    const newGroupAndItems = [...groupAndItems];
    const pos = newGroupAndItems.findIndex((el) => el.id === data.groupAction);
    newGroupAndItems[pos].children.unshift({
      id: data.id,
      name: data.name,
      groupAction: data.groupAction,
      actions: data.actions,
    });
    newGroupAndItems[pos].status = true;
    setGroupAndItems(newGroupAndItems);
    history.push(`/bot/${botId}/actions/detail/${data.id}`);
  };

  const handleUpdateItem = (data, oldGroupAction) => {
    const newGroupAndItems = [...groupAndItems];
    const actionData = {
      id: data.id,
      name: data.name,
      groupAction: data.groupAction,
      actions: data.actions,
    };
    const pos = newGroupAndItems.findIndex((el) => el.id === data.groupAction);
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
      newGroupAndItems[pos].children.unshift(actionData);
    } else {
      newGroupAndItems[pos].children[childrenPos] = actionData;
    }
    setGroupAndItems(newGroupAndItems);
  };

  const handleCreateGroup = async (value) => {
    const data = await apis.groupAction.createGroupAction({ name: value });
    if (data.status) {
      const newGroupAndItems = [...groupAndItems];
      newGroupAndItems.unshift({
        ...data.result.groupAction,
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
    const data = await apis.groupAction.updateGroupAction(groupId, {
      name: value,
    });
    if (data.status) {
      const newGroupAndItems = [...groupAndItems];
      const pos = newGroupAndItems.findIndex((el) => el.id === groupId);
      newGroupAndItems[pos] = {
        ...newGroupAndItems[pos],
        updatedAt: data.result.groupAction.updatedAt,
        name: data.result.groupAction.name,
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
    const data = await apis.groupAction.deleteGroupAction(id);
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
    const data = await apis.action.deleteAction(itemId);
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
    history.push(`/bot/${botId}/actions/detail/${id}`);
  };

  return (
    <LayoutListGroup
      groupItems={groupAndItems}
      title="Action"
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
      <Route exact path={routes.ACTION_BOT.DETAIL_ACTION}>
        <ActionDetail
          groupItems={groupAndItems}
          handleUpdate={handleUpdateItem}
        />
      </Route>
      <Route exact path={routes.ACTION_BOT.ACTION} component={EmptyPage} />
      <Route exact path={routes.ACTION_BOT.CREATE_ACTION}>
        <CreateAction
          groupItems={groupAndItems}
          groupId={groupIdSelected}
          handleCreate={handleCreateItem}
        />
      </Route>
    </LayoutListGroup>
  );
}

export default Action;

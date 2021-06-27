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
import groupConstant from '../../constants/group';
import Loading from '../../components/Loading';

let timeOutId = null;

const Intent = () => {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  const match = useRouteMatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const botId = useSelector((state) => state.bot.bot.id);
  // eslint-disable-next-line no-unused-vars
  const [searchKey, setSearchKey] = useState();
  const [groupIdSelected, setGroupIdSelected] = useState(null);
  const [groupAndItems, setGroupAndItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGroupAndItems = async (keyword) => {
    const data = await apis.groupIntent.getGroupAndItems({ keyword });
    if (data.status) {
      const newGroupAndItems = [...data.result.groupIntents];
      const listUrl = window.location.href.split('/');
      if (listUrl.length >= 6) {
        const itemId = listUrl[listUrl.length - 1];

        const pos = newGroupAndItems.findIndex((el) =>
          el.children.find((item) => item.id === itemId),
        );
        if (pos >= 0) {
          newGroupAndItems[pos] = {
            ...newGroupAndItems[pos],
            status: true,
          };
        }
      }
      setGroupAndItems(newGroupAndItems);
      setIsLoading(false);
    } else {
      enqueueSnackbar(t('fetch_data_failed'), {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
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
    console.log(data, 'data');
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
      switch (data.code) {
        case 1005:
          enqueueSnackbar('GroupIntent name existed!', {
            variant: 'error',
          });
          break;
        default:
          enqueueSnackbar(textDefault.CREATE_FAILED, {
            variant: 'error',
          });
          break;
      }
    }
  };

  const handleChangeNameGroup = async (groupId, value) => {
    const data = await apis.groupIntent.updateGroupIntent(groupId, {
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
      switch (data.code) {
        case 1005:
          enqueueSnackbar('GroupIntent name existed!', {
            variant: 'error',
          });
          break;
        case 1004:
          enqueueSnackbar('GroupIntent name not change!', {
            variant: 'error',
          });
          break;
        case 404:
          enqueueSnackbar('GroupIntent name not found!', {
            variant: 'error',
          });
          break;
        default:
          enqueueSnackbar(textDefault.UPDATE_FAILED, {
            variant: 'error',
          });
          break;
      }
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
      enqueueSnackbar(t('delete_intent_success'), {
        variant: 'success',
      });
      history.push(`/bot/${botId}/intents`);
    } else {
      switch (data.code) {
        case 1008:
          enqueueSnackbar(t('intent_userd_in_workflow'), {
            variant: 'error',
          });
          break;
        default:
          enqueueSnackbar(t('delete_intent_failed'), {
            variant: 'error',
          });
          break;
      }
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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <LayoutListGroup
      groupItems={groupAndItems}
      title="Intent"
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
      <Route exact path={routes.INTENT_BOT.DETAIL_INTENT}>
        <DetailIntent
          groupItems={groupAndItems}
          handleUpdate={handleUpdateItem}
        />
      </Route>
      <Route exact path={routes.INTENT_BOT.INTENT} component={EmptyPage} />
      <Route exact path={routes.INTENT_BOT.CREATE_INTENT}>
        <CreateIntent
          groupItems={groupAndItems}
          groupIntentId={groupIdSelected}
          handleCreate={handleCreateItem}
        />
      </Route>
    </LayoutListGroup>
  );
};

export default Intent;

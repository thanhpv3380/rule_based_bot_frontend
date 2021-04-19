import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import EmptyPage from '../../components/EmptyPage';
import LayoutListGroup from '../../components/LayoutListGroup';
import routes from '../../constants/route';
import apis from '../../apis';
import textDefault from '../../constants/textDefault';
import groupConstant from '../../constants/group';
import CreateWorkFlow from './CreateWorkflow';
import DetailWorkFlow from './DetailWorkflow';

let timeOutId = null;

const Workflow = () => {
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
    const data = await apis.groupWorkflow.getGroupAndItems(keyword);
    if (data && data.status) {
      setGroupAndItems(data.result.groupWorkflows);
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
    const pos = newGroupAndItems.findIndex(
      (el) => el.id === data.groupWorkflow,
    );
    newGroupAndItems[pos].children.unshift({
      id: data.id,
      name: data.name,
      groupWorkflow: data.groupWorkflow,
    });
    newGroupAndItems[pos].status = true;
    setGroupAndItems(newGroupAndItems);
    history.push(`/bot/${botId}/workflows/detail/${data.id}`);
  };

  const handleUpdateItem = (data, oldGroupWorkflow) => {
    const newGroupAndItems = [...groupAndItems];
    const workflowData = {
      id: data.id,
      name: data.name,
      groupWorkflow: data.groupWorkflow,
    };
    const pos = newGroupAndItems.findIndex(
      (el) => el.id === data.groupWorkflow,
    );
    newGroupAndItems[pos].status = true;
    const childrenPos = newGroupAndItems[pos].children.findIndex(
      (el) => el.id === data.id,
    );
    if (childrenPos < 0) {
      const tempPos = newGroupAndItems.findIndex(
        (el) => el.id === oldGroupWorkflow,
      );
      const newItems = newGroupAndItems[tempPos].children.filter(
        (el) => el.id !== data.id,
      );
      newGroupAndItems[tempPos] = {
        ...newGroupAndItems[tempPos],
        children: [...newItems],
      };
      newGroupAndItems[pos].children.unshift(workflowData);
    } else {
      newGroupAndItems[pos].children[childrenPos] = workflowData;
    }
    setGroupAndItems(newGroupAndItems);
  };

  const handleCreateGroup = async (value) => {
    const data = await apis.groupWorkflow.createGroupWorkflow({ name: value });
    if (data && data.status) {
      const newGroupAndItems = [...groupAndItems];
      newGroupAndItems.unshift({
        ...data.result.groupWorkflow,
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
    const data = await apis.groupWorkflow.updateGroupWorkflow(groupId, {
      name: value,
    });
    if (data && data.status) {
      const newGroupAndItems = [...groupAndItems];
      const pos = newGroupAndItems.findIndex((el) => el.id === groupId);
      newGroupAndItems[pos] = {
        ...newGroupAndItems[pos],
        updatedAt: data.result.groupWorkflow.updatedAt,
        name: data.result.groupWorkflow.name,
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
    const data = await apis.groupWorkflow.deleteGroupWorkflow(id);
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
    const data = await apis.workflow.deleteWorkflow(itemId);
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
    history.push(`/bot/${botId}/workflows/detail/${id}`);
  };

  return (
    <LayoutListGroup
      groupItems={groupAndItems}
      title="Workflow"
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
      <Route exact path={routes.WORKFLOW_BOT.DETAIL_WORKFLOW}>
        <DetailWorkFlow
          groupItems={groupAndItems}
          handleUpdate={handleUpdateItem}
        />
      </Route>
      <Route exact path={routes.WORKFLOW_BOT.WORKFLOW} component={EmptyPage} />
      <Route exact path={routes.WORKFLOW_BOT.CREATE_WORKFLOW}>
        <CreateWorkFlow
          groupItems={groupAndItems}
          groupId={groupIdSelected}
          handleCreate={handleCreateItem}
        />
      </Route>
    </LayoutListGroup>
  );
};

export default Workflow;

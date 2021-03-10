/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import apis from '../../apis';
import LayoutBody from '../../components/LayoutBody';
import title from '../../enums/title';
import EmptyPage from '../../components/EmptyPage';
import IntentDetail from './IntentDetail';
import CreateIntent from './CreateIntent';
import routes from '../../constants/route';

function Intent() {
  // const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [noneGroups, setNoneGroup] = useState();
  const [groups, setGroups] = useState();
  const [statusGroups, setStatusGroups] = useState();
  const [statusNoneGroup, setStatusNoneGroup] = useState();

  const fetchGroupintents = async () => {
    const { status, results, message } = await apis.groupIntent.getGroupIntents(
      '',
    );
    if (status === 1 && results.groupIntents) {
      const notAGroups = results.groupIntents.find((group) => !group.isGroup);
      const isGroups = results.groupIntents
        .filter((group) => group.isGroup)
        .map((item) => {
          return {
            ...item,
            open: false,
          };
        });
      setNoneGroup(notAGroups);
      setGroups(isGroups);
      setStatusGroups(isGroups);
      setStatusNoneGroup(notAGroups);
    } else {
      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchGroupintents();
  }, []);

  const handleSearchIntent = async (e) => {
    const { value } = e.target;
    if (value && value !== '' && value !== null) {
      const { results } = await apis.groupIntent.getGroupIntents(value);
      if (results.groupIntents) {
        const notAGroups = results.groupIntents.find((group) => !group.isGroup);
        const isGroups = results.groupIntents
          .filter((group) => group.isGroup)
          .map((item) => {
            const { open } = statusGroups.find(
              (oldGroup) => oldGroup.id === item.id,
            );
            return {
              ...item,
              open,
              openEdit: false,
            };
          });
        setNoneGroup(notAGroups);
        setGroups(isGroups);
      }
    } else {
      setNoneGroup(statusNoneGroup);
      setGroups(statusGroups);
    }
  };

  const setStatusOfGroup = (data) => {
    // const oldGroup = getCookie('groups');
    // if (oldGroup) {
    const newGroups = statusGroups.map((itemOld) => {
      const newGroup = data.find((itemNew) => itemNew.id === itemOld.id);
      return newGroup || itemOld;
    });
    setStatusGroups(newGroups);
    // }
  };

  const handleClickGroup = (data) => {
    const newGroups = groups.map((item) => {
      if (item.name === data.name) {
        if (item.intents.length !== 0) {
          return {
            ...item,
            open: !item.open,
          };
        }
        return item;
      }
      return item;
    });
    setGroups(newGroups);
    setStatusOfGroup(newGroups);
  };

  const handleOpenEditGroup = (data) => {
    const newGroups = groups.map((item) => {
      if (item.name === data.name) {
        return {
          ...item,
          openEdit: true,
          openOption: null,
        };
      }

      return item;
    });
    setGroups(newGroups);
    setStatusOfGroup(newGroups);
  };

  const handleCloseEditGroup = (data) => {
    const newGroups = groups.map((item) => {
      if (item.name === data.name) {
        return {
          ...item,
          openEdit: false,
        };
      }

      return item;
    });
    setGroups(newGroups);
    setStatusOfGroup(newGroups);
  };

  const handleCreateGroup = async (name) => {
    if (!name || name === null || name === '') {
      enqueueSnackbar('Name cannot be empty', {
        variant: 'warning',
      });
      return true;
    }
    const { status } = await apis.groupIntent.createGroupIntent(name);
    if (status === 1) {
      fetchGroupintents();
      return false;
    }
    return true;
  };

  const handleCreateIntent = () => {
    history.push('/intents/createIntent');
  };

  const handleOpenOptionGroup = (e, data) => {
    const newGroups = groups.map((item) => {
      if (item.name === data.name) {
        return {
          ...item,
          openOption: e.currentTarget,
        };
      }

      return item;
    });
    setGroups(newGroups);
    setStatusOfGroup(newGroups);
  };

  const handleCloseOptionGroup = (data) => {
    const newGroups = groups.map((item) => {
      if (item.name === data.name) {
        return {
          ...item,
          openOption: null,
        };
      }

      return item;
    });
    setGroups(newGroups);
    setStatusOfGroup(newGroups);
  };

  const updateGroupName = (group) => {
    const newGroups = groups.map((item) => {
      if (item.id === group.id) {
        return {
          ...item,
          name: group.name,
          openEdit: false,
        };
      }
      return item;
    });
    setGroups(newGroups);
    setStatusOfGroup(newGroups);
  };

  const handleUpdateGroupName = async (groupName, group) => {
    const groupIntent = {
      name: groupName,
    };
    const { status, result } = await apis.groupIntent.updateGroupIntent(
      group.id,
      groupIntent,
    );
    if (status && status === 1) {
      updateGroupName(result);
    }
  };

  const handleDeleteGroup = async (group) => {
    const { status } = await apis.groupIntent.deleteGroupIntent(group.id);
    if (status === 1) {
      const newGroup = groups.filter((item) => item.id !== group.id);
      setGroups(newGroup);
      setStatusOfGroup(newGroup);
    }
  };

  const handleDeleteIntent = async (id, group) => {
    const { status } = await apis.intent.deleteIntent(id);
    if (status === 1) {
      if (group.isGroup) {
        const newGroup = groups.map((item) => {
          if (item.id === group.id) {
            const newIntents = group.intents.filter(
              (intent) => intent.id !== id,
            );
            group.intents = newIntents;
            return group;
          }
          return item;
        });

        setGroups(newGroup);
        setStatusOfGroup(newGroup);
      } else {
        const newIntents = group.intents.filter((intent) => intent.id !== id);
        group.intents = newIntents;
        setNoneGroup(group);
        setStatusNoneGroup(group);
      }
    }
  };

  return (
    <LayoutBody
      title={title.INTENTS}
      noneGroups={noneGroups}
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
        path={routes.INTENT_BOT.INTENT_DETAIL}
        component={IntentDetail}
      />
      <Route exact path={routes.INTENT_BOT.INTENT} component={EmptyPage} />
    </LayoutBody>
  );
}

export default Intent;

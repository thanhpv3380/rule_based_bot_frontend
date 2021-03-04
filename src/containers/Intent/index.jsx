import React, { useEffect, useState } from 'react';
import { Card, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import apis from '../../apis';
import useStyles from './index.style';
import LayoutBody from './components/LayoutBody';

function Intent() {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [noneGroups, setNoneGroup] = useState();
  const [groups, setGroups] = useState();

  const fetchGroupintents = async () => {
    const { results, message } = await apis.groupIntent.getGroupIntents();
    if (results.groupIntents) {
      const notAGroups = results.groupIntents.filter((group) => !group.isGroup);
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
      const { results } = await apis.groupIntent.search(value);
      if (results.groupIntents) {
        const notAGroups = results.groupIntents.filter(
          (group) => !group.isGroup,
        );
        const isGroups = results.groupIntents
          .filter((group) => group.isGroup)
          .map((item) => {
            const { open } = groups.find((oldGroup) => oldGroup.id === item.id);
            return {
              ...item,
              open,
            };
          });
        setNoneGroup(notAGroups);
        setGroups(isGroups);
      }
    } else {
      fetchGroupintents();
    }
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
  };

  const handleClickIntent = (data) => {
    history.push(`/intents/${data.id}`);
  };

  const handleCreateGroup = async (name) => {
    if (!name || name === null || name === '') {
      enqueueSnackbar('Name cannot be empty', {
        variant: 'warning',
      });
    } else {
      const { status } = await apis.groupIntent.createGroupIntent(name);
      if (status === 1) {
        fetchGroupintents();
      }
    }
  };

  const handleCreateIntent = () => {
    history.push('/intents/createIntent');
  };

  // const handleDelete = async (entity, type) => {
  //   console.log(entity, type);
  // };

  return (
    <LayoutBody
      noneGroups={noneGroups}
      groups={groups}
      handleClickGroup={handleClickGroup}
      handleClickIntent={handleClickIntent}
      handleCreateGroup={handleCreateGroup}
      handleCreateIntent={handleCreateIntent}
      handleSearch={handleSearchIntent}
    >
      <Card className={classes.root}>
        <Typography className={classes.typographyBody}>
          You have not choose any intent
        </Typography>
      </Card>
    </LayoutBody>
  );
}

export default Intent;

/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { ListItem, ListItemText, Paper } from '@material-ui/core';
import ItemInfoHeader from '../../../components/ItemInfoHeader';
import {
  ActionText,
  ActionImage,
  ActionMedia,
  ActionCategory,
} from '../Actions';
import useStyles from './index.style';
import actionsConstant from '../../../constants/actions';
import apis from '../../../apis';
import textDefault from '../../../constants/textDefault';

const DetailAction = ({ groupItems, handleUpdate }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [actionId, setActionId] = useState();
  const [actionData, setActionData] = useState({});
  const [actions, setActions] = useState([]);

  const handleChangeInfoHeader = (e) => {
    if (e.target.name === 'groupId') {
      setActionData({
        ...actionData,
        groupAction: e.target.value,
      });
    }
    if (e.target.name === 'name') {
      setActionData({
        ...actionData,
        name: e.target.value,
      });
    }
  };

  const fetchAction = async (id) => {
    const data = await apis.action.getAction(id);
    if (data && data.status) {
      setActionData(data.result.action);
      setActions(data.result.action.actions);
    } else {
      enqueueSnackbar(textDefault.FETCH_DATA_FAILED, {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    const listUrl = window.location.href.split('/');
    const itemId = listUrl[listUrl.length - 1];
    setActionId(itemId);
    fetchAction(itemId);
  }, [window.location.href]);

  const handleDeleteItem = (id) => {
    setActions([
      ...actions.slice(0, id),
      ...actions.slice(id + 1, actions.length),
    ]);
  };

  const handleAddText = () => {
    setActions([
      ...actions,
      {
        typeAction: actionsConstant.TEXT,
        text: [],
      },
    ]);
  };

  const handleAddImage = () => {
    setActions([
      ...actions,
      {
        typeAction: actionsConstant.MEDIA,
        media: {
          typeMedia: actionsConstant.MEDIA_IMAGE,
          description: '',
          url: '',
        },
      },
    ]);
  };

  const handleAddAudio = () => {
    setActions([
      ...actions,
      {
        typeAction: actionsConstant.MEDIA,
        media: {
          typeMedia: actionsConstant.MEDIA_AUDIO,
          description: '',
          url: '',
        },
      },
    ]);
  };

  const handleAddCategory = () => {
    setActions([
      ...actions,
      {
        typeAction: actionsConstant.CATEGORY,
        options: [],
      },
    ]);
  };

  const handleAddVideo = () => {
    setActions([
      ...actions,
      {
        typeAction: actionsConstant.MEDIA,
        media: {
          typeMedia: actionsConstant.MEDIA_VIDEO,
          description: '',
          url: '',
        },
      },
    ]);
  };

  const handleAddTextItem = (id, value) => {
    const newActions = [...actions];
    if (value.length <= 0) {
      enqueueSnackbar('Value is empty', {
        variant: 'error',
      });
    } else {
      newActions[id].text.push(value);
      setActions(newActions);
    }
  };

  const handleAddCategoryItem = (id, data) => {
    const newActions = [...actions];
    newActions[id].options.push({ ...data });
    setActions(newActions);
  };

  const handleDeleteTextItem = (id, index) => {
    const newActions = [...actions];
    newActions[id].text = [
      ...newActions[id].text.slice(0, index),
      ...newActions[id].text.slice(index + 1, newActions[id].text.length),
    ];
    setActions(newActions);
  };

  const handleDeleteCategoryItem = (id, index) => {
    const newActions = [...actions];
    newActions[id].options = [
      ...newActions[id].options.slice(0, index),
      ...newActions[id].options.slice(index + 1, newActions[id].options.length),
    ];
    setActions(newActions);
  };

  const handleEditTextItem = (id, index, value) => {
    const newActions = [...actions];
    newActions[id].text[index] = value;
    setActions(newActions);
  };

  const handleEditCategoryItem = (id, index, data) => {
    const newActions = [...actions];
    newActions[id].options[index] = { ...data };
    setActions(newActions);
  };

  const handleChangeMediaInfoItem = (id, name, value) => {
    const newActions = [...actions];
    newActions[id].media = {
      ...newActions[id].media,
      [name]: value,
    };
    setActions(newActions);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = await apis.action.updateAction(actionId, {
      name: actionData.name,
      actions,
      groupAction: actionData.groupAction,
    });
    if (data.status) {
      handleUpdate(data.result.action, actionData.groupAction);
      setActionData(data.result.action);
      setActions(data.result.action.actions);
      enqueueSnackbar(textDefault.UPDATE_SUCCESS, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(textDefault.UPDATE_FAILED, {
        variant: 'error',
      });
    }
  };

  const renderAction = (action, id) => {
    if (action.typeAction === actionsConstant.TEXT) {
      return (
        <ActionText
          actionId={id}
          item={action}
          handleDeleteText={handleDeleteItem}
          handleDeleteTextItem={handleDeleteTextItem}
          handleEditTextItem={handleEditTextItem}
          handleAddTextItem={handleAddTextItem}
        />
      );
    }
    if (action.typeAction === actionsConstant.CATEGORY) {
      return (
        <ActionCategory
          actionId={id}
          item={action}
          handleDeleteCategory={handleDeleteItem}
          handleDeleteCategoryItem={handleDeleteCategoryItem}
          handleEditCategoryItem={handleEditCategoryItem}
          handleAddCategoryItem={handleAddCategoryItem}
        />
      );
    }
    if (action.typeAction === actionsConstant.MEDIA) {
      if (action.media.typeMedia === actionsConstant.MEDIA_IMAGE) {
        return (
          <ActionImage
            actionId={id}
            item={action}
            handleChangeMediaInfoItem={handleChangeMediaInfoItem}
            handleDeleteSendImageItem={handleDeleteItem}
          />
        );
      }
      return (
        <ActionMedia
          title={
            action.media.typeMedia === actionsConstant.MEDIA_AUDIO
              ? 'audio'
              : action.media.typeMedia === actionsConstant.MEDIA_VIDEO
              ? 'video'
              : ''
          }
          actionId={id}
          item={action}
          handleChangeMediaInfoItem={handleChangeMediaInfoItem}
          handleDeleteMediaItem={handleDeleteItem}
        />
      );
    }
    return '';
  };

  const actionsMenu = [
    {
      heading: 'Text',
      icon: '',
      event: handleAddText,
    },
    {
      heading: 'Image',
      icon: '',
      event: handleAddImage,
    },
    {
      heading: 'Audio',
      icon: '',
      event: handleAddAudio,
    },
    {
      heading: 'Video',
      icon: '',
      event: handleAddVideo,
    },
    {
      heading: 'Category',
      icon: '',
      event: handleAddCategory,
    },
  ];

  return (
    <>
      <ItemInfoHeader
        name={actionData && actionData.name}
        groupId={actionData && actionData.groupAction}
        groupItems={groupItems}
        handleSave={handleSave}
        handleChange={handleChangeInfoHeader}
      />
      <div className={classes.content}>
        {actions.map((action, index) => (
          <div className={classes.actionItem} key={index}>
            <Paper className={classes.contentItem}>
              {renderAction(action, index)}
            </Paper>
          </div>
        ))}
        <div className={classes.listSelect}>
          {actionsMenu.map((el, index) => (
            <ListItem
              key={index}
              button
              className={classes.item}
              onClick={el.event}
            >
              <ListItemText id={index} primary={el.heading} />
            </ListItem>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailAction;

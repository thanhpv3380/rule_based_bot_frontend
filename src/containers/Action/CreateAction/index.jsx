/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { ListItem, ListItemText, Paper } from '@material-ui/core';
import ItemInfoHeader from '../../../components/ItemInfoHeader';
import { ActionText, ActionImage, ActionMedia } from '../Actions';
import useStyles from './index.style';
import actionsConstant from '../../../constants/actions';
import apis from '../../../apis';
import textDefault from '../../../constants/textDefault';
import { generateTitleItem } from '../../../utils/generateTitle';

const CreateAction = ({ groupItems, groupActionId, handleCreate }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [actions, setActions] = useState([]);

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

  const handleDeleteTextItem = (id, index) => {
    const newActions = [...actions];

    newActions[id].text = [
      ...newActions[id].text.slice(0, index),
      ...newActions[id].text.slice(index + 1, newActions[id].text.length),
    ];

    setActions(newActions);
  };

  const handleEditTextItem = (id, index, value) => {
    const newActions = [...actions];

    newActions[id].text[index] = value;

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

  const handleSave = async (name, groupAction) => {
    const data = await apis.action.createAction({
      name,
      actions,
      groupAction,
    });
    if (data.status) {
      handleCreate(data.result.action);
      enqueueSnackbar(textDefault.CREATE_SUCCESS, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(textDefault.CREATE_FAILED, {
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
      heading: 'Option',
      icon: '',
      event: handleAddVideo,
    },
  ];

  return (
    <>
      <ItemInfoHeader
        name={generateTitleItem('Action')}
        groupItems={groupItems}
        handleSave={handleSave}
        groupId={groupActionId}
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

export default CreateAction;

/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { ListItem, ListItemText, Paper } from '@material-ui/core';
import ItemInfoHeader from '../../../components/ItemInfoHeader';
import { ActionText, ActionSendMail, ActionMedia } from '../Actions';
import useStyles from './index.style';
import actionsConstant from '../../../constants/actions';

const CreateAction = ({ handleCreate }) => {
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
        type: actionsConstant.TEXT,
        text: [],
      },
    ]);
  };

  const handleAddSendMail = () => {
    setActions([
      ...actions,
      {
        type: actionsConstant.SEND_MAIL,
        mail: {},
      },
    ]);
  };

  const handleAddAudio = () => {
    setActions([
      ...actions,
      {
        type: actionsConstant.MEDIA,
        media: {
          text: null,
          attachment: {
            type: actionsConstant.MEDIA_AUDIO,
            payload: {
              url: null,
              elements: [],
            },
          },
        },
      },
    ]);
  };

  const handleAddVideo = () => {
    setActions([
      ...actions,
      {
        type: actionsConstant.MEDIA,
        media: {
          text: null,
          attachment: {
            type: actionsConstant.MEDIA_VIDEO,
            payload: {
              url: null,
              elements: [],
            },
          },
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

  const handleChangeMailInfoItem = (id, name, value) => {
    const newActions = [...actions];
    newActions[id].mail = {
      ...newActions[id].mail,
      [name]: value,
    };
    setActions(newActions);
  };

  const handleChangeMediaInfoItem = (id, name, value) => {
    const newActions = [...actions];
    switch (name) {
      case 'text':
        newActions[id].media.text = value;
        break;
      case 'url':
        newActions[id].media.attachment.payload.url = value;
        break;
      default:
    }
    setActions(newActions);
  };

  const handleSave = () => {
    console.log(actions);
  };

  const renderAction = (action, id) => {
    if (action.type === actionsConstant.TEXT) {
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
    if (action.type === actionsConstant.SEND_MAIL) {
      return (
        <ActionSendMail
          actionId={id}
          item={action}
          handleChangeMailInfoItem={handleChangeMailInfoItem}
          handleDeleteSendMailItem={handleDeleteItem}
        />
      );
    }
    if (action.type === actionsConstant.MEDIA) {
      return (
        <ActionMedia
          title={
            action.media.attachment.type === actionsConstant.MEDIA_AUDIO
              ? 'audio'
              : action.media.attachment.type === actionsConstant.MEDIA_VIDEO
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
      heading: 'Mail',
      icon: '',
      event: handleAddSendMail,
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
  ];

  return (
    <>
      <ItemInfoHeader handleCreate={handleCreate} handleSave={handleSave} />
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

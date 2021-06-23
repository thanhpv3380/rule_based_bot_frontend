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
  ActionJsonApi,
  ActionGallery,
} from '../Actions';
import useStyles from './index.style';
import actionsConstant from '../../../constants/actions';
import apis from '../../../apis';
import textDefault from '../../../constants/textDefault';
import { generateTitleItem } from '../../../utils/generateTitle';
import groupConstant from '../../../constants/group';

const CreateAction = ({ groupItems, groupId, handleCreate }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [parameters, setParameters] = useState([]);
  const [actionData, setActionData] = useState({
    name: '',
    groupAction: '',
  });
  const [actions, setActions] = useState([]);

  const fetchSlots = async () => {
    const data = await apis.slot.getSlots();
    if (data && data.status) {
      setParameters(data.result.slots);
    } else {
      enqueueSnackbar(textDefault.FETCH_DATA_FAILED, {
        variant: 'success',
      });
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  useEffect(() => {
    setActionData({
      name: generateTitleItem('Action'),
      groupAction: groupId,
    });
  }, []);

  useEffect(() => {
    const temp = groupItems.find(
      (el) => el.groupType === groupConstant.GROUP_SINGLE,
    );
    setActionData({
      name: generateTitleItem('Action'),
      groupAction: groupId || (temp && temp.id),
    });
  }, [groupItems]);

  useEffect(() => {
    setActionData({
      name: generateTitleItem('Action'),
      groupAction: groupId,
    });
  }, [groupId]);

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

  const handleAddGallery = () => {
    setActions([
      ...actions,
      {
        typeAction: actionsConstant.GALLERY,
        gallery: [],
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

  const handleAddCategory = () => {
    setActions([
      ...actions,
      {
        typeAction: actionsConstant.CATEGORY,
        options: {
          description: '',
          optionsChild: [],
        },
      },
    ]);
  };

  const handleAddJsonApi = () => {
    setActions([
      ...actions,
      {
        typeAction: actionsConstant.JSON_API,
        api: {
          method: 'GET',
          url: '',
          headers: [],
          body: [],
          response: null,
          parameters: [],
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
    newActions[id].options.optionsChild.push({ ...data });
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
    newActions[id].options.optionsChild = [
      ...newActions[id].options.optionsChild.slice(0, index),
      ...newActions[id].options.optionsChild.slice(
        index + 1,
        newActions[id].options.optionsChild.length,
      ),
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
    newActions[id].options.optionsChild[index] = { ...data };
    setActions(newActions);
  };

  const handleChangeDescriptionCategory = (value, id) => {
    const newActions = [...actions];
    newActions[id].options.description = value;
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

  const handleChangeJsonApiInfoItem = (id, name, value) => {
    const newActions = [...actions];
    newActions[id].api = {
      ...newActions[id].api,
      [name]: value,
    };
    setActions(newActions);
  };

  const handleAddHeaderApiItem = (id) => {
    const newActions = [...actions];
    const { headers } = newActions[id].api;
    const lastHeaderItem = headers[headers.length - 1];
    if (lastHeaderItem) {
      const { title, value } = lastHeaderItem;
      if (title.trim() === '' && value.trim() === '') {
        enqueueSnackbar('There are empty field', {
          variant: 'warning',
        });
        return;
      }
    }
    newActions[id].api.headers.push({
      title: '',
      value: '',
    });
    setActions(newActions);
  };

  const handleChangeHeaderApiItem = (actionId, headerId, name, value) => {
    const newActions = [...actions];
    newActions[actionId].api.headers[headerId] = {
      ...newActions[actionId].api.headers[headerId],
      [name]: value,
    };
    setActions(newActions);
  };

  const handleDeleteHeaderApiItem = (actionId, headerId) => {
    const newActions = [...actions];
    newActions[actionId].api.headers = newActions[actionId].api.headers.filter(
      (el, index) => index !== headerId,
    );
    setActions(newActions);
  };

  const handleAddBodyApiItem = (id) => {
    const newActions = [...actions];
    const { body } = newActions[id].api;
    const lastBodyItem = body[body.length - 1];
    if (lastBodyItem) {
      const { title, value } = lastBodyItem;
      if (title.trim() === '' && value.trim() === '') {
        enqueueSnackbar('There are empty field', {
          variant: 'warning',
        });
        return;
      }
    }
    newActions[id].api.body.push({
      title: '',
      value: '',
    });
    setActions(newActions);
  };

  const handleChangeBodyApiItem = (actionId, bodyId, name, value) => {
    const newActions = [...actions];
    newActions[actionId].api.body[bodyId] = {
      ...newActions[actionId].api.body[bodyId],
      [name]: value,
    };
    setActions(newActions);
  };

  const handleDeleteBodyApiItem = (actionId, bodyId) => {
    const newActions = [...actions];
    newActions[actionId].api.body = newActions[actionId].api.body.filter(
      (el, index) => index !== bodyId,
    );
    setActions(newActions);
  };

  const handleAddParameterItem = (actionId, data) => {
    const { slot, name, value } = data;
    if (!slot || !value) {
      enqueueSnackbar('Value of properties of JSON API cannot be empty', {
        variant: 'warning',
      });
      return false;
    }
    const newActions = [...actions];
    const tempParameters = newActions[actionId].api.parameters;
    const parameterIdExist = tempParameters.find((el) => el.slot === slot);
    if (parameterIdExist) {
      enqueueSnackbar('Slot already setted', {
        variant: 'warning',
      });
      return false;
    }
    newActions[actionId].api = {
      ...newActions[actionId].api,
      parameters: [
        ...newActions[actionId].api.parameters,
        { slot, name, value },
      ],
    };
    setActions(newActions);
    return true;
  };

  const handleDeleteParameterItem = (actionId, pos) => {
    const newActions = [...actions];
    newActions[actionId].api = {
      ...newActions[actionId].api,
      parameters: [
        ...newActions[actionId].api.parameters.slice(0, pos),
        ...newActions[actionId].api.parameters.slice(
          pos + 1,
          newActions[actionId].api.parameters.length,
        ),
      ],
    };
    setActions(newActions);
  };

  const handleUpdateGallery = (id, listImage) => {
    const newActions = [...actions];
    newActions[id] = {
      ...newActions[id],
      gallery: listImage,
    };
    setActions(newActions);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = await apis.action.createAction({
      name: actionData.name,
      actions,
      groupAction: actionData.groupAction,
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
    if (action.typeAction === actionsConstant.CATEGORY) {
      return (
        <ActionCategory
          actionId={id}
          item={action}
          handleDeleteCategory={handleDeleteItem}
          handleDeleteCategoryItem={handleDeleteCategoryItem}
          handleEditCategoryItem={handleEditCategoryItem}
          handleAddCategoryItem={handleAddCategoryItem}
          handleChangeDescriptionCategory={handleChangeDescriptionCategory}
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
              ? textDefault.ACTIONS.AUDIO
              : action.media.typeMedia === actionsConstant.MEDIA_VIDEO
              ? textDefault.ACTIONS.VIDEO
              : ''
          }
          actionId={id}
          item={action}
          handleChangeMediaInfoItem={handleChangeMediaInfoItem}
          handleDeleteMediaItem={handleDeleteItem}
        />
      );
    }
    if (action.typeAction === actionsConstant.JSON_API) {
      return (
        <ActionJsonApi
          actionId={id}
          item={action}
          parameters={parameters}
          handleDeleteJsonApi={handleDeleteItem}
          handleChange={handleChangeJsonApiInfoItem}
          handleAddHeaderItem={handleAddHeaderApiItem}
          handleChangeHeaderItem={handleChangeHeaderApiItem}
          handleDeleteHeaderItem={handleDeleteHeaderApiItem}
          handleAddBodyItem={handleAddBodyApiItem}
          handleChangeBodyItem={handleChangeBodyApiItem}
          handleDeleteBodyItem={handleDeleteBodyApiItem}
          handleAddParameterItem={handleAddParameterItem}
          handleDeleteParameterItem={handleDeleteParameterItem}
        />
      );
    }
    if (action.typeAction === actionsConstant.GALLERY) {
      return (
        <ActionGallery
          actionId={id}
          item={action.gallery}
          handleDeleteGallery={handleDeleteItem}
          handleUpdateGallery={handleUpdateGallery}
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
    {
      heading: 'JSON API',
      icon: '',
      event: handleAddJsonApi,
    },
    {
      heading: 'Gallery',
      icon: '',
      event: handleAddGallery,
    },
  ];

  return (
    <>
      <ItemInfoHeader
        name={actionData.name || ''}
        groupId={actionData.groupAction}
        groupItems={groupItems}
        handleSave={handleSave}
        handleChange={handleChangeInfoHeader}
      />
      <div className={classes.content}>
        {actions.map((action, index) => (
          <div className={classes.actionItem} key={index}>
            <Paper className={classes.contentItem} elevation={3}>
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

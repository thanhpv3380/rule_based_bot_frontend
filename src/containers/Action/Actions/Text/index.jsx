/* eslint-disable react/no-array-index-key */
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  TextFields as TextFieldsIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';
import MenuToggle from '../../../../components/MenuToggle';
import useStyles from './index.style';

const ActionText = ({
  actionId,
  item,
  handleAddTextItem,
  handleDeleteText,
  handleDeleteTextItem,
  handleEditTextItem,
}) => {
  const dense = false;
  const classes = useStyles();
  const [isAdd, setIsAdd] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [text, setText] = useState('');

  const handleOpenAdd = () => {
    setIsAdd(true);
  };

  const handleAdd = () => {
    handleAddTextItem(actionId, text);
    setIsAdd(false);
    setText('');
  };

  const handleCancelAdd = () => {
    setIsAdd(false);
    setEditIndex(null);
    setText('');
  };

  const handlePrevEdit = (e, id) => {
    setEditIndex(id);
    setText(item.text[id]);
  };

  const handleEdit = () => {
    handleEditTextItem(actionId, editIndex, text);
    setEditIndex(null);
    setText('');
  };

  const handlePrevDelete = (e, id) => {
    handleDeleteTextItem(actionId, id);
  };

  const itemMenus = [
    {
      heading: 'Edit',
      event: handlePrevEdit,
    },
    {
      heading: 'Delete',
      event: handlePrevDelete,
    },
  ];
  return (
    <>
      <Box display="flex">
        <Box display="flex" flexGrow={1}>
          <Box display="flex">
            <Box mr={0.5}>
              <TextFieldsIcon />
            </Box>
            <Box ml={0.5}>
              <Typography variant="button" display="block" gutterBottom>
                Text
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteText(actionId)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />

      <List dense={dense}>
        {item &&
          item.text &&
          item.text.map((el, index) => (
            <ListItem key={index}>
              {editIndex === index ? (
                <>
                  <ListItemText>
                    <TextField
                      id="standard-required"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Box display="flex">
                      <Box m={0.5}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleEdit}
                        >
                          Save
                        </Button>
                      </Box>
                      <Box m={0.5}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleCancelAdd}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </ListItemSecondaryAction>
                </>
              ) : (
                <>
                  <ListItemText>{el}</ListItemText>
                  <ListItemSecondaryAction>
                    <MenuToggle
                      id={index}
                      icon={<MoreVertIcon />}
                      menus={itemMenus}
                    />
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
          ))}

        {isAdd && (
          <ListItem>
            <ListItemText>
              <TextField
                id="standard-required"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </ListItemText>
            <ListItemSecondaryAction>
              <Box display="flex">
                <Box m={0.5}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAdd}
                  >
                    Add
                  </Button>
                </Box>
                <Box m={0.5}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleCancelAdd}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
      {!isAdd && (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenAdd}
          className={classes.btnAdd}
        >
          <AddIcon />
        </Button>
      )}
    </>
  );
};

export default ActionText;

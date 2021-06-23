/* eslint-disable react/no-array-index-key */
import {
  Box,
  Button,
  Grid,
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
  Category as CategoryIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';
import MenuToggle from '../../../../components/MenuToggle';
import textDefault from '../../../../constants/textDefault';
import useStyles from './index.style';

const ActionCategory = ({
  actionId,
  item,
  handleDeleteCategory,
  handleAddCategoryItem,
  handleDeleteCategoryItem,
  handleEditCategoryItem,
  handleChangeDescriptionCategory,
}) => {
  const dense = false;
  const classes = useStyles();
  const [isAdd, setIsAdd] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [option, setOption] = useState({
    name: '',
    value: '',
  });

  const handleOpenAdd = () => {
    setIsAdd(true);
  };

  const handleAdd = () => {
    handleAddCategoryItem(actionId, option);
    setIsAdd(false);
    setOption({
      name: '',
      value: '',
    });
  };

  const handleCancelAdd = () => {
    setIsAdd(false);
    setEditIndex(null);
    setOption({
      name: '',
      value: '',
    });
  };

  const handlePrevEdit = (e, id) => {
    setEditIndex(id);
    setOption(item.options[id]);
  };

  const handleEdit = () => {
    handleEditCategoryItem(actionId, editIndex, option);
    setEditIndex(null);
    setOption({
      name: '',
      value: '',
    });
  };

  const handlePrevDelete = (e, id) => {
    handleDeleteCategoryItem(actionId, id);
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
              <CategoryIcon />
            </Box>
            <Box ml={0.5}>
              <Typography variant="button" display="block" gutterBottom>
                Category
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteCategory(actionId)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid item>
        <TextField
          label="Enter description of category"
          id="standard-required"
          value={option && option.description}
          variant="outlined"
          size="small"
          fullWidth
          name="description"
          onChange={(e) =>
            handleChangeDescriptionCategory(e.target.value, actionId)
          }
          className={classes.input}
        />
      </Grid>
      <List dense={dense}>
        <ListItem>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              {textDefault.ACTIONS.NAME_OF_OPTION}
            </Grid>
            <Grid item xs={3}>
              {textDefault.ACTIONS.VALUE}
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </ListItem>
      </List>
      <List dense={dense}>
        {item &&
          item.options.optionChild &&
          item.options.optionChild.map((el, index) => (
            <ListItem key={index}>
              {editIndex === index ? (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                      <TextField
                        id="standard-required"
                        value={option.name}
                        onChange={(e) =>
                          setOption({
                            ...option,
                            name: e.target.value,
                          })
                        }
                        className={classes.input}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="standard-required"
                        value={option.value}
                        onChange={(e) =>
                          setOption({
                            ...option,
                            value: e.target.value,
                          })
                        }
                        className={classes.input}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="standard-required"
                        value={option.description}
                        onChange={(e) =>
                          setOption({
                            ...option,
                            description: e.target.value,
                          })
                        }
                        className={classes.input}
                      />
                    </Grid>
                    <Grid item xs={3}>
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
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <ListItemText>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        {el.name}
                      </Grid>
                      <Grid item xs={3}>
                        {el.value}
                      </Grid>
                      <Grid item xs={3} />
                    </Grid>
                  </ListItemText>
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
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    id="standard-required"
                    value={option && option.name}
                    onChange={(e) =>
                      setOption({
                        ...option,
                        name: e.target.value,
                      })
                    }
                    className={classes.input}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="standard-required"
                    value={option && option.value}
                    onChange={(e) =>
                      setOption({
                        ...option,
                        value: e.target.value,
                      })
                    }
                    className={classes.input}
                  />
                </Grid>
                <Grid item xs={3}>
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
                </Grid>
              </Grid>
            </ListItemText>
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

export default ActionCategory;

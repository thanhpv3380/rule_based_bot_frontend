import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  TextField,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
  Folder as FolderIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@material-ui/icons';
import MenuToggle from '../../MenuToggle';
import useStyles from './index.style';

const GroupItem = ({ groupItem, handleChangeNameGroup }) => {
  const classes = useStyles();
  const history = useHistory();
  const botId = useSelector((state) => state.bot.bot);
  const [expanded, setExpanded] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [nameGroup, setNameGroup] = useState('');

  const handleChangeExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const handleToggleGroup = (e) => {
    e.stopPropagation();
    setIsChange((prev) => !prev);
  };

  const handleUpdateChangeNameGroup = (e) => {
    handleToggleGroup(e);
    handleChangeNameGroup(groupItem.id, nameGroup);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
  };

  const handleChangeName = (e) => {
    e.stopPropagation();
    setNameGroup(groupItem.name);
    setIsChange(true);
  };

  const handleDelete = () => {};
  const groupMenus = [
    {
      heading: 'Add',
      event: handleAdd,
    },
    {
      heading: 'Change Name',
      event: handleChangeName,
    },
    {
      heading: 'Delete',
      event: handleDelete,
    },
  ];

  const itemMenus = [
    {
      heading: 'Add',
      event: handleAdd,
    },
    {
      heading: 'Delete',
      event: handleDelete,
    },
  ];

  const handleClickItem = (id) => {
    history.push(`/bot/${botId}/actions/detail/${id}`);
  };
  return (
    <div className={classes.root}>
      {isChange ? (
        <Accordion expanded={false}>
          <AccordionSummary
            classes={{
              expanded: classes.container,
            }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Name Group"
              size="small"
              value={nameGroup}
              onChange={(e) => setNameGroup(e.target.value)}
            />
            <IconButton
              aria-label="edit"
              size="small"
              onClick={handleUpdateChangeNameGroup}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              aria-label="close"
              size="small"
              onClick={handleToggleGroup}
            >
              <CloseIcon />
            </IconButton>
          </AccordionSummary>
        </Accordion>
      ) : (
        <Accordion expanded={expanded} onClick={handleChangeExpanded}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <MenuToggle icon={<MoreVertIcon />} menus={groupMenus} />
            <Typography className={classes.heading}>
              {groupItem.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            {groupItem.children.length >= 0 ? (
              <List dense="false" className={classes.listItem}>
                {groupItem.children.map((el) => (
                  <ListItem
                    onClick={() => handleClickItem(el.id)}
                    className={classes.item}
                    button
                  >
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={el.name} />
                    <ListItemSecondaryAction>
                      <MenuToggle icon={<MoreVertIcon />} menus={itemMenus} />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            ) : (
              <div>No Data</div>
            )}
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
};

export default GroupItem;

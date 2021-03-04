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

const GroupItem = ({
  groupItem,
  handleChangeNameGroup,
  handleAddItem,
  handleDeleteGroup,
  handleDeleteItem,
}) => {
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
    e.stopPropagation();
    handleToggleGroup(e);
    handleChangeNameGroup(groupItem.id, nameGroup);
  };

  const handleAddItemInGroup = (e, id) => {
    e.stopPropagation();
    handleAddItem(id);
  };

  const handleChangeName = (e) => {
    e.stopPropagation();
    setNameGroup(groupItem.name);
    setIsChange(true);
  };

  const handlePrevDeleteGroup = (e, id) => {
    e.stopPropagation();
    handleDeleteGroup(id);
  };

  const handlePrevDeleteItem = (e, id) => {
    e.stopPropagation();
    handleDeleteItem(groupItem.id, id);
  };

  const groupMenus = [
    {
      heading: 'Add',
      event: handleAddItemInGroup,
    },
    {
      heading: 'Change Name',
      event: handleChangeName,
    },
    {
      heading: 'Delete',
      event: handlePrevDeleteGroup,
    },
  ];

  const itemMenus = [
    {
      heading: 'Delete',
      event: handlePrevDeleteItem,
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
            <MenuToggle
              id={groupItem.id}
              icon={<MoreVertIcon />}
              menus={groupMenus}
            />
            <Typography className={classes.heading}>
              {groupItem.name}
            </Typography>
          </AccordionSummary>
          {groupItem.children.length >= 0 && (
            <AccordionDetails className={classes.accordionDetails}>
              <List dense="false" className={classes.listItem}>
                {groupItem.children.map((el) => (
                  <ListItem
                    key={el.id}
                    onClick={() => handleClickItem(el.id)}
                    className={classes.item}
                    button
                  >
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={el.name} />
                    <ListItemSecondaryAction>
                      <MenuToggle
                        id={el.id}
                        icon={<MoreVertIcon />}
                        menus={itemMenus}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>{' '}
            </AccordionDetails>
          )}
        </Accordion>
      )}
    </div>
  );
};

export default GroupItem;

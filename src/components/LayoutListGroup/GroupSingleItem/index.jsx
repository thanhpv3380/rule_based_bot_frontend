import { Card, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
  MoreVert as MoreVertIcon,
  Notes as NotesIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';
import MenuToggle from '../../MenuToggle';
import useStyles from './index.style';

const GroupItem = ({
  groupItem,
  pagination,
  itemSelected,
  handleDeleteItem,
  handleClickItem,
}) => {
  const classes = useStyles();
  const [hoveringItemId, setHoveringItemId] = useState();

  const handleToggleHover = (id) => {
    setHoveringItemId(id);
  };

  const handlePrevDeleteItem = (e, id) => {
    e.stopPropagation();
    handleDeleteItem(groupItem.id, id);
  };

  const itemMenus = [
    {
      heading: 'Delete',
      event: handlePrevDeleteItem,
    },
  ];
  console.log(pagination);
  return (
    <div>
      {groupItem.children.length > 0 &&
        groupItem.children
          .slice(pagination.start, pagination.end)
          .map((item) => (
            <Card
              key={item.id}
              className={[
                classes.groupRoot,
                itemSelected === item.id && classes.itemSelected,
              ]}
              elevation={5}
            >
              <ListItem
                onClick={() => handleClickItem(item.id)}
                onMouseEnter={() => handleToggleHover(item.id)}
                onMouseLeave={() => handleToggleHover()}
              >
                <ListItemIcon>
                  <NotesIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {hoveringItemId === item.id && (
                  <MenuToggle
                    id={item.id}
                    icon={<MoreVertIcon />}
                    menus={itemMenus}
                  />
                )}
              </ListItem>
            </Card>
          ))}
    </div>
  );
};

export default GroupItem;

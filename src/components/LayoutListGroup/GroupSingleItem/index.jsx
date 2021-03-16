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
  handleDeleteItem,
  handleClickItem,
}) => {
  const classes = useStyles();
  const [isHovering, setIsHovering] = useState(false);

  const handleToggleHover = () => {
    setIsHovering((prev) => !prev);
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
                // itemSelected === item.id && classes.itemSelected,
              ]}
              elevation={5}
            >
              <ListItem
                onClick={() => handleClickItem(item.id)}
                onMouseEnter={handleToggleHover}
                onMouseLeave={handleToggleHover}
              >
                <ListItemIcon>
                  <NotesIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {isHovering && (
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

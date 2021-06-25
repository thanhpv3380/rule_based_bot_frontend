import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';
import { DeleteOutline as DeleteOutlineIcon } from '@material-ui/icons';
import { LinkNodeModel } from '../';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';

export interface LinkNodeWidgetProps {
  node: LinkNodeModel;
  engine: AdvancedDiagramEngine;
}

export interface LinkNodeWidgetState {}

const LinkNodeWidget = (props: LinkNodeWidgetProps) => {
  const { engine, node } = props;

  const handleDeleteLink = () => {
    if (node.path) {
      node.path.remove();
      node.remove();
      engine.repaintCanvas();
    }
  };

  const items = [
    {
      id: 1,
      heading: 'Delete path',
      icon: <DeleteOutlineIcon />,
      link: '',
      event: handleDeleteLink,
    },
  ];
  return (
    <List
      component="nav"
      aria-label="main mailbox folders"
      style={{
        backgroundColor: '#ffff',
        borderRadius: 10,
        minWidth: 180,
        border: '1px solid #ccc',
      }}
    >
      {items.map((el) => (
        <ListItem
          key={el.id}
          button
          onClick={() => {
            el.event();
          }}
        >
          <ListItemIcon style={{ color: 'black' }}>{el.icon}</ListItemIcon>
          <ListItemText>
            <ListItemText primary={el.heading} />
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default LinkNodeWidget;

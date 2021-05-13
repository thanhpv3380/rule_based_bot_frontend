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
import {
  RecordVoiceOver as RecordVoiceOverIcon,
  Sms as SmsIcon,
  Close as CloseIcon,
  DeviceHubSharp as DeviceHubSharpIcon,
} from '@material-ui/icons';
import { PortWidget } from '@projectstorm/react-diagrams-core';
import {
  BaseNodeModel,
  IntentNodeModel,
  ConditionNodeModel,
  MenuNodeModel,
  ActionNodeModel,
} from '../';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';

export interface MenuNodeWidgetProps {
  node: MenuNodeModel;
  engine: AdvancedDiagramEngine;
}

export interface MenuNodeWidgetState {}

const items = [
  {
    id: 1,
    heading: 'Intent',
    icon: <RecordVoiceOverIcon />,
    link: '',
  },
  {
    id: 2,
    heading: 'Condition',
    icon: <DeviceHubSharpIcon />,
    link: '',
  },
  {
    id: 3,
    heading: 'Action',
    icon: <SmsIcon />,
    link: '',
  },
];
const MenuNodeWidget = (props: MenuNodeWidgetProps) => {
  const { engine, node } = props;
  const { workflowId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = async (id) => {
    const listNode = engine.getModel().getActiveNodeLayer().getModels();
    const keys = Object.keys(listNode);
    const lastNode = listNode[keys[keys.length - 1]];

    if (lastNode instanceof MenuNodeModel) {
      // get position of last node
      const positionX = lastNode.getX();
      const positionY = lastNode.getY();

      // get link from last node
      const links = lastNode.getPorts()['in']['links'];
      const listKeysLink = Object.keys(links);
      const link = links[listKeysLink[listKeysLink.length - 1]];

      //create node and set position
      let targetNode: BaseNodeModel;
      if (id === 1) {
        targetNode = new IntentNodeModel();
      } else if (id === 2) {
        targetNode = new ConditionNodeModel();
      } else {
        targetNode = new ActionNodeModel();
      }

      targetNode.setPosition(positionX, positionY);
      // get port in of new node
      const portInTargetNode = targetNode.getPort('in');

      const sourceNode = node.nodeConnect;
      const canConnect = sourceNode.checkConnect(targetNode);

      if (canConnect) {
        link.getLastPoint().setPosition(positionX, positionY);
        if (link.getSourcePort().canLinkToPort(portInTargetNode)) {
          link.setTargetPort(portInTargetNode);
          portInTargetNode.reportPosition();
        }
        await targetNode.create(engine, sourceNode, workflowId);
        lastNode.remove();
        engine.repaintCanvas();
      } else {
        enqueueSnackbar("Node can't connect", { variant: 'error' });
      }
    }
  };

  let menu = items;
  return (
    <List
      component="nav"
      aria-label="main mailbox folders"
      style={{ backgroundColor: '#ffff', borderRadius: 10, minWidth: 180 }}
    >
      <PortWidget engine={engine} port={node.getPort('in')}>
        <div className="circle-select-port" />
      </PortWidget>
      {menu.map((el) => (
        <ListItem key={el.id} button onClick={() => handleClick(el.id)}>
          <ListItemIcon style={{ color: 'black' }}>{el.icon}</ListItemIcon>
          <ListItemText>
            <ListItemText primary={el.heading} />
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuNodeWidget;

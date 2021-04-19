import * as React from 'react';
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
import { ActionNodeModel } from '../';
import { IntentNodeModel, ConditionNodeModel, MenuNodeModel } from '../index';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';
import { BaseNodeModel } from '../BaseNodeModel';
import apis from '../../../../../apis';
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
export class MenuNodeWidget extends React.Component<
  MenuNodeWidgetProps,
  MenuNodeWidgetState
> {
  constructor(props: MenuNodeWidgetProps) {
    super(props);
    this.state = {};
  }

  handleClick = async (id) => {
    const listNode = this.props.engine
      .getModel()
      .getActiveNodeLayer()
      .getModels();
    const keys = Object.keys(listNode);
    const lastNode = listNode[keys[keys.length - 1]];

    if (lastNode instanceof MenuNodeModel) {
      // get position of last node
      const positionX = lastNode.getX();
      const positionY = lastNode.getY();

      //create node and set position
      let node;
      if (id === 1) {
        node = new IntentNodeModel();
      } else if (id === 2) {
        node = new ConditionNodeModel();
      } else {
        node = new ActionNodeModel();
      }

      node.setPosition(positionX, positionY);

      console.log(node, 'node');

      // get port in of new node
      const element_select_port = node.getPort('in');

      // get link from last node
      const links = lastNode.getPorts()['in']['links'];
      const listKeysLink = Object.keys(links);
      const link = links[listKeysLink[listKeysLink.length - 1]];

      link.getLastPoint().setPosition(positionX, positionY);
      if (link.getSourcePort().canLinkToPort(element_select_port)) {
        link.setTargetPort(element_select_port);
        element_select_port.reportPosition();
      }

      // call api add node
      const parent = [(link.getSourcePort().getParent() as BaseNodeModel).id];

      node.setPosition(positionX, positionY);
      const newNode = {
        type: node.getType(),
        position: {
          x: positionX,
          y: positionY,
        },
        parent,
      };

      const data = await apis.workFlow.addNode(
        '60772243b8287d30f84e3f6a',
        newNode,
      );
      if (data.status) {
        node.id = data.result.node.id;
        if (node instanceof ConditionNodeModel) {
          node.intentId = (link
            .getSourcePort()
            .getParent() as BaseNodeModel).id;
          node.itemId = data.result.node.condition;
        }
      }

      // add node to model
      const model = this.props.engine.getModel();
      model.addNode(node);

      // remove last node
      lastNode.remove();

      // update canvas
      this.props.engine.repaintCanvas();
    }
  };

  render() {
    console.log(this.props.node, 'node');
    const { node } = this.props;
    let menu = items;
    if (!node.isIntent) {
      menu = items.filter((el) => el.id !== 2);
    }
    return (
      <List
        component="nav"
        aria-label="main mailbox folders"
        style={{ backgroundColor: '#ffff', borderRadius: 10, minWidth: 180 }}
      >
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort('in')}
        >
          <div className="circle-select-port" />
        </PortWidget>
        {menu.map((el) => (
          <ListItem key={el.id} button onClick={() => this.handleClick(el.id)}>
            <ListItemIcon style={{ color: 'black' }}>{el.icon}</ListItemIcon>
            <ListItemText>
              <ListItemText primary={el.heading} />
            </ListItemText>
          </ListItem>
        ))}
      </List>
    );
  }
}

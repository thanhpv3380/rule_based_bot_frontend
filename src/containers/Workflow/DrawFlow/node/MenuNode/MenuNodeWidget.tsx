import * as React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import {
  RecordVoiceOver as RecordVoiceOverIcon,
  Sms as SmsIcon,
  Close as CloseIcon,
  DeviceHubSharp as DeviceHubSharpIcon,
} from "@material-ui/icons";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { MenuNodeModel } from "./MenuNodeModel";
import { ActionNodeModel } from "../ActionNode/ActionNodeModel";
import { IntentNodeModel } from "../IntentNode/IntentNodeModel";
import { ConditionNodeModel } from "../ConditionNode/ConditionNodeModel";
export interface MenuNodeWidgetProps {
  node: MenuNodeModel;
  engine: DiagramEngine;
}

export interface MenuNodeWidgetState {}

const items = [
  {
    id: 1,
    heading: "Intent",
    icon: <RecordVoiceOverIcon />,
    link: "",
  },
  {
    id: 2,
    heading: "Condition",
    icon: <DeviceHubSharpIcon />,
    link: "",
  },
  {
    id: 3,
    heading: "Action",
    icon: <SmsIcon />,
    link: "",
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

  handleClick = (id) => {
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

      // add node to model
      const model = this.props.engine.getModel();
      model.addNode(node);

      // get port in of new node
      const element_select_port = node.getPort("in");

      // get link from last node
      const links = lastNode.getPorts()["in"]["links"];
      const listKeysLink = Object.keys(links);
      const link = links[listKeysLink[listKeysLink.length - 1]];

      link.getLastPoint().setPosition(positionX, positionY);
      if (link.getSourcePort().canLinkToPort(element_select_port)) {
        link.setTargetPort(element_select_port);
        element_select_port.reportPosition();
      }

      // remove last node
      lastNode.remove();

      // update canvas
      this.props.engine.repaintCanvas();
    }
  };

  render() {
    return (
      <List
        component="nav"
        aria-label="main mailbox folders"
        style={{ backgroundColor: "#ffff", borderRadius: 10 }}
      >
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("in")}
        >
          <div className="circle-select-port" />
        </PortWidget>
        {items.map((el) => (
          <ListItem key={el.id} button onClick={() => this.handleClick(el.id)}>
            <ListItemIcon style={{ color: "black" }}>{el.icon}</ListItemIcon>
            <ListItemText>
              <ListItemText primary={el.heading} />
            </ListItemText>
          </ListItem>
        ))}
      </List>
    );
  }
}

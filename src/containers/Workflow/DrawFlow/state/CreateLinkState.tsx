import * as React from 'react';
import { useSnackbar } from 'notistack';
import {
  Action,
  ActionEvent,
  InputType,
  State,
} from '@projectstorm/react-canvas-core';
import { MenuNodeModel } from '../node/MenuNode';
import { AdvancedLinkModel, AdvancedPortModel } from '../customLink';
import { AdvancedDiagramEngine } from '../AdvancedDiagramEngine';
import { BaseNodeModel } from '../node';
import { getRealPosition } from '../../../../utils/node';
/**
 * This state is controlling the creation of a link.
 */
export class CreateLinkState extends State<AdvancedDiagramEngine> {
  sourcePort: AdvancedPortModel;
  link: AdvancedLinkModel;
  enqueueSnackbar: any;
  constructor() {
    super({ name: 'create-new-link' });
    this.enqueueSnackbar = useSnackbar().enqueueSnackbar;
    const context = this;
    this.registerAction(
      new Action({
        type: InputType.MOUSE_UP,
        fire: (actionEvent: ActionEvent<any>) => {
          //get current element
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(actionEvent);

          // get position
          const {
            event: { clientX, clientY },
          } = actionEvent;
          // get real position
          const { posX, posY } = getRealPosition(this.engine, clientX, clientY);

          if (element instanceof AdvancedPortModel && !this.sourcePort) {
            this.sourcePort = element;
            const link = this.sourcePort.createLinkModel();
            link.setSourcePort(this.sourcePort);
            link.getFirstPoint().setPosition(posX, posY);
            link.getLastPoint().setPosition(posX, posY);

            this.link = this.engine.getModel().addLink(link);
          } else if (element instanceof BaseNodeModel) {
            const portInCurrentNode = element.getPortsByType('in')[0];

            const sourceNode = this.link
              .getSourcePort()
              .getParent() as BaseNodeModel;
            if (
              portInCurrentNode &&
              portInCurrentNode instanceof AdvancedPortModel &&
              this.sourcePort &&
              portInCurrentNode !== this.sourcePort
            ) {
              if (this.sourcePort.canLinkToPort(portInCurrentNode)) {
                //check connect 2 node
                const data = sourceNode.checkConnect(element);
                if (!data.status) {
                  this.showNotification(data.message);
                  return;
                }

                this.link.setTargetPort(portInCurrentNode);
                portInCurrentNode.reportPosition();
                this.clearState();
                this.eject();
              }
            }
          } else if (
            element instanceof AdvancedLinkModel &&
            element['points'][1] === this.link.getLastPoint()
          ) {
            const sourceNode = this.link
              .getSourcePort()
              .getParent() as BaseNodeModel;
            // create menu node
            const node = new MenuNodeModel({
              nodeConnect: sourceNode,
            });
            node.setPosition(posX, posY);
            const model = this.engine.getModel();
            model.addNode(node);

            const element_select_port = node.getPort('in');
            if (this.sourcePort.canLinkToPort(element_select_port)) {
              this.link.setTargetPort(element_select_port);
              element_select_port.reportPosition();
              this.clearState();
              this.eject();
            }
          }
          this.engine.repaintCanvas();
        },
      }),
    );

    this.registerAction(
      new Action({
        type: InputType.MOUSE_MOVE,
        fire: (actionEvent: ActionEvent<any>) => {
          if (!this.link) return;
          const {
            event: { clientX, clientY },
          } = actionEvent;
          const { posX, posY } = getRealPosition(this.engine, clientX, clientY);
          this.link.getLastPoint().setPosition(posX, posY);
          this.engine.repaintCanvas();
        },
      }),
    );

    this.registerAction(
      new Action({
        type: InputType.KEY_UP,
        fire: (actionEvent: ActionEvent<any>) => {
          console.log('ascii');
          // on esc press remove any started link and pop back to default state
          if (actionEvent.event.keyCode === 27) {
            this.link.remove();
            this.clearState();
            this.eject();
            this.engine.repaintCanvas();
          }
        },
      }),
    );
  }

  clearState() {
    this.link = undefined;
    this.sourcePort = undefined;
  }

  showNotification(message?: String) {
    this.enqueueSnackbar(message || "Can't connect", {
      variant: 'error',
    });
  }
}

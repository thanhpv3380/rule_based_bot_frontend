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
import { BaseNodeModel } from '../node/BaseNodeModel';
import { ActionNodeModel, ConditionNodeModel, IntentNodeModel } from '../node';
import { NodeModel } from '@projectstorm/react-diagrams-core';

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
          console.log('link down');
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(actionEvent);
          const {
            event: { clientX, clientY },
          } = actionEvent;

          // get position and zoom level
          const ox = this.engine.getModel().getOffsetX();
          const oy = this.engine.getModel().getOffsetY();
          const zoomLevel = this.engine.getModel().getZoomLevel() / 100;
          const posX = (clientX - ox) / zoomLevel;
          const posY = (clientY - oy) / zoomLevel;

          if (element instanceof AdvancedPortModel && !this.sourcePort) {
            this.sourcePort = element;
            const link = this.sourcePort.createLinkModel();
            link.setSourcePort(this.sourcePort);

            link.getFirstPoint().setPosition(posX, posY);
            link.getLastPoint().setPosition(posX, posY);

            this.link = this.engine.getModel().addLink(link);
          } else if (element instanceof BaseNodeModel) {
            // get links in target node
            const listPortCurrentNode = element.getPorts();
            const portInCurrentNode =
              (listPortCurrentNode && listPortCurrentNode['in']) || null;
            const portOutCurrentNode =
              (listPortCurrentNode && listPortCurrentNode['out']) || null;

            const listLinkCurrentNode = [
              ...Object.keys(portInCurrentNode.getLinks()),
              ...Object.keys(portOutCurrentNode.getLinks()),
            ];

            if (
              portInCurrentNode &&
              portInCurrentNode instanceof AdvancedPortModel &&
              this.sourcePort &&
              portInCurrentNode !== this.sourcePort
            ) {
              const sourceNode = this.link.getSourcePort().getParent();
              if (this.sourcePort.canLinkToPort(portInCurrentNode)) {
                // get links in source node
                const listPortSourceNode = sourceNode.getPorts();
                const portInSourceNode =
                  (listPortSourceNode && listPortSourceNode['in']) || null;
                const portOutSourceNode =
                  (listPortSourceNode && listPortSourceNode['out']) || null;

                const listLinkSourceNode = [
                  ...Object.keys(portInSourceNode.getLinks()),
                  ...Object.keys(portOutSourceNode.getLinks()),
                ];

                // check allow connect
                const isConnect = this.checkAllowConnect(
                  sourceNode,
                  element,
                  portOutSourceNode.getLinks(),
                );
                if (!isConnect) return;

                // check 2 node is connected
                const mutualNodeId = this.checkMutualNodeId(
                  listLinkCurrentNode,
                  listLinkSourceNode,
                );

                if (!mutualNodeId) {
                  this.link.setTargetPort(portInCurrentNode);
                  portInCurrentNode.reportPosition();
                  this.clearState();
                  this.eject();
                } else {
                  this.enqueueSnackbar('Node is connected', {
                    variant: 'error',
                  });
                }
              }
            }
          } else if (
            element instanceof AdvancedLinkModel &&
            element['points'][1] === this.link.getLastPoint()
          ) {
            const sourceNode = this.link.getSourcePort().getParent();
            const node = new MenuNodeModel({
              isIntent: sourceNode instanceof IntentNodeModel,
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
          console.log('link move');
          if (!this.link) return;
          const {
            event: { clientX, clientY },
          } = actionEvent;
          const ox = this.engine.getModel().getOffsetX();
          const oy = this.engine.getModel().getOffsetY();
          const zoomLevel = this.engine.getModel().getZoomLevel() / 100;
          const posX = (clientX - ox) / zoomLevel;
          const posY = (clientY - oy) / zoomLevel;
          this.link.getLastPoint().setPosition(posX, posY);
          this.engine.repaintCanvas();
        },
      }),
    );

    this.registerAction(
      new Action({
        type: InputType.KEY_UP,
        fire: (actionEvent: ActionEvent<any>) => {
          console.log('link up');
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

  checkMutualNodeId(itemsA: Array<String>, itemsB: Array<String>) {
    const mutualNodeId = itemsA.find((el) => itemsB.indexOf(el) >= 0);
    return mutualNodeId;
  }

  clearState() {
    this.link = undefined;
    this.sourcePort = undefined;
  }

  checkAllowConnect(nodeSource: any, nodeTarget: any, listLinkSourceNode: any) {
    console.log(listLinkSourceNode);
    // check 2 intent connect
    if (
      nodeSource instanceof IntentNodeModel &&
      nodeTarget instanceof IntentNodeModel
    ) {
      this.enqueueSnackbar("2 Intent can't connect", {
        variant: 'error',
      });
      return false;
    }

    // check condition connect intent
    if (
      nodeSource instanceof ConditionNodeModel &&
      nodeTarget instanceof IntentNodeModel
    ) {
      this.enqueueSnackbar("Condition can't connect to Intent", {
        variant: 'error',
      });
      return false;
    }

    const nodesConnSource = {};
    listLinkSourceNode.forEach((el) => {
      const node = el.getTargetPort().getParent();
      if (node) {
        if (node instanceof IntentNodeModel) {
          nodesConnSource['IntentNodeModel'] =
            nodesConnSource['IntentNodeModel'] + 1 || 1;
        } else if (node instanceof ActionNodeModel) {
          nodesConnSource['ActionNodeModel'] =
            nodesConnSource['ActionNodeModel'] + 1 || 1;
        } else if (node instanceof ConditionNodeModel) {
          nodesConnSource['ConditionNodeModel'] =
            nodesConnSource['ConditionNodeModel'] + 1 || 1;
        }
      }
    });

    if (nodeSource instanceof IntentNodeModel) {
      if (nodeTarget instanceof ActionNodeModel) {
        if (nodesConnSource['ConditionNodeModel'] > 0) {
          this.enqueueSnackbar('Intent has connected to Condition', {
            variant: 'error',
          });
          return false;
        }
        if (nodesConnSource['ActionNodeModel'] > 0) {
          this.enqueueSnackbar("Intent can't connect to many Action", {
            variant: 'error',
          });
          return false;
        }
        return true;
      }
      if (nodeTarget instanceof ConditionNodeModel) {
        if (nodesConnSource['ActionNodeModel'] > 0) {
          this.enqueueSnackbar('Intent has connected to Action', {
            variant: 'error',
          });
          return false;
        }
        return true;
      }
      return true;
    }
    if (nodeSource instanceof ActionNodeModel) {
      if (nodeTarget instanceof ActionNodeModel) {
        if (nodesConnSource['ConditionNodeModel'] > 0) {
          this.enqueueSnackbar('Action has connected to Condition', {
            variant: 'error',
          });
          return false;
        }
        if (nodesConnSource['IntentNodeModel'] > 0) {
          this.enqueueSnackbar('Action has connected to Intent', {
            variant: 'error',
          });
          return false;
        }
        if (nodesConnSource['ActionNodeModel'] > 0) {
          this.enqueueSnackbar("Action can't connect to many Action", {
            variant: 'error',
          });
          return false;
        }
        return true;
      }
      if (nodeTarget instanceof ConditionNodeModel) {
        if (nodesConnSource['ActionNodeModel'] > 0) {
          this.enqueueSnackbar('Action has connected to Action', {
            variant: 'error',
          });
          return false;
        }
        if (nodesConnSource['IntentNodeModel'] > 0) {
          this.enqueueSnackbar('Action has connected to Intent', {
            variant: 'error',
          });
          return false;
        }
        return true;
      }
      if (nodeTarget instanceof IntentNodeModel) {
        if (nodesConnSource['ActionNodeModel'] > 0) {
          this.enqueueSnackbar('Action has connected to Action', {
            variant: 'error',
          });
          return false;
        }
        if (nodesConnSource['ConditionNodeModel'] > 0) {
          this.enqueueSnackbar('Action has connected to Condition', {
            variant: 'error',
          });
          return false;
        }
        return true;
      }
      return true;
    }

    if (nodeSource instanceof ConditionNodeModel) {
      if (nodeTarget instanceof ActionNodeModel) {
        if (nodesConnSource['ConditionNodeModel'] > 0) {
          this.enqueueSnackbar('Condition has connected to Condition', {
            variant: 'error',
          });
          return false;
        }
        if (nodesConnSource['ActionNodeModel'] > 0) {
          this.enqueueSnackbar("Condition can't connect to many Action", {
            variant: 'error',
          });
          return false;
        }
        return true;
      }
      if (nodeTarget instanceof ConditionNodeModel) {
        if (nodesConnSource['ActionNodeModel'] > 0) {
          this.enqueueSnackbar('Intent has connected to Action', {
            variant: 'error',
          });
          return false;
        }
        return true;
      }
      return true;
    }
    return true;
  }
}

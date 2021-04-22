import { MouseEvent, KeyboardEvent } from 'react';
import { Action, ActionEvent, InputType, State } from '@projectstorm/react-canvas-core';

import { MenuNodeModel } from '../node/MenuNode';
import { AdvancedLinkModel, AdvancedPortModel } from '../customLink';
import { AdvancedDiagramEngine } from '../AdvancedDiagramEngine';
import { BaseNodeModel } from '../node/BaseNodeModel';
import { ConditionNodeModel, IntentNodeModel } from '../node';
/**
 * This state is controlling the creation of a link.
 */
export class CreateLinkState extends State<AdvancedDiagramEngine> {
	// sourcePort: PortModel;
	// link: LinkModel;
	sourcePort: AdvancedPortModel;
	link: AdvancedLinkModel;

	constructor() {
		super({ name: 'create-new-link' });

		this.registerAction(
			new Action({
				type: InputType.MOUSE_UP,
				fire: (actionEvent: ActionEvent<any>) => {
					console.log("link down");
					const element = this.engine.getActionEventBus().getModelForEvent(actionEvent);
					const {
						event: { clientX, clientY }
					} = actionEvent;
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
						const listPortCurrentNode = element.getPorts();

						const portInCurrentNode = (listPortCurrentNode && listPortCurrentNode['in']) || null;
						const portOutCurrentNode = (listPortCurrentNode && listPortCurrentNode['out']) || null;

						if (portInCurrentNode && portInCurrentNode instanceof AdvancedPortModel && this.sourcePort && portInCurrentNode !== this.sourcePort) {
							const sourceNode = this.link.getSourcePort().getParent();
							if (this.sourcePort.canLinkToPort(portInCurrentNode)) {
								//console.log("check", element, sourceNode.getID());

								const listPortSourceNode = sourceNode.getPorts();
								const portInSourceNode = (listPortSourceNode && listPortSourceNode['in']) || null;
								const portOutSourceNode = (listPortSourceNode && listPortSourceNode['out']) || null;

								const listLinkCurrentNode = [...Object.keys(portInCurrentNode.getLinks()), ...Object.keys(portOutCurrentNode.getLinks())];
								const listLinkSourceNode = [...Object.keys(portInSourceNode.getLinks()), ...Object.keys(portOutSourceNode.getLinks())];

								console.log("check", listLinkCurrentNode, listLinkSourceNode)
								const mutualNodeId = this.checkMutualNodeId(listLinkCurrentNode, listLinkSourceNode);
								if (!mutualNodeId) {
									// when click in Condition Node
									// if (element instanceof ConditionNodeModel) {
									// 	console.log(element.itemId, "itemID");
									// 	if (sourceNode instanceof IntentNodeModel) {
									// 		element.intentId = sourceNode.itemId;
									// 	} else {
									// 		//Todo alert thôgn báo action không thể nối với condition
									// 		return;
									// 	}
									// }

									// connect to port of current node
									this.link.setTargetPort(portInCurrentNode);
									portInCurrentNode.reportPosition();
									this.clearState();
									this.eject();
								} else {
									alert("node is connected")
								}




							}
						}
					}
					else if (element instanceof AdvancedLinkModel && element['points'][1] === this.link.getLastPoint()) {
						const sourceNode = this.link.getSourcePort().getParent();
						const node = new MenuNodeModel({ isIntent: sourceNode instanceof IntentNodeModel });
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
				}
			})
		);

		this.registerAction(
			new Action({
				type: InputType.MOUSE_MOVE,
				fire: (actionEvent: ActionEvent<any>) => {
					console.log("link move");
					if (!this.link) return;
					const { event: { clientX, clientY } } = actionEvent;
					const ox = this.engine.getModel().getOffsetX();
					const oy = this.engine.getModel().getOffsetY();
					const zoomLevel = this.engine.getModel().getZoomLevel() / 100;
					const posX = (clientX - ox) / zoomLevel;
					const posY = (clientY - oy) / zoomLevel;
					this.link.getLastPoint().setPosition(posX, posY);
					this.engine.repaintCanvas();
				}
			})
		);

		this.registerAction(
			new Action({
				type: InputType.KEY_UP,
				fire: (actionEvent: ActionEvent<any>) => {
					console.log("link up");
					// on esc press remove any started link and pop back to default state
					if (actionEvent.event.keyCode === 27) {
						this.link.remove();
						this.clearState();
						this.eject();
						this.engine.repaintCanvas();
					}
				}
			})
		);
	}

	checkMutualNodeId(itemsA: Array<String>, itemsB: Array<String>) {
		const mutualNodeId = itemsA.find(el => itemsB.indexOf(el) >= 0);
		return mutualNodeId;
	}

	clearState() {
		this.link = undefined;
		this.sourcePort = undefined;
	}
}

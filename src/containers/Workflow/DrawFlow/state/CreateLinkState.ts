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

					console.log(element, "element");
					if (element instanceof AdvancedPortModel && !this.sourcePort) {
						this.sourcePort = element;
						console.log(element, "source port");
						console.log(this.sourcePort.getParent() instanceof IntentNodeModel, "instanof");

						const link = this.sourcePort.createLinkModel();
						link.setSourcePort(this.sourcePort);
						link.getFirstPoint().setPosition(clientX - ox, clientY - oy);
						link.getLastPoint().setPosition(clientX - ox + 20, clientY - oy + 20);

						this.link = this.engine.getModel().addLink(link);
					} else if (element instanceof BaseNodeModel) {
						const listPort = element.getPorts();
						const portCurrentPort = (listPort && listPort['in']) || null;
						if (portCurrentPort && portCurrentPort instanceof AdvancedPortModel && this.sourcePort && portCurrentPort !== this.sourcePort) {
							const sourceNode = this.link.getSourcePort().getParent();
							if (this.sourcePort.canLinkToPort(portCurrentPort)) {
								if (element instanceof ConditionNodeModel) {
									console.log(element.itemId, "itemID");
									if (sourceNode instanceof IntentNodeModel) {
										element.intentId = sourceNode.itemId;
									} else {
										//Todo alert thôgn báo action không thể nối với condition
										return;
									}
								}
								this.link.setTargetPort(portCurrentPort);
								portCurrentPort.reportPosition();
								this.clearState();
								this.eject();
							}
						}
					}
					else if (element instanceof AdvancedLinkModel && element['points'][1] === this.link.getLastPoint()) {
						const sourceNode = this.link.getSourcePort().getParent();
						const node4 = new MenuNodeModel({ isIntent: sourceNode instanceof IntentNodeModel });
						node4.setPosition(clientX - ox, clientY - oy);
						const model = this.engine.getModel();
						model.addNode(node4);

						const element_select_port = node4.getPort('in');
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
					const { event } = actionEvent;

					//console.log("move", event.clientX, event.clientY);
					this.link.getLastPoint().setPosition(event.clientX, event.clientY);
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

	clearState() {
		this.link = undefined;
		this.sourcePort = undefined;
	}
}

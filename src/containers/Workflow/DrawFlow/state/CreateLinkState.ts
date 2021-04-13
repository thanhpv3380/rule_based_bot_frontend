import { MouseEvent, KeyboardEvent } from 'react';
import { Action, ActionEvent, InputType, State } from '@projectstorm/react-canvas-core';
import { PortModel, LinkModel, DiagramEngine } from '@projectstorm/react-diagrams-core';

import { MenuNodeModel } from '../node/MenuNode/MenuNodeModel';
import { ActionNodeModel } from '../node/ActionNode/ActionNodeModel'
import { DefaultPortModel, PathFindingLinkModel } from '@projectstorm/react-diagrams';
import { AdvancedLinkModel, AdvancedPortModel } from '../customLink';
/**
 * This state is controlling the creation of a link.
 */
export class CreateLinkState extends State<DiagramEngine> {
	sourcePort: PortModel;
	link: LinkModel;

	constructor() {
		super({ name: 'create-new-link' });

		this.registerAction(
			new Action({
				type: InputType.MOUSE_UP,
				fire: (actionEvent: ActionEvent<MouseEvent>) => {
					console.log("link down");
					const element = this.engine.getActionEventBus().getModelForEvent(actionEvent);
					const {
						event: { clientX, clientY }
					} = actionEvent;

					const ox = this.engine.getModel().getOffsetX();
					const oy = this.engine.getModel().getOffsetY();

					console.log(element);
					const listPost = element['ports'];
					const portCurrentPort = (listPost && listPost['in']) || null;

					if (element instanceof PortModel && !this.sourcePort) {
						this.sourcePort = element;

						const link = this.sourcePort.createLinkModel();
						link.setSourcePort(this.sourcePort);
						link.getFirstPoint().setPosition(clientX - ox, clientY - oy);
						// link.getLastPoint().setPosition(clientX - ox + 20, clientY - oy + 20);

						this.link = this.engine.getModel().addLink(link);
					} else if (portCurrentPort && portCurrentPort instanceof PortModel && this.sourcePort && portCurrentPort !== this.sourcePort) {
						if (this.sourcePort.canLinkToPort(portCurrentPort)) {
							this.link.setTargetPort(portCurrentPort);
							portCurrentPort.reportPosition();
							this.clearState();
							this.eject();
						}
					} else if (element === this.link.getLastPoint()) {
						const node4 = new MenuNodeModel({ color: 'rgb(0,192,255)' });
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
				fire: (actionEvent: ActionEvent<MouseEvent>) => {
					console.log("link move");
					if (!this.link) return;
					const { event } = actionEvent;
					console.log(event.pageX, event.pageY);

					//console.log("move", event.clientX, event.clientY);
					this.link.getLastPoint().setPosition(event.clientX, event.clientY);
					this.engine.repaintCanvas();
				}
			})
		);

		this.registerAction(
			new Action({
				type: InputType.KEY_UP,
				fire: (actionEvent: ActionEvent<KeyboardEvent>) => {
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

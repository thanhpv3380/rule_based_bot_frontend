import { MouseEvent } from 'react';
import {
	SelectingState,
	State,
	Action,
	InputType,
	ActionEvent,
	DragCanvasState
} from '@projectstorm/react-canvas-core';
import { PortModel, DiagramEngine, DragDiagramItemsState } from '@projectstorm/react-diagrams-core';
import { CreateLinkState } from './CreateLinkState';
import { MenuNodeModel } from '../node/MenuNode/MenuNodeModel';
import { AdvancedDiagramEngine } from "../AdvancedDiagramEngine";
import { AdvancedPortModel } from '../customLink';

export class DefaultState extends State<AdvancedDiagramEngine> {
	dragCanvas: DragCanvasState;
	createLink: CreateLinkState;
	dragItems: DragDiagramItemsState;

	constructor() {
		super({ name: 'starting-state' });
		this.childStates = [new SelectingState()];
		this.dragCanvas = new DragCanvasState();
		this.createLink = new CreateLinkState();
		this.dragItems = new DragDiagramItemsState();

		// determine what was clicked on
		this.registerAction(
			new Action({
				type: InputType.MOUSE_DOWN,
				fire: (event: ActionEvent<MouseEvent>) => {
					const element = this.engine.getActionEventBus().getModelForEvent(event);

					// click on canvas
					if (!element) {
						console.log("1");
						this.handleDeleteSelectNode();
						this.transitionWithEvent(this.dragCanvas, event);
					}
					// click on Port
					else if (element instanceof AdvancedPortModel) {
						console.log("2");
						this.handleDeleteSelectNode();
						this.transitionWithEvent(this.createLink, event);

					}
					// click on item
					else {
						console.log("3");
						if (!(element instanceof MenuNodeModel)) {
							this.handleDeleteSelectNode();
						}
						//this.transitionWithEvent(this.createLink, event);
						this.transitionWithEvent(this.dragItems, event);
					}
				}
			})
		);

		this.registerAction(
			new Action({
				type: InputType.MOUSE_UP,
				fire: (event: ActionEvent<MouseEvent>) => {
					const model = this.engine.getMouseElement(event.event);
					console.log("up");
					if (!(model instanceof AdvancedPortModel)) return;

				}
			}
			))
	}

	handleDeleteSelectNode() {
		const listNode = this.engine.getModel().getActiveNodeLayer().getModels();
		const keys = Object.keys(listNode);
		const lastNode = listNode[keys[keys.length - 1]];
		if (lastNode instanceof MenuNodeModel) {
			lastNode.remove();
			this.engine.repaintCanvas();
		}
	}
}


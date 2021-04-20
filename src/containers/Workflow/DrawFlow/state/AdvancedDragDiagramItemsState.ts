import { MouseEvent } from 'react';
import { AbstractDisplacementStateEvent, Action, ActionEvent, BasePositionModel, InputType, MoveItemsState, State } from "@projectstorm/react-canvas-core";
import { AdvancedDiagramEngine } from "../AdvancedDiagramEngine";
import { getCookie, setCookie } from '../../../../utils/cookie'
import apis from '../../../../apis';
import { BaseNodeModel } from '../node/BaseNodeModel';
import { Node } from '../index';
import { NodeModel } from '@projectstorm/react-diagrams';
import { ConditionNodeModel } from '../node';

export class AdvancedDragDiagramItemsState extends MoveItemsState<AdvancedDiagramEngine> {
    constructor() {
        super();
        this.registerAction(new Action({
            type: InputType.MOUSE_DOWN,
            fire: (event: ActionEvent<MouseEvent>) => {
                const element = this.engine.getActionEventBus().getModelForEvent(event);
                if (!element) {
                    return;
                }
                if (!element.isSelected()) {
                    this.engine.getModel().clearSelection();
                }
                element.setSelected(true);
                this.engine.repaintCanvas();
            }
        }));
    }
    activated(previous: State) {
        super.activated(previous);
        super.initialPositions = {};
    }
    async fireMouseMoved(event: AbstractDisplacementStateEvent) {
        const items = this.engine.getModel().getSelectedEntities();
        const model = this.engine.getModel();

        for (let item of items) {
            if (item instanceof BasePositionModel) {
                if (item.isLocked()) {
                    continue;
                }
                if (!this.initialPositions[item.getID()]) {
                    this.initialPositions[item.getID()] = {
                        point: item.getPosition(),
                        item: item
                    };
                }

                const pos = this.initialPositions[item.getID()].point;

                item.setPosition(model.getGridPosition(pos.x + event.virtualDisplacementX), model.getGridPosition(pos.y + event.virtualDisplacementY));
            }
        }
        this.engine.repaintCanvas();
    }
}
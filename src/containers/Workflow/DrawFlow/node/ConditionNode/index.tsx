import * as React from 'react';
import ConditionNodeWidget from './ConditionNodeWidget';
import {
  AbstractReactFactory,
  BaseModel,
  DeserializeEvent,
  GenerateWidgetEvent,
} from '@projectstorm/react-canvas-core';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { BaseNodeModel } from '../BaseNodeModel';
import { NodeConnect } from '../Node.types';

export interface ConditionNodeModelOptions extends BaseModelOptions {
  color?: string;
  id?: string;
  itemId?: string;
  nodeInfo?: any;
}
export class ConditionNodeModel extends BaseNodeModel {
  constructor(options: ConditionNodeModelOptions = {}) {
    super({
      ...options,
      type: 'CONDITION',
    });
  }
  serialize() {
    return {
      ...super.serialize(),
      color: this.color,
    };
  }
  deserialize(event: DeserializeEvent<this>): void {
    super.deserialize(event);
    this.color = event.data.color;
  }
}
export class ConditionNodeFactory extends AbstractReactFactory<
  ConditionNodeModel,
  AdvancedDiagramEngine
> {
  constructor() {
    super('CONDITION');
  }

  generateModel(initialConfig: any) {
    return new ConditionNodeModel();
  }

  generateReactWidget(
    event: GenerateWidgetEvent<ConditionNodeModel>,
  ): JSX.Element {
    return (
      <ConditionNodeWidget
        engine={this.engine as AdvancedDiagramEngine}
        node={event.model}
      />
    );
  }
}

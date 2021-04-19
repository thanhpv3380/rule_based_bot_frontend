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

export interface ConditionNodeModelOptions extends BaseModelOptions {
  color?: string;
  id?: string;
  itemId?: string;
  intentId?: string;
}
export class ConditionNodeModel extends BaseNodeModel {
  intentId?: string;
  constructor(options: ConditionNodeModelOptions = {}) {
    super({
      ...options,
      type: 'CONDITION',
    });
    this.intentId = options.intentId;
  }
  setIntentId(intentId: string) {
    this.intentId = intentId;
  }
  serialize() {
    return {
      ...super.serialize(),
      color: this.color,
      intentId: this.intentId,
    };
  }
  deserialize(event: DeserializeEvent<this>): void {
    super.deserialize(event);
    this.color = event.data.color;
    this.intentId = event.data.intentId;
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

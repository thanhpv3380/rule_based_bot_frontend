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
  intents?: NodeConnect[];
}
export class ConditionNodeModel extends BaseNodeModel {
  intents?: NodeConnect[];
  constructor(options: ConditionNodeModelOptions = {}) {
    super({
      ...options,
      type: 'CONDITION',
    });
    this.intents = options.intents;
  }
  setIntent(intents: NodeConnect[]) {
    this.intents = intents;
  }
  serialize() {
    return {
      ...super.serialize(),
      color: this.color,
      intents: this.intents,
    };
  }
  deserialize(event: DeserializeEvent<this>): void {
    super.deserialize(event);
    this.color = event.data.color;
    this.intents = event.data.intents;
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

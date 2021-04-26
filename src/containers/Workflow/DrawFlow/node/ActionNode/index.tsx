import * as React from 'react';
import ActionNodeWidget from './ActionNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { BaseNodeModel } from '../BaseNodeModel';

export interface ActionNodeModelOptions extends BaseModelOptions {
  color?: string;
  id?: string;
  itemId?: string;
  nodeInfo?: any;
}
export class ActionNodeModel extends BaseNodeModel {
  constructor(options: ActionNodeModelOptions = {}) {
    super({
      ...options,
      type: 'ACTION',
    });
  }
}
export class ActionNodeFactory extends AbstractReactFactory<
  ActionNodeModel,
  DiagramEngine
> {
  constructor() {
    super('ACTION');
  }

  generateModel(initialConfig: any) {
    return new ActionNodeModel();
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <ActionNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    );
  }
}

import * as React from 'react';
import ActionAskAgainNodeWidget from './ActionAskAgainNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { BaseNodeModel } from '../BaseNodeModel';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';

export interface ActionAskAgainNodeModelOptions extends BaseModelOptions {
  color?: string;
  id?: string;
  itemId?: string;
  nodeInfo?: any;
}
export class ActionAskAgainNodeModel extends BaseNodeModel {
  constructor(options: ActionAskAgainNodeModelOptions = {}) {
    super({
      ...options,
      type: 'ACTION_ASK_AGAIN',
    });
  }
}
export class ActionAskAgainNodeFactory extends AbstractReactFactory<
  ActionAskAgainNodeModel,
  AdvancedDiagramEngine
> {
  constructor() {
    super('ACTION_ASK_AGAIN');
  }

  generateModel(initialConfig: any) {
    return new ActionAskAgainNodeModel();
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <ActionAskAgainNodeWidget
        engine={this.engine as AdvancedDiagramEngine}
        node={event.model}
      />
    );
  }
}

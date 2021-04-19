import * as React from 'react';
import IntentNodeWidget from './IntentNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { BaseNodeModel } from '../BaseNodeModel';

export interface IntentNodeModelOptions extends BaseModelOptions {
  color?: string;
  id?: string;
  itemId?: string;
}

export class IntentNodeModel extends BaseNodeModel {
  constructor(options: IntentNodeModelOptions = {}) {
    super({
      ...options,
      type: 'INTENT',
    });
  }
}
export class IntentNodeFactory extends AbstractReactFactory<
  IntentNodeModel,
  AdvancedDiagramEngine
> {
  constructor() {
    super('INTENT');
  }

  generateModel(initialConfig) {
    return new IntentNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <IntentNodeWidget
        engine={this.engine as AdvancedDiagramEngine}
        node={event.model}
      />
    );
  }
}

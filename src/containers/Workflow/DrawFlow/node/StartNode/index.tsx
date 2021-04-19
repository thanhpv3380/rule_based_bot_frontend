import * as React from 'react';
import StartNodeWidget from './StartNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';

import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { BaseNodeModel } from '../BaseNodeModel';

export interface StartNodeModelOptions extends BaseModelOptions {
  color?: string;
  id?: string;
}

export class StartNodeModel extends BaseNodeModel {
  constructor(options: StartNodeModelOptions = {}) {
    super({
      ...options,
      type: 'START',
    });
  }
}

export class StartNodeFactory extends AbstractReactFactory<
  StartNodeModel,
  AdvancedDiagramEngine
> {
  constructor() {
    super('START');
  }

  generateModel(initialConfig) {
    return new StartNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <StartNodeWidget
        engine={this.engine as AdvancedDiagramEngine}
        node={event.model}
      />
    );
  }
}

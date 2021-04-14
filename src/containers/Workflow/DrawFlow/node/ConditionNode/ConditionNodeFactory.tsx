import * as React from 'react';
import { ConditionNodeModel } from './ConditionNodeModel';
import ConditionNodeWidget from './ConditionNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';

export class ConditionNodeFactory extends AbstractReactFactory<
  ConditionNodeModel,
  AdvancedDiagramEngine
> {
  constructor() {
    super('node-condition');
  }

  generateModel(initialConfig) {
    return new ConditionNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <ConditionNodeWidget
        engine={this.engine as AdvancedDiagramEngine}
        node={event.model}
      />
    );
  }
}

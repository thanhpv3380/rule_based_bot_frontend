import * as React from 'react';
import { MenuNodeModel } from './MenuNodeModel';
import { MenuNodeWidget } from './MenuNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';

export class MenuNodeFactory extends AbstractReactFactory<
  MenuNodeModel,
  AdvancedDiagramEngine
> {
  constructor() {
    super('menu-node');
  }

  generateModel(initialConfig) {
    return new MenuNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <MenuNodeWidget
        engine={this.engine as AdvancedDiagramEngine}
        node={event.model}
      />
    );
  }
}

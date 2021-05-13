import * as React from 'react';
import MenuNodeWidget from './MenuNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { BaseNodeModel } from '../BaseNodeModel';
export interface MenuNodeModelOptions extends BaseModelOptions {
  color?: string;
  nodeConnect?: BaseNodeModel;
}
export class MenuNodeModel extends BaseNodeModel {
  nodeConnect?: BaseNodeModel;
  constructor(options: MenuNodeModelOptions = {}) {
    super({
      ...options,
      type: 'MENU',
    });
    this.nodeConnect = options.nodeConnect;
  }
}
export class MenuNodeFactory extends AbstractReactFactory<
  MenuNodeModel,
  AdvancedDiagramEngine
> {
  constructor() {
    super('MENU');
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

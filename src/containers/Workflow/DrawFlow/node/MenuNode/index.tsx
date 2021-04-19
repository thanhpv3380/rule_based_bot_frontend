import * as React from 'react';
import MenuNodeWidget from './MenuNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { BaseNodeModel } from '../BaseNodeModel';
export interface MenuNodeModelOptions extends BaseModelOptions {
  color?: string;
  isIntent?: boolean;
}
export class MenuNodeModel extends BaseNodeModel {
  isIntent?: boolean;
  constructor(options: MenuNodeModelOptions = {}) {
    super({
      ...options,
      type: 'MENU',
    });
    this.isIntent = options.isIntent;
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

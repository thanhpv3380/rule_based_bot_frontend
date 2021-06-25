import * as React from 'react';
import LinkNodeWidget from './LinkNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { BaseNodeModel } from '../BaseNodeModel';
import { AdvancedLinkModel } from '../../customLink';

export interface LinkNodeModelOptions extends BaseModelOptions {
  color?: string;
  path?: AdvancedLinkModel;
}

export class LinkNodeModel extends BaseNodeModel {
  path?: AdvancedLinkModel;
  constructor(options: LinkNodeModelOptions = {}) {
    super({
      ...options,
      type: 'LINK',
    });
    this.path = options.path;
  }
}
export class LinkNodeFactory extends AbstractReactFactory<
  LinkNodeModel,
  AdvancedDiagramEngine
> {
  constructor() {
    super('LINK');
  }

  generateModel(initialConfig) {
    return new LinkNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <LinkNodeWidget
        engine={this.engine as AdvancedDiagramEngine}
        node={event.model}
      />
    );
  }
}

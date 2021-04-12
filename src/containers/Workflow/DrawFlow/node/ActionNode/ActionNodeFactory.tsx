import * as React from "react";
import { ActionNodeModel } from "./ActionNodeModel";
import ActionNodeWidget from "./ActionNodeWidget";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export class ActionNodeFactory extends AbstractReactFactory<
  ActionNodeModel,
  DiagramEngine
> {
  constructor() {
    super("action-node");
  }

  generateModel(initialConfig) {
    return new ActionNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <ActionNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    );
  }
}

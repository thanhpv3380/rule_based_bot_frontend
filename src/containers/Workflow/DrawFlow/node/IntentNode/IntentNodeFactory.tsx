import * as React from "react";
import { IntentNodeModel } from "./IntentNodeModel";
import IntentNodeWidget from "./IntentNodeWidget";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export class IntentNodeFactory extends AbstractReactFactory<
  IntentNodeModel,
  DiagramEngine
> {
  constructor() {
    super("ts-custom-node");
  }

  generateModel(initialConfig) {
    return new IntentNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <IntentNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    );
  }
}

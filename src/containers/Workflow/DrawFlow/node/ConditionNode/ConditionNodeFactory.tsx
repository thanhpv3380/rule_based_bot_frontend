import * as React from "react";
import { ConditionNodeModel } from "./ConditionNodeModel";
import ConditionNodeWidget from "./ConditionNodeWidget";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export class ConditionNodeFactory extends AbstractReactFactory<
  ConditionNodeModel,
  DiagramEngine
> {
  constructor() {
    super("node-condition");
  }

  generateModel(initialConfig) {
    return new ConditionNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <ConditionNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    );
  }
}

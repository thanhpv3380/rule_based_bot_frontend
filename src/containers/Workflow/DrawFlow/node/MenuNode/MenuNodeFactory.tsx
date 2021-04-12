import * as React from "react";
import { MenuNodeModel } from "./MenuNodeModel";
import { MenuNodeWidget } from "./MenuNodeWidget";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export class MenuNodeFactory extends AbstractReactFactory<
  MenuNodeModel,
  DiagramEngine
> {
  constructor() {
    super("menu-node");
  }

  generateModel(initialConfig) {
    return new MenuNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <MenuNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    );
  }
}

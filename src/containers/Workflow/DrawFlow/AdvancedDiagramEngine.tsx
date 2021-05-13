import { DiagramEngine } from '@projectstorm/react-diagrams';
import { AdvancedDiagramModel } from './models/AdvancedDiagramModel';
import {
  CanvasEngineListener,
  CanvasEngineOptions,
} from '@projectstorm/react-canvas-core';

export class AdvancedDiagramEngine extends DiagramEngine {
  protected model: AdvancedDiagramModel;
  constructor(options?: CanvasEngineOptions) {
    super(options);
  }
  setModel(model: AdvancedDiagramModel) {
    this.model = model;
    if (this.canvas) {
      requestAnimationFrame(() => {
        this.repaintCanvas();
      });
    }
  }
  getModel(): AdvancedDiagramModel {
    console.log('haha');
    return this.model;
  }
}

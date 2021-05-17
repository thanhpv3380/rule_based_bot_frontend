import * as SRD from '@projectstorm/react-diagrams';

import { CustomDeleteItemsAction } from "./actionEvent/CustomDeleteItemsAction";
import { DefaultState } from "./state/DefaultState";
import { AdvancedLinkFactory } from "./customLink";

import { StartNodeFactory, ActionNodeFactory, IntentNodeFactory, ConditionNodeFactory, MenuNodeFactory, ActionAskAgainNodeFactory } from './node';

export class Application {
    protected activeModel: SRD.DiagramModel;
    protected diagramEngine: SRD.DiagramEngine;

    constructor() {
        this.diagramEngine = SRD.default({ registerDefaultDeleteItemsAction: false });
        this.newModel();
    }

    public newModel() {
        this.activeModel = new SRD.DiagramModel();
        this.diagramEngine.setModel(this.activeModel);
        this.diagramEngine.getNodeFactories().registerFactory(new StartNodeFactory());
        this.diagramEngine.getNodeFactories().registerFactory(new IntentNodeFactory());
        this.diagramEngine.getNodeFactories().registerFactory(new ConditionNodeFactory());
        this.diagramEngine.getNodeFactories().registerFactory(new ActionNodeFactory());
        this.diagramEngine.getNodeFactories().registerFactory(new MenuNodeFactory());
        this.diagramEngine.getNodeFactories().registerFactory(new ActionAskAgainNodeFactory());
        this.diagramEngine.getLinkFactories().registerFactory(new AdvancedLinkFactory());

        // const node = new StartNodeModel();
        // node.setPosition(50, 50);
        // node.id = "607ea6c1eb5a0c450cf140c5";

        // this.activeModel.addNode(node);
        this.diagramEngine.getActionEventBus().registerAction(new CustomDeleteItemsAction());
        this.diagramEngine.getStateMachine().pushState(new DefaultState());
    }

    public getActiveDiagram(): SRD.DiagramModel {
        return this.activeModel;
    }

    public getDiagramEngine(): SRD.DiagramEngine {
        return this.diagramEngine;
    }
}
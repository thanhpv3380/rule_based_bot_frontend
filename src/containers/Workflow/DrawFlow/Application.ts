import * as SRD from '@projectstorm/react-diagrams';
import { DefaultNodeModel, DefaultPortModel, PathFindingLinkFactory } from '@projectstorm/react-diagrams';

import { CustomDeleteItemsAction } from "./actionEvent/CustomDeleteItemsAction";
import { DefaultState } from "./state/DefaultState";

import { AdvancedLinkFactory, AdvancedPortModel, AdvancedLinkModel } from "./customLink";

import { StartNodeFactory, ActionNodeFactory, IntentNodeFactory, ConditionNodeFactory, MenuNodeFactory, StartNodeModel, ActionNodeModel, IntentNodeModel, ConditionNodeModel } from './node';

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
        this.diagramEngine.getLinkFactories().registerFactory(new AdvancedLinkFactory());

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
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

        // const nodeStart = new StartNodeModel();
        // nodeStart.setPosition(550, 100);

        // const node1 = new ConditionNodeModel();
        // node1.setPosition(50, 50);

        // const node2 = new IntentNodeModel();
        // node2.setPosition(400, 200);

        // const node3 = new ActionNodeModel();

        // node3.setPosition(1000, 300);

        // const link1 = new AdvancedLinkModel();
        // link1.setSourcePort(node1.getPort("out"));
        // link1.setTargetPort(node2.getPort("in"));

        // const link2 = new AdvancedLinkModel();
        // link2.setTargetPort(node1.getPort("out"));
        // link2.setSourcePort(node3.getPort("in"));
        // console.log(node3);

        // this.activeModel.addAll(nodeStart, node1, node2, node3, link1, link2);

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
import * as SRD from '@projectstorm/react-diagrams';
import { DefaultNodeModel, DefaultPortModel, PathFindingLinkFactory } from '@projectstorm/react-diagrams';

import { ConditionNodeFactory } from "./node/ConditionNode/ConditionNodeFactory";
import { IntentNodeFactory } from "./node/IntentNode/IntentNodeFactory";
import { ActionNodeFactory } from "./node/ActionNode/ActionNodeFactory";
import { MenuNodeFactory } from "./node/MenuNode/MenuNodeFactory";

import { CustomDeleteItemsAction } from "./actionEvent/CustomDeleteItemsAction";
import { DefaultState } from "./state/DefaultState";

import { AdvancedLinkFactory, AdvancedPortModel, AdvancedLinkModel } from "./customLink";

import { ConditionNodeModel } from "./node/ConditionNode/ConditionNodeModel";
import { IntentNodeModel } from "./node/IntentNode/IntentNodeModel";
import { ActionNodeModel } from "./node/ActionNode/ActionNodeModel";

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
        this.diagramEngine.getNodeFactories().registerFactory(new IntentNodeFactory());
        this.diagramEngine.getNodeFactories().registerFactory(new ConditionNodeFactory());
        this.diagramEngine.getNodeFactories().registerFactory(new ActionNodeFactory());
        this.diagramEngine.getNodeFactories().registerFactory(new MenuNodeFactory());
        this.diagramEngine.getLinkFactories().registerFactory(new AdvancedLinkFactory());

        //Test action intent
        const node1 = new ConditionNodeModel({ color: "rgb(192,255,0)" });
        node1.setPosition(50, 50);

        const node2 = new IntentNodeModel({ color: "rgb(0,192,255)" });
        node2.setPosition(400, 100);
        console.log(node2);

        const node3 = new ActionNodeModel({ color: "rgb(0,192,255)" });
        node3.setPosition(400, 300);

        const link1 = new AdvancedLinkModel();
        link1.setSourcePort(node1.getPort("out"));
        link1.setTargetPort(node2.getPort("in"));

        const link2 = new AdvancedLinkModel();
        link2.setTargetPort(node1.getPort("out"));
        link2.setSourcePort(node3.getPort("in"));

        this.activeModel.addAll(node1, node2, node3, link1, link2);

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
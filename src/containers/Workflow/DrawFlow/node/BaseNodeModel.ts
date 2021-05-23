import { ConditionNodeModel } from './ConditionNode/index';
import { IntentNodeModel } from './IntentNode/index';
import { NodeModel, PortModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { AdvancedLinkModel, AdvancedPortModel } from '../customLink';
import { AdvancedDiagramEngine } from '../AdvancedDiagramEngine';
import apis from '../../../../apis';
import * as _ from 'lodash';
import {
    checkMutualNodeId,
    checkAllowConnect
} from '../../../../utils/node';
import { ActionNodeModel } from '.';
export interface BaseNodeModelOptions extends BaseModelOptions {
    color?: string;
    id?: string;
    itemId?: string;
    nodeInfo?: any;
}

export class BaseNodeModel extends NodeModel {
    color?: string;
    id?: string;
    itemId?: string;
    nodeInfo?: any;
    protected ports: {
        [s: string]: AdvancedPortModel;
    }

    constructor(options: BaseNodeModelOptions = {}) {
        super({
            ...options,
        });
        this.color = options.color || 'red';
        this.id = options.id
        this.itemId = options.itemId;
        this.nodeInfo = options.nodeInfo;
        // setup an in and out port
        this.addPort(
            new AdvancedPortModel({
                in: true,
                name: 'in'
            })
        );
        this.addPort(
            new AdvancedPortModel({
                in: false,
                name: 'out-bottom'
            })
        );
        this.addPort(
            new AdvancedPortModel({
                in: false,
                name: 'out-left'
            })
        );
        this.addPort(
            new AdvancedPortModel({
                in: false,
                name: 'out-right'
            })
        );
    }
    addPort(port: AdvancedPortModel): AdvancedPortModel {
        if (!this.ports) {
            this.ports = {}
        }
        port.setParent(this);
        this.ports[port.getName()] = port;
        return port;
    }

    getPort(name: string): AdvancedPortModel {
        return this.ports[name];
    }
    serialize() {
        return {
            ...super.serialize(),
            color: this.color,
            nodeInfo: this.nodeInfo
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.color = event.data.color;
        this.nodeInfo = event.data.nodeInfo;
    }

    getPortsByType(type: String): PortModel[] {
        const portsObj = this.getPorts();
        const listPort = Object.keys(portsObj).filter(el =>
            portsObj[el]['options']['in'] === (type === 'in')
        ).map(el => portsObj[el]);
        return listPort;
    }

    getArrayLinkByPortType(type: String): AdvancedLinkModel[] {
        const listPortIn = this.getPortsByType(type);
        let listLink = [];
        listPortIn.forEach(el => {
            const listLinkObj = el.getLinks() || {};
            listLink = [...listLink, ...Object.keys(listLinkObj).map(keyLink => listLinkObj[keyLink])]
        })
        console.log(listPortIn);
        return listLink;
    }

    getArrayLinkIdByPortType(type: String): AdvancedLinkModel[] {
        const listPortIn = this.getPortsByType(type);
        let listLinkId = [];
        listPortIn.forEach(el => {
            const listLinkObj = el.getLinks() || {};
            listLinkId = [...listLinkId, ...Object.keys(listLinkObj).map(keyLink => keyLink)]
        })
        return listLinkId;
    }

    async create(
        engine: AdvancedDiagramEngine,
        parentNode?: BaseNodeModel,
        workflowId?: String,
    ): Promise<Boolean> {
        let parent = [];
        if (parentNode) {
            const linkPortIn = this.getArrayLinkByPortType('in')[0];
            console.log(linkPortIn);
            const typePort = linkPortIn && linkPortIn.getSourcePort().getName() || 'out-bottom';
            parent = [{
                node: parentNode.id,
                type: parentNode.getType(),
                typePort
            }]
        }
        const newNode = {
            type: this.getType(),
            position: {
                x: this.getX(),
                y: this.getY(),
            },
            parent,
            workflow: workflowId,
        };

        const data = await apis.node.createNode({ ...newNode });
        if (data && data.status) {
            this.id = data.result.node.id;
        } else {
            return false;
        }
        const model = engine.getModel();
        model.addNode(this);
        engine.repaintCanvas();
        return true;
    }

    async delete(
        engine: AdvancedDiagramEngine,
        workflowId: String,
    ): Promise<Boolean> {
        const data = await apis.node.deleteNode(
            workflowId,
            this.id,
        );
        if (data && data.status) {
            this.remove();
            engine.repaintCanvas();
            return true;
        }
        return false;
    }

    checkConnect(targetNode: BaseNodeModel): Boolean {
        //check target node has parent
        if (targetNode.getArrayLinkIdByPortType('in').length > 0) {
            return false;
        }

        // check 2 node was connected
        const mutualNodeId = checkMutualNodeId(this, targetNode);
        if (mutualNodeId) {
            return false;
        }

        // check allow connect
        const isConnect = checkAllowConnect(this, targetNode);
        if (!isConnect) {
            return false;
        }

        return true;
    }

    updatePositionOutNodeConnect(engine: AdvancedDiagramEngine, lenX: number, lenY: number) {
        const dfs = (node) => {
            const linksOutNode = node.getArrayLinkByPortType('out');
            linksOutNode.forEach(el => {
                const targetNode = el?.getTargetPort()?.getParent();
                if (targetNode) {
                    const posX = targetNode.getX();
                    const posY = targetNode.getY();
                    targetNode.setPosition(posX + lenX, posY + lenY);
                    dfs(targetNode);
                }
            })
        }
        dfs(this);
        engine.repaintCanvas();
    }
}

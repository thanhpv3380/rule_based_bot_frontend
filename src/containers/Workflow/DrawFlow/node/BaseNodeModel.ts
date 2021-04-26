import { NodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { AdvancedPortModel } from '../customLink';

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
    };

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
                name: 'out'
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
}

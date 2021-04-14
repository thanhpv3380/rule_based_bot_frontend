import { NodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { AdvancedPortModel } from '../../customLink';

export interface ActionNodeModelOptions extends BaseModelOptions {
	color?: string;
}

export class ActionNodeModel extends NodeModel {
	color: string;
	protected ports: {
		[s: string]: AdvancedPortModel;
	};

	constructor(options: ActionNodeModelOptions = {}) {
		super({
			...options,
			type: 'action-node'
		});
		this.color = options.color || 'red';

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
	getPort(name): AdvancedPortModel {
		return this.ports[name];
	}

	serialize() {
		return {
			...super.serialize(),
			color: this.color
		};
	}

	deserialize(event): void {
		super.deserialize(event);
		this.color = event.data.color;
	}
}

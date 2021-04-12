import { NodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';

export interface ActionNodeModelOptions extends BaseModelOptions {
	color?: string;
}

export class ActionNodeModel extends NodeModel {
	color: string;

	constructor(options: ActionNodeModelOptions = {}) {
		super({
			...options,
			type: 'action-node'
		});
		this.color = options.color || 'red';

		// setup an in and out port
		this.addPort(
			new DefaultPortModel({
				in: true,
				name: 'in'
			})
		);
		this.addPort(
			new DefaultPortModel({
				in: false,
				name: 'out'
			})
		);
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

import { DiagramModelGenerics } from '@projectstorm/react-diagrams';
import { DiagramModel } from '@projectstorm/react-diagrams-core';
import { AdvancedLinkModel } from '../customLink';

export class AdvancedDiagramModel extends DiagramModel<DiagramModelGenerics> {
  constructor(options?: {}) {
    super(options);
  }
  addLink(link: AdvancedLinkModel): AdvancedLinkModel {
    this.getActiveLinkLayer().addModel(link);
    this.fireEvent(
      {
        link,
        isCreated: true,
      },
      'linksUpdated',
    );
    return link;
  }
}

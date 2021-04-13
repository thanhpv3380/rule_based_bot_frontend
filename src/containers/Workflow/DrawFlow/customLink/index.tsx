import * as React from 'react';
import { MouseEvent } from 'react';
import createEngine, {
  DefaultPortModel,
  DefaultLinkFactory,
  DefaultLinkModel,
  DefaultLinkWidget,
} from '@projectstorm/react-diagrams';
import {
  LinkWidget,
  PointModel,
  PointModelGenerics,
} from '@projectstorm/react-diagrams-core';

export class AdvancedLinkModel extends DefaultLinkModel {
  constructor() {
    super({
      type: 'advanced',
      width: 4,
    });
  }
}

export class AdvancedPortModel extends DefaultPortModel {
  createLinkModel(): AdvancedLinkModel | null {
    return new AdvancedLinkModel();
  }
}

export class AdvancedLinkWidget extends DefaultLinkWidget {
  render() {
    //ensure id is present for all points on the path
    var points: PointModel[] = this.props.link.getPoints();
    var paths = [];
    this.refPaths = [];

    const pointX1 = points[0].getX();
    const pointY1 = points[0].getY();
    const pointX2 = points[1].getX();
    const pointY2 = points[1].getY();
    const averageY = Math.abs(pointY1 + pointY2) / 2;
    // console.log(pointY1);
    // console.log(pointY2);
    // console.log(averageY, 'average');

    const path =
      pointX1 === pointX2 || pointY2 === pointY1
        ? LinkWidget.generateLinePath(points[0], points[1])
        : `M${pointX1},${pointY1} L ${pointX1},${averageY} L ${pointX2},${averageY} L ${pointX2}, ${pointY2}`;
    paths.push(
      this.generateLink(
        path,
        {
          'data-linkid': this.props.link.getID(),
          'data-point': 1,
          onMouseDown: (event: MouseEvent) => {
            // this.addPointToLink(event, 1 + 1); // todo xử lý khi click vào link
          },
        },
        1,
      ),
    );

    return (
      <g data-default-link-test={this.props.link.getOptions().testName}>
        {paths}
      </g>
    );
  }
}

export class AdvancedLinkFactory extends DefaultLinkFactory {
  constructor() {
    super('advanced');
  }

  generateModel(): AdvancedLinkModel {
    return new AdvancedLinkModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <AdvancedLinkWidget link={event.model} diagramEngine={this.engine} />
    );
  }
}

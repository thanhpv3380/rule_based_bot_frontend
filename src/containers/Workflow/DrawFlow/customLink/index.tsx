import createEngine, {
  DefaultPortModel,
  DefaultLinkFactory,
  DefaultLinkModel,
  DefaultLinkWidget,
  DefaultPortModelOptions,
} from '@projectstorm/react-diagrams';
import {
  LinkModel,
  LinkWidget,
  PointModel,
  PointModelGenerics,
} from '@projectstorm/react-diagrams-core';
import {
  AbstractModelFactory,
  DeserializeEvent,
} from '@projectstorm/react-canvas-core';
import * as React from 'react';
import { MouseEvent } from 'react';

export class AdvancedLinkModel extends DefaultLinkModel {
  protected sourcePort: AdvancedPortModel | null;
  protected targetPort: AdvancedPortModel | null;
  constructor() {
    super({
      type: 'advanced',
      width: 4,
    });
  }
  setSourcePort(port: AdvancedPortModel): void {
    console.log(this, 'this');
    if (port !== null) {
      port.addLink(this);
    }
    if (this.sourcePort && this.sourcePort !== null) {
      this.sourcePort.removeLink(this);
    }
    this.sourcePort = port;
    this.fireEvent({ port }, 'sourcePortChanged');
    if (port.reportedPosition) {
      this.getPointForPort(port).setPosition(port.getCenter());
    }
  }
  getSourcePort(): AdvancedPortModel {
    return this.sourcePort;
  }
  getTargetPort(): AdvancedPortModel {
    return this.targetPort;
  }
  setTargetPort(port: AdvancedPortModel): void {
    if (port !== null) {
      port.addLink(this);
    }
    if (this.targetPort && this.targetPort !== null) {
      this.targetPort.removeLink(this);
    }
    this.targetPort = port;
    this.fireEvent({ port }, 'targetPortChanged');
    if (port.reportedPosition) {
      this.getPointForPort(port).setPosition(port.getCenter());
    }
  }
}

export class AdvancedPortModel extends DefaultPortModel {
  constructor(options: DefaultPortModelOptions) {
    super(options);
  }
  createLinkModel(): AdvancedLinkModel | null {
    return new AdvancedLinkModel();
  }
  removeLink(link: AdvancedLinkModel): void {
    delete this.links[link.getID()];
  }
}

const CustomLinkArrowWidget = (props) => {
  const { point, previousPoint } = props;

  const angle =
    90 +
    (Math.atan2(
      point.getPosition().y - previousPoint.getPosition().y,
      point.getPosition().x - previousPoint.getPosition().x,
    ) *
      180) /
      Math.PI;
  console.log(angle, point.getPosition().x, point.getPosition().y);

  //translate(50, -10),
  return (
    <g
      className="arrow"
      transform={
        'translate(' +
        point.getPosition().x +
        ', ' +
        point.getPosition().y +
        ')'
      }
    >
      <g style={{ transform: 'rotate(' + 180 + 'deg)' }}>
        <g transform={'translate(0, -3)'}>
          <polygon
            points="0,-1 8,20 -8,20"
            fill={props.color}
            data-id={point.getID()}
            data-linkid={point.getLink().getID()}
          />
        </g>
      </g>
    </g>
  );
};

export class AdvancedLinkWidget extends DefaultLinkWidget {
  generateArrow(point: PointModel, previousPoint: PointModel): JSX.Element {
    return (
      <CustomLinkArrowWidget
        key={point.getID()}
        point={point as any}
        previousPoint={previousPoint as any}
        colorSelected={this.props.link.getOptions().selectedColor}
        color={this.props.link.getOptions().color}
      />
    );
  }
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
    
    // if (this.props.link.getTargetPort() !== null) {
    //   paths.push(this.generateArrow(points[1], points[0]));
    // } else {
    //   paths.push(this.generatePoint(points[points.length - 1]));
    // }

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

  generateReactWidget(event: any): JSX.Element {
    return (
      <AdvancedLinkWidget link={event.model} diagramEngine={this.engine} />
    );
  }
}
